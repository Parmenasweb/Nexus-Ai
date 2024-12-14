import {
  AI_CONFIG,
  AI_ERROR_TYPES,
  createAIError,
  DEEPAI_API_KEY,
} from "../api-config";
import { withUsageTracking } from "./utils";
import { z } from "zod";

const DEEPAI_API_URL = "https://api.deepai.org/api/background-remover";

// Input validation schemas
const backgroundRemovalSchema = z.object({
  image: z.union([
    z.string(), // URL or base64
    z.instanceof(File), // File object (browser)
    z.any(), // ReadStream (Node.js)
  ]),
});

interface DeepAIResponse {
  id: string;
  output_url: string;
}

// Helper function to create form data or JSON body
const createFormData = (
  image: string | File | any
): FormData | { image: string } => {
  if (
    typeof image === "string" &&
    (image.startsWith("http") || image.startsWith("https"))
  ) {
    return { image }; // Return JSON structure for URLs
  }

  const formData = new FormData();
  formData.append("image", image);
  return formData;
};

// Helper function for retrying failed requests
const withRetry = async <T>(operation: () => Promise<T>): Promise<T> => {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= AI_CONFIG.deepai.maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;

      if (error.status === 429) {
        const retryAfter = parseInt(error.headers?.["retry-after"] || "5");
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
        continue;
      }

      throw createAIError(
        error.message,
        error.status === 401
          ? AI_ERROR_TYPES.INVALID_API_KEY
          : error.status === 429
          ? AI_ERROR_TYPES.RATE_LIMIT_EXCEEDED
          : error.status === 503
          ? AI_ERROR_TYPES.MODEL_OVERLOADED
          : AI_ERROR_TYPES.PROCESSING_ERROR,
        error.status
      );
    }
  }

  throw lastError || new Error("Operation failed after retries");
};

export const removeBackground = async (
  params: z.infer<typeof backgroundRemovalSchema>,
  onProgress?: (progress: number) => void
): Promise<string> => {
  const validatedParams = backgroundRemovalSchema.parse(params);

  return withUsageTracking("deepai", "remove-background", async () => {
    try {
      // Start progress
      onProgress?.(10);

      const body = createFormData(validatedParams.image);
      const headers: Record<string, string> = {
        "api-key": DEEPAI_API_KEY,
      };

      // If body is a string (URL), set Content-Type to application/json
      if (typeof body === "string") {
        headers["Content-Type"] = "application/json";
      }

      // Make API call to DeepAI's background removal endpoint
      const result = await withRetry(async () => {
        const response = await fetch(DEEPAI_API_URL, {
          method: "POST",
          headers,
          body:
            typeof body === "string"
              ? JSON.stringify({ image: body })
              : body instanceof FormData
              ? body
              : JSON.stringify(body),
        });

        if (!response.ok) {
          const error = await response.json().catch(() => ({}));
          throw createAIError(
            error.message || "Failed to remove background",
            AI_ERROR_TYPES.PROCESSING_ERROR,
            response.status
          );
        }

        const data = (await response.json()) as DeepAIResponse;

        if (!data.output_url) {
          throw createAIError(
            "No output URL in response",
            AI_ERROR_TYPES.PROCESSING_ERROR
          );
        }

        return data;
      });

      // Update progress
      onProgress?.(50);

      // Verify the result is a valid image URL
      try {
        const imageResponse = await fetch(result.output_url);
        if (
          !imageResponse.ok ||
          !imageResponse.headers.get("content-type")?.startsWith("image/")
        ) {
          throw new Error("Invalid image response");
        }
      } catch (error) {
        throw createAIError(
          "Failed to verify output image",
          AI_ERROR_TYPES.PROCESSING_ERROR
        );
      }

      // Complete progress
      onProgress?.(100);

      return result.output_url;
    } catch (error) {
      // Reset progress on error
      onProgress?.(0);
      throw error;
    }
  });
};

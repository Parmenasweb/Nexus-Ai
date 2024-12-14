import { fal } from "@fal-ai/client";
import { AI_CONFIG, AI_ERROR_TYPES, createAIError } from "../api-config";
import { withUsageTracking } from "./utils";
import { z } from "zod";
import type { QueueStatus, Result } from "@fal-ai/client";

// Initialize FAL AI client
fal.config({
  credentials: process.env.FAL_AI_API_KEY!,
});

// Input validation schemas
const imageOptionsSchema = z.object({
  upscale: z.boolean().optional(),
  denoise: z.boolean().optional(),
  enhance: z.boolean().optional(),
});

const imageGenerationSchema = z.object({
  prompt: z.string().min(1),
  style: z.string(),
  size: z.enum(["512x512", "760x760", "1024x1024", "2048x2048"]),
});

const imageConversionSchema = z.object({
  format: z.enum(["jpeg", "png", "webp", "pdf", "gif"]),
});

// Type definitions for FAL AI responses
interface FalResponse {
  image: { url: string };
  images?: Array<{ url: string }>;
  image_url?: string;
}

// Helper function for retrying failed requests
const withRetry = async <T>(operation: () => Promise<T>): Promise<T> => {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= AI_CONFIG.fal.maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error: any) {
      lastError = error;

      if (error.status === 429) {
        const retryAfter = parseInt(error.headers?.["retry-after"] || "5");
        await new Promise((resolve) => setTimeout(resolve, retryAfter * 1000));
        continue;
      }

      if (error.status === 503) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000)
        );
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

export const enhanceImage = async (
  imageUrl: string,
  options: z.infer<typeof imageOptionsSchema>
) => {
  const validatedOptions = imageOptionsSchema.parse(options);

  return withUsageTracking("fal", "enhance-image", async () => {
    const result = await withRetry(async () => {
      const response = await fal.run(AI_CONFIG.fal.models.imageEnhance, {
        input: {
          image_url: imageUrl,
          ...validatedOptions,
        },
      });

      const data = response as unknown as FalResponse;
      if (!data.images?.[0]?.url) {
        throw createAIError(
          "No enhanced image URL in response",
          AI_ERROR_TYPES.PROCESSING_ERROR
        );
      }

      return data.images[0].url;
    });

    return result;
  });
};

export const removeBackground = async (imageUrl: string) => {
  return withUsageTracking("fal", "remove-background", async () => {
    const result = await withRetry(async () => {
      const response = await fal.run(AI_CONFIG.fal.models.backgroundRemoval, {
        input: {
          image_url: imageUrl,
        },
      });

      const data = response as unknown as FalResponse;
      if (!data.image_url) {
        throw createAIError(
          "No processed image URL in response",
          AI_ERROR_TYPES.PROCESSING_ERROR
        );
      }

      return data.image_url;
    });

    return result;
  });
};

export const generateImage = async (
  params: z.infer<typeof imageGenerationSchema>,
  onProgress?: (progress: number) => void
) => {
  const validatedParams = imageGenerationSchema.parse(params);

  return withUsageTracking("fal", "generate-image", async () => {
    const result = await withRetry(async () => {
      const response = await fal.subscribe(
        AI_CONFIG.fal.models.imageGeneration,
        {
          input: {
            prompt: `${validatedParams.prompt} in ${validatedParams.style} style`,
            image_size:
              validatedParams.size === "1024x1024" ? "square_hd" : "square",
            num_images: 1,
          },
          pollInterval: 1000,
          onQueueUpdate: (status: QueueStatus) => {
            const progress = Math.min(
              95,
              status.status === "IN_PROGRESS"
                ? 50
                : status.status === "COMPLETED"
                ? 100
                : status.status === "IN_QUEUE"
                ? 5
                : 0
            );
            onProgress?.(progress);
          },
        }
      );

      onProgress?.(100);
      const data = response as unknown as FalResponse;

      if (!data.images?.[0]?.url) {
        throw createAIError(
          "No generated image URL in response",
          AI_ERROR_TYPES.PROCESSING_ERROR
        );
      }

      return data.images[0].url;
    });

    return result;
  });
};

export const upscaleImage = async (imageUrl: string, scale: number = 2) => {
  return withUsageTracking("fal", "upscale-image", async () => {
    const result = await withRetry(async () => {
      const response = await fal.run(AI_CONFIG.fal.models.superResolution, {
        input: {
          image_url: imageUrl,
          scale: Math.min(4, Math.max(1, scale)),
        },
      });

      const data = response as unknown as FalResponse;
      if (!data.image_url) {
        throw createAIError(
          "No upscaled image URL in response",
          AI_ERROR_TYPES.PROCESSING_ERROR
        );
      }

      return data.image_url;
    });

    return result;
  });
};

export const convertImage = async (
  imageUrl: string,
  format: z.infer<typeof imageConversionSchema>["format"]
) => {
  const validatedParams = imageConversionSchema.parse({ format });

  return withUsageTracking("fal", "convert-image", async () => {
    const result = await withRetry(async () => {
      const response = await fal.run(AI_CONFIG.fal.models.imageConversion, {
        input: {
          image_url: imageUrl,
          output_format: validatedParams.format,
          preserve_quality: true,
        },
      });

      const data = response as unknown as FalResponse;
      if (!data.image_url) {
        throw createAIError(
          "No converted image URL in response",
          AI_ERROR_TYPES.PROCESSING_ERROR
        );
      }

      return data.image_url;
    });

    return result;
  });
};

export const generateVideoFromImage = async (
  imageUrl: string,
  prompt: string,
  style: string,
  duration: number,
  resolution: string
): Promise<string> => {
  const response = await fal.run(AI_CONFIG.fal.models.imageGeneration, {
    input: {
      image_url: imageUrl,
      prompt,
      style,
      duration,
      resolution,
    },
  });

  if (!response) {
    throw new Error("Failed to generate video");
  }

  return response;
};

export const generateSocialMediaShorts = async (
  videoFile: File,
  caption: string
): Promise<string> => {
  const formData = new FormData();
  formData.append("video", videoFile);
  formData.append("caption", caption);

  const response = await fal.run(AI_CONFIG.fal.models.socialMediaShorts, {
    input: {
      video_file: URL.createObjectURL(videoFile),
      caption,
    },
  });

  if (!response || !response.short_video_url) {
    throw new Error("Failed to generate social media short");
  }

  return response.short_video_url;
};

export const generateContent = async (params: {
  type: string;
  prompt: string;
}) => {
  const response = await fal.run(AI_CONFIG.fal.models.contentGeneration, {
    input: {
      type: params.type,
      prompt: params.prompt,
    },
  });

  if (!response || !response.content) {
    throw new Error("Failed to generate content");
  }

  return response.content;
};

// coding tools

export const generateCode = async (params: {
  prompt: string;
  language: string;
  framework?: string;
}) => {
  const response = await fal.run(AI_CONFIG.fal.models.codeGeneration, {
    input: {
      prompt: params.prompt,
      language: params.language,
      framework: params.framework,
    },
  });

  if (!response || !response.code) {
    throw new Error("Failed to generate code");
  }

  return response.code;
};

export const explainCode = async (params: {
  code: string;
  language: string;
}) => {
  const response = await fal.run(AI_CONFIG.fal.models.codeExplanation, {
    input: {
      code: params.code,
      language: params.language,
    },
  });

  if (!response || !response.explanation) {
    throw new Error("Failed to explain code");
  }

  return response.explanation;
};

export const debugCode = async (params: { code: string; language: string }) => {
  const response = await fal.run(AI_CONFIG.fal.models.codeDebugging, {
    input: {
      code: params.code,
      language: params.language,
    },
  });

  if (!response || !response.debugInfo) {
    throw new Error("Failed to debug code");
  }

  return response.debugInfo;
};

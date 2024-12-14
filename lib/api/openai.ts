import OpenAI from "openai";
import {
  AI_CONFIG,
  AI_ERROR_TYPES,
  createAIError,
  OPENAI_API_KEY,
} from "../api-config";
import { withUsageTracking } from "./utils";
import { z } from "zod";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  maxRetries: AI_CONFIG.openai.maxRetries,
  timeout: AI_CONFIG.openai.timeout,
});

// Input validation schemas
const contentSchema = z.object({
  prompt: z.string().min(1),
  type: z.enum(["article", "social", "marketing", "seo"]),
  tone: z.enum(["professional", "casual", "friendly", "formal"]).optional(),
  length: z.enum(["short", "medium", "long"]).optional(),
});

const codeSchema = z.object({
  prompt: z.string().min(1),
  language: z.string().min(1),
  framework: z.string().optional(),
  architecture: z.string().optional(),
});

const imageSchema = z.object({
  prompt: z.string().min(1),
  style: z.string(),
  size: z.enum(["256x256", "512x512", "1024x1024"]),
  quality: z.enum(["standard", "hd"]).optional(),
});

// Helper function for retrying failed requests
const withRetry = async <T>(operation: () => Promise<T>): Promise<T> => {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= AI_CONFIG.openai.maxRetries; attempt++) {
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

export const generateContent = async (
  params: z.infer<typeof contentSchema>
) => {
  const validatedParams = contentSchema.parse(params);

  return withUsageTracking("openai", "generate-content", async () => {
    const result = await withRetry(async () => {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are a professional ${
              validatedParams.type
            } content writer. 
                     Create ${
                       validatedParams.tone || "professional"
                     } content that is 
                     ${
                       validatedParams.length || "medium"
                     } in length and optimized for ${validatedParams.type}.`,
          },
          {
            role: "user",
            content: validatedParams.prompt,
          },
        ],
        model: AI_CONFIG.openai.models.chat,
        temperature: 0.7,
        max_tokens:
          validatedParams.length === "short"
            ? 250
            : validatedParams.length === "long"
            ? 1000
            : 500,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw createAIError(
          "No content generated",
          AI_ERROR_TYPES.PROCESSING_ERROR
        );
      }

      return content;
    });

    return result;
  });
};

export const generateCode = async (params: z.infer<typeof codeSchema>) => {
  const validatedParams = codeSchema.parse(params);

  return withUsageTracking("openai", "generate-code", async () => {
    const result = await withRetry(async () => {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an expert ${validatedParams.language} developer${
              validatedParams.framework
                ? ` specializing in ${validatedParams.framework}`
                : ""
            }. Generate clean, well-documented code${
              validatedParams.architecture
                ? ` following ${validatedParams.architecture} architecture`
                : ""
            }.`,
          },
          {
            role: "user",
            content: validatedParams.prompt,
          },
        ],
        model: AI_CONFIG.openai.models.chat,
        temperature: 0.3,
        max_tokens: 2000,
      });

      const code = completion.choices[0]?.message?.content;
      if (!code) {
        throw createAIError(
          "No code generated",
          AI_ERROR_TYPES.PROCESSING_ERROR
        );
      }

      return code;
    });

    return result;
  });
};

export const generateImage = async (params: z.infer<typeof imageSchema>) => {
  const validatedParams = imageSchema.parse(params);

  return withUsageTracking("openai", "generate-image", async () => {
    const result = await withRetry(async () => {
      const response = await openai.images.generate({
        model: AI_CONFIG.openai.models.image,
        prompt: `${validatedParams.prompt} in ${validatedParams.style} style`,
        n: 1,
        size: validatedParams.size,
        quality: validatedParams.quality || "standard",
      });

      const imageUrl = response.data[0]?.url;
      if (!imageUrl) {
        throw createAIError(
          "No image URL in response",
          AI_ERROR_TYPES.PROCESSING_ERROR
        );
      }

      return imageUrl;
    });

    return result;
  });
};

// Function to explain code
export const explainCode = async (params: {
  code: string;
  language: string;
}) => {
  const { code, language } = params;

  return withUsageTracking("openai", "explain-code", async () => {
    const result = await withRetry(async () => {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an expert ${language} developer. Explain the following code in detail:`,
          },
          {
            role: "user",
            content: code,
          },
        ],
        model: AI_CONFIG.openai.models.chat,
        temperature: 0.5,
        max_tokens: 500,
      });

      const explanation = completion.choices[0]?.message?.content;
      if (!explanation) {
        throw createAIError(
          "No explanation generated",
          AI_ERROR_TYPES.PROCESSING_ERROR
        );
      }

      return explanation;
    });

    return result;
  });
};

// Function to debug code
export const debugCode = async (params: { code: string; language: string }) => {
  const { code, language } = params;

  return withUsageTracking("openai", "debug-code", async () => {
    const result = await withRetry(async () => {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "system",
            content: `You are an expert ${language} developer. Identify issues in the following code and suggest fixes:`,
          },
          {
            role: "user",
            content: code,
          },
        ],
        model: AI_CONFIG.openai.models.chat,
        temperature: 0.5,
        max_tokens: 500,
      });

      const debugInfo = completion.choices[0]?.message?.content;
      if (!debugInfo) {
        throw createAIError(
          "No debugging information generated",
          AI_ERROR_TYPES.PROCESSING_ERROR
        );
      }

      return debugInfo;
    });

    return result;
  });
};

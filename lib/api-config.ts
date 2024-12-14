import { z } from "zod";

// Environment variable validation schema
const envSchema = z.object({
  FAL_AI_API_KEY: z.string().min(1, "FAL AI API key is required"),
  OPENAI_API_KEY: z.string().min(1, "OpenAI API key is required"),
  DEEPAI_API_KEY: z.string().min(1, "DeepAI API key is required"),
});

// Validate environment variables
const env = envSchema.safeParse({
  FAL_AI_API_KEY: process.env.NEXT_PUBLIC_FAL_KEY,
  OPENAI_API_KEY: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  DEEPAI_API_KEY: process.env.NEXT_PUBLIC_DEEPAI_API_KEY,
});

if (!env.success) {
  console.error(
    "❌ Invalid environment variables:",
    env.error.flatten().fieldErrors
  );
  throw new Error("Invalid environment variables");
}

// Export validated environment variables
export const { FAL_AI_API_KEY, OPENAI_API_KEY, DEEPAI_API_KEY } = env.data;

// Rate limiting configuration
export const RATE_LIMITS = {
  fal: {
    requests: 100,
    interval: 60 * 1000, // 1 minute
    concurrency: 5,
  },
  openai: {
    requests: 200,
    interval: 60 * 1000,
    concurrency: 10,
    tokensPerMinute: 10000,
  },
  deepai: {
    requests: 50,
    interval: 60 * 1000,
    concurrency: 3,
  },
} as const;

// Usage tracking configuration
export const USAGE_TRACKING = {
  enabled: true,
  storageKey: "ai_usage_metrics",
  metricsInterval: 24 * 60 * 60 * 1000, // 24 hours
  metrics: {
    requests: true,
    tokens: true,
    errors: true,
    latency: true,
  },
} as const;

// AI Service Configuration
export const AI_CONFIG = {
  fal: {
    maxRetries: 3,
    timeout: 30000,
    models: {
      imageEnhance: "image-enhance",
      backgroundRemoval: "background-removal",
      imageGeneration: "fal-ai/flux/dev",
      superResolution: "super-resolution",
      imageConversion: "image-conversion",
    },
  },
  openai: {
    maxRetries: 3,
    timeout: 60000,
    models: {
      chat: "gpt-4-turbo-preview",
      vision: "gpt-4-vision-preview",
      image: "dall-e-3",
    },
  },
  deepai: {
    maxRetries: 3,
    timeout: 300000, // 5 minutes for video generation
    pollInterval: 5000,
  },
} as const;

// Error types
export const AI_ERROR_TYPES = {
  INVALID_API_KEY: "INVALID_API_KEY",
  RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED",
  MODEL_OVERLOADED: "MODEL_OVERLOADED",
  INVALID_REQUEST: "INVALID_REQUEST",
  PROCESSING_ERROR: "PROCESSING_ERROR",
  TIMEOUT: "TIMEOUT",
} as const;

// Type definitions
export type AIErrorType = keyof typeof AI_ERROR_TYPES;

export interface AIError {
  message: string;
  type: AIErrorType;
  statusCode?: number;
  retryAfter?: number;
}

// Create error function instead of class
export const createAIError = (
  message: string,
  type: AIErrorType,
  statusCode?: number,
  retryAfter?: number
): AIError => ({
  message,
  type,
  statusCode,
  retryAfter,
});

// Usage metrics types
export interface UsageMetrics {
  timestamp: number;
  service: "fal" | "openai" | "deepai";
  endpoint: string;
  success: boolean;
  latency: number;
  tokens?: number;
  error?: AIError;
}

// Rate limit types
export interface RateLimitInfo {
  remaining: number;
  reset: number;
  total: number;
}

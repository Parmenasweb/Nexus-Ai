import {
  RATE_LIMITS,
  USAGE_TRACKING,
  UsageMetrics,
  RateLimitInfo,
  createAIError,
  AI_ERROR_TYPES,
} from "../api-config";

// In-memory storage for rate limiting
const rateLimiters = new Map<string, RateLimitInfo>();

// Usage metrics storage
const usageMetrics: UsageMetrics[] = [];

// Rate limiting function
export const checkRateLimit = (
  service: keyof typeof RATE_LIMITS,
  endpoint: string
): void => {
  const key = `${service}:${endpoint}`;
  const now = Date.now();
  const limit = RATE_LIMITS[service];

  let rateLimit = rateLimiters.get(key) ?? {
    remaining: limit.requests,
    reset: now + limit.interval,
    total: limit.requests,
  };

  // Reset if interval has passed
  if (now >= rateLimit.reset) {
    rateLimit = {
      remaining: limit.requests,
      reset: now + limit.interval,
      total: limit.requests,
    };
  }

  if (rateLimit.remaining <= 0) {
    const retryAfter = Math.ceil((rateLimit.reset - now) / 1000);
    throw createAIError(
      `Rate limit exceeded for ${service}:${endpoint}. Try again in ${retryAfter} seconds.`,
      AI_ERROR_TYPES.RATE_LIMIT_EXCEEDED,
      429,
      retryAfter
    );
  }

  rateLimit.remaining--;
  rateLimiters.set(key, rateLimit);
};

// Track API usage
export const trackUsage = (metrics: Omit<UsageMetrics, "timestamp">): void => {
  if (!USAGE_TRACKING.enabled) return;

  const usage: UsageMetrics = {
    ...metrics,
    timestamp: Date.now(),
  };

  usageMetrics.push(usage);

  // Prune old metrics
  const cutoff = Date.now() - USAGE_TRACKING.metricsInterval;
  while (usageMetrics.length > 0 && usageMetrics[0].timestamp < cutoff) {
    usageMetrics.shift();
  }

  // Store metrics if available
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(
        USAGE_TRACKING.storageKey,
        JSON.stringify(usageMetrics)
      );
    } catch (error) {
      console.warn("Failed to store usage metrics:", error);
    }
  }
};

// Get usage metrics
export const getUsageMetrics = (
  service?: keyof typeof RATE_LIMITS,
  timeframe = USAGE_TRACKING.metricsInterval
): UsageMetrics[] => {
  const cutoff = Date.now() - timeframe;
  return usageMetrics.filter(
    (metric) =>
      metric.timestamp >= cutoff && (!service || metric.service === service)
  );
};

// Wrapper function for API calls with rate limiting and usage tracking
export const withUsageTracking = async <T>(
  service: keyof typeof RATE_LIMITS,
  endpoint: string,
  operation: () => Promise<T>
): Promise<T> => {
  const startTime = Date.now();

  try {
    // Check rate limit before making the call
    checkRateLimit(service, endpoint);

    // Execute the operation
    const result = await operation();

    // Track successful usage
    trackUsage({
      service,
      endpoint,
      success: true,
      latency: Date.now() - startTime,
    });

    return result;
  } catch (error: any) {
    // Track failed usage
    trackUsage({
      service,
      endpoint,
      success: false,
      latency: Date.now() - startTime,
      error: error.type
        ? error
        : createAIError(
            error.message,
            AI_ERROR_TYPES.PROCESSING_ERROR,
            error.status
          ),
    });

    throw error;
  }
};

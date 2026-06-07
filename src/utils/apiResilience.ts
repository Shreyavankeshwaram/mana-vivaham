/**
 * Resilient API Request System
 * Handles 503 Service Unavailable & MODEL_CAPACITY_EXHAUSTED
 */

export interface ResilienceOptions {
  maxRetries?: number;
  backupModel?: string;
  onRetry?: (attempt: number, delay: number, error: any) => void;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export interface APIErrorResponse {
  error: {
    code: number;
    message: string;
    status: string;
    details?: Array<{
      reason?: string;
      retryDelay?: string;
      [key: string]: any;
    }>;
  };
}

/**
 * Utility to parse retry delay from Google API response format (e.g., "54s")
 */
const parseRetryDelay = (delayStr?: string): number => {
  if (!delayStr) return 1000; // Default 1s
  const seconds = parseInt(delayStr.replace("s", ""), 10);
  return isNaN(seconds) ? 1000 : seconds * 1000;
};

/**
 * Resilient Fetcher with Exponential Backoff and Error Detection
 */
export async function resilientRequest(
  url: string,
  options: RequestInit,
  resilience: ResilienceOptions = {},
  attempt: number = 0
): Promise<any> {
  const { maxRetries = 3, backupModel, onRetry } = resilience;

  try {
    const response = await fetch(url, options);

    if (response.ok) {
      return await response.json();
    }

    // Handle Error Statuses
    const errorData: APIErrorResponse = await response.json();
    const traceId = response.headers.get("X-Cloudaicompanion-Trace-Id");

    console.warn(`[API Error] Status: ${response.status}, TraceID: ${traceId}`, errorData);

    // Specific check for 503 or CAPACITY_EXHAUSTED
    const isCapacityExhausted = errorData.error?.details?.some(
      (d) => d.reason === "MODEL_CAPACITY_EXHAUSTED"
    );

    if ((response.status === 503 || isCapacityExhausted) && attempt < maxRetries) {
      // Find retry delay from details
      const retryDelayDetail = errorData.error?.details?.find((d) => d.retryDelay);
      const delay = parseRetryDelay(retryDelayDetail?.retryDelay);

      // Apply exponential factor (e.g., delay * 1.5 ^ attempt)
      const waitTime = Math.min(delay * Math.pow(1.5, attempt), 30000); // Max 30s

      if (onRetry) onRetry(attempt + 1, waitTime, errorData);

      console.log(`[Resilience] Retrying in ${waitTime}ms... (Attempt ${attempt + 1}/${maxRetries})`);

      await new Promise((resolve) => setTimeout(resolve, waitTime));

      // Optional: Switch to backup model in payload if it's a POST request
      const nextOptions = { ...options };
      if (backupModel && options.body) {
        try {
          const body = JSON.parse(options.body as string);
          if (body.model) {
            body.model = backupModel;
            nextOptions.body = JSON.stringify(body);
            console.log(`[Resilience] Switching to backup model: ${backupModel}`);
          }
        } catch (e) {
          /* ignore body parse errors */
        }
      }

      return resilientRequest(url, nextOptions, resilience, attempt + 1);
    }

    throw { ...errorData, traceId, status: response.status };

  } catch (error: any) {
    if (attempt < maxRetries && !error.status) {
      // Handle network errors (no status)
      const waitTime = 2000 * Math.pow(2, attempt);
      console.log(`[Resilience] Network error. Retrying in ${waitTime}ms...`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
      return resilientRequest(url, options, resilience, attempt + 1);
    }
    throw error;
  }
}

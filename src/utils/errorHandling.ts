import toast from "react-hot-toast";

/**
 * Handles API errors with specific handling for rate limiting
 * @param error - The error object from API call
 * @param defaultMessage - Default error message to show if not a rate limit error
 * @param showToast - Whether to show toast notification (default: true)
 * @returns boolean indicating if it was a rate limit error
 */
export const handleApiError = (
  error: any, 
  defaultMessage: string = "An error occurred. Please try again.",
  showToast: boolean = true
): boolean => {
  console.error("API Error:", error);
  
  // Check for rate limiting (429 status code)
  const isRateLimit = 
    error?.response?.status === 429 || 
    error?.status === 429 || 
    error?.statusCode === 429 ||
    error?.response?.data?.message?.includes("Too Many Requests") ||
    error?.message?.includes("Too Many Requests") ||
    error?.response?.data?.message?.includes("ThrottlerException");

  if (showToast) {
    if (isRateLimit) {
      toast.error("Too many requests. Please wait a moment before trying again.");
    } else {
      toast.error(defaultMessage);
    }
  }
  
  return isRateLimit;
};

/**
 * Handles rate limiting errors specifically
 * @param error - The error object from API call
 * @param callback - Optional callback to execute after handling
 */
export const handleRateLimit = (error: any, callback?: () => void) => {
  const isRateLimit = handleApiError(error, "", false);
  
  if (isRateLimit) {
    toast.error("Too many requests. Please wait a moment before trying again.");
    if (callback) callback();
  }
  
  return isRateLimit;
}; 
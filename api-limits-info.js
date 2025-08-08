/**
 * API Rate Limiting Information and Solutions
 * 
 * The 429 "Too Many Requests" error occurs when you exceed the Gemini API rate limits.
 * Here are the current limits and solutions:
 */

// GEMINI API RATE LIMITS (as of 2024):
// Free tier:
// - 15 requests per minute
// - 1,500 requests per day
// - 1 million tokens per minute

// SOLUTIONS IMPLEMENTED:

// 1. Switched from gemini-1.5-pro to gemini-1.5-flash
//    - Flash model has higher rate limits
//    - Faster response times
//    - Still provides excellent results

// 2. Added retry logic with exponential backoff
//    - Automatically retries failed requests
//    - Increases delay between retries
//    - Maximum 3 attempts

// 3. Better error handling
//    - Specific messages for different error types
//    - Retry suggestions for users
//    - Proper HTTP status codes

// 4. Generation config optimization
//    - Limited max output tokens to 1024
//    - Optimized temperature and other parameters
//    - Reduces API usage per request

// ADDITIONAL RECOMMENDATIONS:

// 1. For production use, consider:
//    - Upgrading to a paid tier for higher limits
//    - Implementing user-based rate limiting
//    - Adding request queuing
//    - Caching results for similar images

// 2. Monitor usage:
//    - Track API calls per user/session
//    - Implement daily/hourly usage tracking
//    - Set up usage alerts

// 3. Optimize image processing:
//    - Resize images before sending to API
//    - Compress images to reduce bandwidth
//    - Validate image quality before processing

module.exports = {
  // Rate limiting configuration
  RATE_LIMITS: {
    FREE_TIER: {
      requestsPerMinute: 15,
      requestsPerDay: 1500,
      tokensPerMinute: 1000000
    }
  },
  
  // Retry configuration
  RETRY_CONFIG: {
    maxRetries: 3,
    baseDelay: 2000,
    backoffMultiplier: 2
  }
};

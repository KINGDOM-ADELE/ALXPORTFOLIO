// Import the express-rate-limit middleware function
const rateLimit = require('express-rate-limit');

// Function to calculate the rate limit dynamically based on the provided limit
function calculateRateLimit(limit) {
    // Your logic to calculate the rate limit dynamically
    const dynamicLimit = limit; // Use the provided limit
    return dynamicLimit;
}

// Create a rate RateLimiter middleware with dynamic limit
const RateLimiter = (limit) => {
    return (req, res, next) => {
        const dynamicLimit = calculateRateLimit(limit);
        // Use the rateLimit middleware function directly (not as a constructor)
        const rateLimitMiddleware = rateLimit({
            windowMs: 60 * 1000, // 1 minute window
            max: dynamicLimit, // dynamically calculated limit
            message: "Too many requests from this IP, please try again later",
            headers: true, // send custom rate limit header
        });
        rateLimitMiddleware(req, res, next);
    };
};

module.exports = RateLimiter;

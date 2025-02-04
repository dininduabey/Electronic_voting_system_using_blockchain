const rateLimit = require("express-rate-limit");

exports.loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit to 5 login attempts per IP
    message: { message: "Too many login attempts. Try again later." }
});

exports.apiLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 100, // Limit each IP to 100 requests per minute
    message: { message: "Too many requests. Slow down." }
});

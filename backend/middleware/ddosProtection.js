const slowDown = require("express-slow-down");

exports.ddosProtection = slowDown({
    windowMs: 1 * 60 * 1000, // 1 minute
    delayAfter: 50, // Delay responses after 50 requests
    delayMs: 500 // Add 500ms delay per request
});

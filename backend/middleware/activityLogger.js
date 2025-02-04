const winston = require("winston");

// Configure Winston logger
const activityLogger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: "logs/activity.log" })
    ]
});

exports.logAdminActivity = (req, res, next) => {
    activityLogger.info({
        user: req.user.id,
        role: req.user.role,
        action: req.method,
        endpoint: req.originalUrl,
        timestamp: new Date().toISOString()
    });
    next();
};

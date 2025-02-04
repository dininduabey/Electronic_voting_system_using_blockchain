const winston = require("winston");

// Blockchain Transaction Logger
const blockchainLogger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: "logs/blockchain.log" })
    ]
});

exports.logBlockchainTransaction = (txHash, sender) => {
    blockchainLogger.info({
        transactionHash: txHash,
        sender,
        timestamp: new Date().toISOString()
    });
};

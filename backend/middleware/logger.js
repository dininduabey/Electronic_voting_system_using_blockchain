const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

// Create a write stream for logs
const logStream = fs.createWriteStream(path.join(__dirname, "../logs/access.log"), { flags: "a" });

module.exports = morgan("combined", { stream: logStream });

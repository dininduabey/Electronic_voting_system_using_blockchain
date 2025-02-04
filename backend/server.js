const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db"); // Database connection
const { loginLimiter, apiLimiter } = require("./middleware/rateLimiter");
const { ddosProtection } = require("./middleware/ddosProtection");
const helmet = require("helmet");
const cors = require("cors");
const logger = require("./middleware/logger");
require("dotenv").config();

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB();

// Import routes
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/candidates", require("./routes/candidateRoutes"));
app.use("/api/voters", require("./routes/voterRoutes"));
app.use("/api/voting", require("./routes/votingRoutes"));
app.use("/api/election", require("./routes/electionRoutes"));
app.use("/api/recovery", require("./routes/recoveryRoutes"));
app.use("/api/admin/login", loginLimiter); // Apply to login route
app.use("/api/", apiLimiter); // Apply to all API routes
app.use(ddosProtection); // Apply globally to all API requests
app.use(helmet()); // Protects against common security vulnerabilities
app.use(cors({ origin: ["https://yourfrontend.com"], credentials: true }));
app.use(logger); // Logs every request to `logs/access.log`

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
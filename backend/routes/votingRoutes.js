const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const { castVote, getVoteCount } = require("../controllers/votingController");
const { preventDoubleVoting } = require("../middleware/votingMiddleware");
const { logAdminActivity } = require("../middleware/activityLogger");

const router = express.Router();

router.post("/cast", authenticate, castVote);       // Cast a vote
router.get("/count", authenticate, getVoteCount);   // Get vote count
router.post("/cast", authenticate, preventDoubleVoting, castVote);
router.use(logAdminActivity); // Logs every voting request

module.exports = router;

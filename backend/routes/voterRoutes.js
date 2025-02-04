const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const { registerVoter, getVoters, updateVoter, deleteVoter } = require("../controllers/voterController");

const router = express.Router();

router.post("/register", authenticate, registerVoter);
router.get("/list", authenticate, getVoters);
router.put("/update/:voterId", authenticate, updateVoter);
router.delete("/delete/:voterId", authenticate, deleteVoter);

module.exports = router;

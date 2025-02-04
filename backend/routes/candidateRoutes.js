const express = require("express");
const { authenticate } = require("../middleware/authMiddleware");
const { addCandidate, getCandidates, updateCandidate, deleteCandidate } = require("../controllers/candidateController");

const router = express.Router();

router.post("/add", authenticate, addCandidate);
router.get("/list", authenticate, getCandidates);
router.put("/update/:candidateId", authenticate, updateCandidate);
router.delete("/delete/:candidateId", authenticate, deleteCandidate);

module.exports = router;

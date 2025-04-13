import express from "express";
import { GetVotes, sendVote } from "../controllers/voteController.js";
import { checkValidity } from "../controllers/recover.js";

const router = express.Router();

router.get("/getVotes", GetVotes);
router.post("/sendVote", sendVote);
router.get("/checkValidity", checkValidity);

export default router;
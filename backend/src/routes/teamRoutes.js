import express from "express";
import { addTeamMember, createTeam, getTeam, listTeams, updateTeam } from "../controllers/teamController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", listTeams);
router.get("/:id", getTeam);
router.post("/", authorize("Admin", "Project Manager"), createTeam);
router.put("/:id", authorize("Admin", "Project Manager"), updateTeam);
router.patch("/:id/members", authorize("Admin", "Project Manager"), addTeamMember);

export default router;

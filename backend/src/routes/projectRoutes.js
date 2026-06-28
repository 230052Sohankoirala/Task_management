import express from "express";
import {
  createProject,
  deleteProject,
  getProject,
  listProjects,
  projectRules,
  updateProject,
} from "../controllers/projectController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.use(protect);
router.get("/", listProjects);
router.get("/:id", getProject);
router.post("/", authorize("Admin", "Project Manager"), projectRules, validate, createProject);
router.patch("/:id", authorize("Admin", "Project Manager"), updateProject);
router.put("/:id", authorize("Admin", "Project Manager"), updateProject);
router.delete("/:id", authorize("Admin"), deleteProject);

export default router;

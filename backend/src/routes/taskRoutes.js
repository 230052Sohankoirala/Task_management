import express from "express";
import {
  addComment,
  createTask,
  deleteTask,
  getTask,
  listTasks,
  taskRules,
  updateTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.use(protect);
router.get("/", listTasks);
router.get("/:id", getTask);
router.post("/", taskRules, validate, createTask);
router.patch("/:id", updateTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.post("/:id/comments", addComment);

export default router;

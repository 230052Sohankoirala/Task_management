import express from "express";
import { listNotifications, markAllRead } from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, listNotifications);
router.post("/read-all", protect, markAllRead);

export default router;

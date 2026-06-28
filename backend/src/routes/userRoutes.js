import express from "express";
import { getUser, listUsers, updateUser } from "../controllers/userController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", listUsers);
router.get("/:id", getUser);
router.put("/:id", authorize("Admin"), updateUser);

export default router;

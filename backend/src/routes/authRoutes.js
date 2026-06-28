import express from "express";
import {
  forgotPassword,
  login,
  loginRules,
  me,
  register,
  registerRules,
  resetPassword,
  updateMe,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validate } from "../middleware/validate.js";

const router = express.Router();

router.post("/register", registerRules, validate, register);
router.post("/login", loginRules, validate, login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", protect, me);
router.put("/me", protect, updateMe);

export default router;

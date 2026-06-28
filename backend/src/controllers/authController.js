import { body } from "express-validator";
import User from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { signToken } from "../utils/token.js";

function authResponse(user) {
  return { token: signToken(user.id), user: user.toJSON() };
}

export const registerRules = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
];

export const loginRules = [
  body("email").isEmail().withMessage("Valid email is required"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const register = asyncHandler(async (req, res) => {
  const { name, email, password, username, ...profile } = req.body;
  const exists = await User.findOne({ $or: [{ email }, { username: username || email.split("@")[0] }] });

  if (exists) {
    throw new ApiError(409, "Email or username already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    role: "Team Member",
    requestedRole: "Team Member",
    active: false,
    approvalStatus: "pending",
    username: username || email.split("@")[0],
    avatar: profile.avatar || name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(),
    ...profile,
  });

  res.status(201).json({
    ok: true,
    status: user.approvalStatus,
    message: "Account request submitted. An admin must approve it before you can sign in.",
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (user.approvalStatus !== "approved" || !user.active) {
    throw new ApiError(403, "Your account is waiting for admin approval");
  }

  res.json(authResponse(user));
});

export const me = asyncHandler(async (req, res) => {
  res.json(req.user);
});

export const updateMe = asyncHandler(async (req, res) => {
  const updates = { ...req.body };
  delete updates.password;
  delete updates.role;

  const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true, runValidators: true });
  res.json(user);
});

export const forgotPassword = asyncHandler(async (_req, res) => {
  res.json({ ok: true, message: "If that email exists, reset instructions will be sent." });
});

export const resetPassword = asyncHandler(async (_req, res) => {
  res.json({ ok: true, message: "Password reset endpoint is ready for email-token integration." });
});

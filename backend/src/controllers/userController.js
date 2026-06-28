import User from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listUsers = asyncHandler(async (_req, res) => {
  const users = await User.find({ active: true, approvalStatus: "approved" }).sort({ name: 1 });
  res.json(users);
});

export const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) throw new ApiError(404, "User not found");
  res.json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
  const updates = { ...req.body };
  delete updates.password;

  const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
  if (!user) throw new ApiError(404, "User not found");
  res.json(user);
});

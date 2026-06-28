import Activity from "../models/Activity.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listActivity = asyncHandler(async (_req, res) => {
  const activities = await Activity.find().sort({ createdAt: -1 }).limit(100);
  res.json(activities);
});

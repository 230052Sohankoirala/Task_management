import Notification from "../models/Notification.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listNotifications = asyncHandler(async (req, res) => {
  const filter = req.user ? { $or: [{ userId: req.user.id }, { userId: null }] } : {};
  const notifications = await Notification.find(filter).sort({ createdAt: -1 });
  res.json(notifications);
});

export const markAllRead = asyncHandler(async (req, res) => {
  const filter = req.user ? { userId: req.user.id } : {};
  await Notification.updateMany(filter, { read: true });
  res.json({ ok: true });
});

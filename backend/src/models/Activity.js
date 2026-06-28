import mongoose from "mongoose";
import { modelOptions } from "../utils/modelOptions.js";

const activitySchema = new mongoose.Schema(
  {
    actorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    entityType: { type: String, enum: ["Task", "Project", "Team", "User"], required: true },
    entityId: { type: mongoose.Schema.Types.ObjectId },
    action: { type: String, required: true },
    message: { type: String, required: true },
  },
  modelOptions
);

activitySchema.index({ createdAt: -1 });

export default mongoose.model("Activity", activitySchema);

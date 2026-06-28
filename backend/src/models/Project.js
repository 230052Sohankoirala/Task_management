import mongoose from "mongoose";
import { modelOptions } from "../utils/modelOptions.js";

const projectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    key: { type: String, required: true, uppercase: true, trim: true },
    description: { type: String, default: "" },
    leadId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    teamIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    startDate: Date,
    dueDate: Date,
    status: {
      type: String,
      enum: ["Planning", "In Progress", "On Track", "At Risk", "Completed", "Archived"],
      default: "Planning",
    },
    priority: { type: String, enum: ["Critical", "High", "Medium", "Low"], default: "Medium" },
    progress: { type: Number, min: 0, max: 100, default: 0 },
    color: { type: String, default: "#2563eb" },
  },
  modelOptions
);

projectSchema.index({ key: 1 }, { unique: true });

export default mongoose.model("Project", projectSchema);

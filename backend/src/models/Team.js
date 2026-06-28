import mongoose from "mongoose";
import { modelOptions } from "../utils/modelOptions.js";

const teamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    leaderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    memberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    projectIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
  },
  modelOptions
);

export default mongoose.model("Team", teamSchema);

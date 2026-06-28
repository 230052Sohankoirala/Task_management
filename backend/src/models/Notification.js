import mongoose from "mongoose";
import { modelOptions } from "../utils/modelOptions.js";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", index: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, default: "" },
    read: { type: Boolean, default: false },
  },
  modelOptions
);

export default mongoose.model("Notification", notificationSchema);

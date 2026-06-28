import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import { modelOptions } from "../utils/modelOptions.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    username: { type: String, required: true, unique: true, lowercase: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6, select: false },
    role: {
      type: String,
      enum: ["Admin", "Project Manager", "Team Member"],
      default: "Team Member",
    },
    avatar: { type: String, default: "" },
    avatarUrl: { type: String, default: "" },
    phone: { type: String, default: "" },
    jobTitle: { type: String, default: "" },
    department: { type: String, default: "" },
    bio: { type: String, default: "" },
    timezone: { type: String, default: "Asia/Katmandu" },
    active: { type: Boolean, default: false },
    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },
    requestedRole: {
      type: String,
      enum: ["Admin", "Project Manager", "Team Member"],
      default: "Team Member",
    },
    approvedAt: Date,
    approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    teamIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
    rejectedAt: Date,
    rejectedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    rejectionReason: { type: String, default: "" },
  },
  modelOptions
);

userSchema.pre("save", async function hashPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = function comparePassword(candidate) {
  return bcrypt.compare(candidate, this.password);
};

export default mongoose.model("User", userSchema);

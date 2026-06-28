import mongoose from "mongoose";
import { modelOptions } from "../utils/modelOptions.js";

const commentSchema = new mongoose.Schema(
  {
    body: { type: String, required: true },
    authorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, toJSON: modelOptions.toJSON }
);

const attachmentSchema = new mongoose.Schema(
  {
    name: String,
    url: String,
    publicId: String,
    resourceType: String,
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true, toJSON: modelOptions.toJSON }
);

const taskSchema = new mongoose.Schema(
  {
    key: { type: String, uppercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" },
    type: { type: String, enum: ["Epic", "Story", "Task", "Bug", "Subtask"], default: "Task" },
    status: {
      type: String,
      enum: ["Backlog", "To Do", "In Progress", "In Review", "Done"],
      default: "Backlog",
    },
    priority: { type: String, enum: ["Critical", "High", "Medium", "Low"], default: "Medium" },
    reporterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    assigneeId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    labels: [{ type: String, trim: true }],
    sprintId: { type: String, default: "" },
    storyPoints: { type: Number, min: 0, default: 0 },
    startDate: Date,
    dueDate: Date,
    estimatedHours: { type: Number, min: 0, default: 0 },
    loggedHours: { type: Number, min: 0, default: 0 },
    parentTaskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
    watcherIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    subtasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }],
    comments: [commentSchema],
    attachments: [attachmentSchema],
  },
  modelOptions
);

taskSchema.index({ key: 1 }, { unique: true, sparse: true });
taskSchema.index({ status: 1, priority: 1, assigneeId: 1 });

export default mongoose.model("Task", taskSchema);

import { body } from "express-validator";
import Activity from "../models/Activity.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cleanObjectIds } from "../utils/ids.js";

export const taskRules = [
  body("title").trim().notEmpty().withMessage("Task title is required"),
  body("status").optional().isIn(["Backlog", "To Do", "In Progress", "In Review", "Done"]),
  body("priority").optional().isIn(["Critical", "High", "Medium", "Low"]),
];

async function nextTaskKey(projectId) {
  if (!projectId) return undefined;
  const project = await Project.findById(projectId);
  if (!project) return undefined;
  const count = await Task.countDocuments({ projectId });
  return `${project.key}-${count + 1}`;
}

export const listTasks = asyncHandler(async (req, res) => {
  const { status, priority, assigneeId, projectId, q } = req.query;
  const filter = {};

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (assigneeId) filter.assigneeId = assigneeId;
  if (projectId) filter.projectId = projectId;
  if (q) filter.$or = [{ title: new RegExp(q, "i") }, { description: new RegExp(q, "i") }];

  const tasks = await Task.find(filter).sort({ createdAt: -1 });
  res.json(tasks);
});

export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new ApiError(404, "Task not found");
  res.json(task);
});

export const createTask = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (body.watchers && !body.watcherIds) body.watcherIds = body.watchers;
  if (!Array.isArray(body.comments)) delete body.comments;
  if (!Array.isArray(body.attachments)) delete body.attachments;

  const payload = cleanObjectIds(body, [
    "projectId",
    "reporterId",
    "assigneeId",
    "parentTaskId",
    "watcherIds",
    "subtasks",
  ]);

  payload.reporterId = payload.reporterId || req.user?.id;
  payload.key = payload.key || (await nextTaskKey(payload.projectId));

  const task = await Task.create(payload);

  await Activity.create({
    actorId: req.user?.id,
    entityType: "Task",
    entityId: task._id,
    action: "created",
    message: `Created task ${task.title}`,
  });

  res.status(201).json(task);
});

export const updateTask = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (body.watchers && !body.watcherIds) body.watcherIds = body.watchers;
  if (!Array.isArray(body.comments)) delete body.comments;
  if (!Array.isArray(body.attachments)) delete body.attachments;

  const payload = cleanObjectIds(body, [
    "projectId",
    "reporterId",
    "assigneeId",
    "parentTaskId",
    "watcherIds",
    "subtasks",
  ]);
  const task = await Task.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });

  if (!task) throw new ApiError(404, "Task not found");

  await Activity.create({
    actorId: req.user?.id,
    entityType: "Task",
    entityId: task._id,
    action: "updated",
    message: `Updated task ${task.title}`,
  });

  res.json(task);
});

export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) throw new ApiError(404, "Task not found");
  res.json({ ok: true });
});

export const addComment = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) throw new ApiError(404, "Task not found");

  task.comments.push({ body: req.body.body, authorId: req.user.id });
  await task.save();
  res.status(201).json(task);
});

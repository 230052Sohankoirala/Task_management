import { body } from "express-validator";
import Activity from "../models/Activity.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cleanObjectIds } from "../utils/ids.js";

export const projectRules = [
  body("name").trim().notEmpty().withMessage("Project name is required"),
  body("key").trim().notEmpty().withMessage("Project key is required"),
];

export const listProjects = asyncHandler(async (_req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  res.json(projects);
});

export const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");

  const tasks = await Task.find({ projectId: project._id }).sort({ createdAt: -1 });
  res.json({ ...project.toJSON(), tasks });
});

export const createProject = asyncHandler(async (req, res) => {
  const payload = cleanObjectIds(req.body, ["leadId", "memberIds", "teamIds"]);
  payload.key = payload.key?.toUpperCase();

  const project = await Project.create(payload);
  await Activity.create({
    actorId: req.user?.id,
    entityType: "Project",
    entityId: project._id,
    action: "created",
    message: `Created project ${project.name}`,
  });

  res.status(201).json(project);
});

export const updateProject = asyncHandler(async (req, res) => {
  const payload = cleanObjectIds(req.body, ["leadId", "memberIds", "teamIds"]);
  if (payload.key) payload.key = payload.key.toUpperCase();

  const project = await Project.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
  if (!project) throw new ApiError(404, "Project not found");
  res.json(project);
});

export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndDelete(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");
  res.json({ ok: true });
});

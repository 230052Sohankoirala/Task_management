import Project from "../models/Project.js";
import Task from "../models/Task.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const summary = asyncHandler(async (_req, res) => {
  const [tasksByStatus, tasksByPriority, projectsByStatus, totals] = await Promise.all([
    Task.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    Task.aggregate([{ $group: { _id: "$priority", count: { $sum: 1 } } }]),
    Project.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
    Promise.all([Task.countDocuments(), Project.countDocuments(), Task.countDocuments({ status: "Done" })]),
  ]);

  res.json({
    totals: { tasks: totals[0], projects: totals[1], completedTasks: totals[2] },
    tasks: tasksByStatus,
    priorities: tasksByPriority,
    projects: projectsByStatus,
  });
});

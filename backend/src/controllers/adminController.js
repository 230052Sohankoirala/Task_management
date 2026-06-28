import Project from "../models/Project.js";
import Task from "../models/Task.js";
import Team from "../models/Team.js";
import User from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const validRoles = ["Admin", "Project Manager", "Team Member"];

async function getOrCreateManagedTeam({ user, teamId, project, managerId, role }) {
  if (teamId) {
    const team = await Team.findById(teamId);
    if (!team) throw new ApiError(404, "Team not found");
    return team;
  }

  const leaderId = role === "Project Manager" ? user._id : managerId;
  if (!leaderId) throw new ApiError(422, "Choose a project manager or team");

  let team = await Team.findOne({
    leaderId,
    ...(project ? { projectIds: project._id } : {}),
  });

  if (!team) {
    const leader = await User.findById(leaderId);
    if (!leader) throw new ApiError(404, "Project manager not found");

    team = await Team.create({
      name: project ? `${leader.name} - ${project.name}` : `${leader.name}'s Team`,
      description: project ? `Managed by ${leader.name} for ${project.name}` : `Managed by ${leader.name}`,
      leaderId,
      memberIds: [leaderId],
      projectIds: project ? [project._id] : [],
    });
  }

  return team;
}

async function assignUserToManagedTeam({ user, teamId, projectId, managerId, role }) {
  const project = projectId ? await Project.findById(projectId) : null;
  if (projectId && !project) throw new ApiError(404, "Project not found");
  const team = await getOrCreateManagedTeam({ user, teamId, project, managerId, role });

  await Team.updateMany(
    { _id: { $ne: team._id } },
    { $pull: { memberIds: user._id } }
  );

  if (role === "Project Manager") {
    await Team.updateMany(
      { _id: { $ne: team._id }, leaderId: user._id },
      { $unset: { leaderId: "" } }
    );
  }

  const memberIds = new Set((team.memberIds || []).map((id) => id.toString()));
  memberIds.add(user._id.toString());
  team.memberIds = [...memberIds];

  if (project) {
    const teamProjectIds = new Set((team.projectIds || []).map((id) => id.toString()));
    teamProjectIds.add(project._id.toString());
    team.projectIds = [...teamProjectIds];
  }

  if (role === "Project Manager") {
    team.leaderId = user._id;
  }

  await team.save();

  if (project) {
    const projectMemberIds = new Set((project.memberIds || []).map((id) => id.toString()));
    const projectTeamIds = new Set((project.teamIds || []).map((id) => id.toString()));
    projectMemberIds.add(user._id.toString());
    projectTeamIds.add(team._id.toString());
    project.memberIds = [...projectMemberIds];
    project.teamIds = [...projectTeamIds];

    if (role === "Project Manager") {
      project.leadId = user._id;
    }

    await project.save();
  }

  user.teamIds = [team._id];
  await user.save();

  return team;
}

export const dashboard = asyncHandler(async (_req, res) => {
  const [users, projects, activeProjects, tasks, completedTasks, overdueTasks] = await Promise.all([
    User.countDocuments({ active: true }),
    Project.countDocuments(),
    Project.countDocuments({ status: { $ne: "Archived" } }),
    Task.countDocuments(),
    Task.countDocuments({ status: "Done" }),
    Task.countDocuments({ dueDate: { $lt: new Date() }, status: { $ne: "Done" } }),
  ]);

  res.json({
    users,
    projects,
    activeProjects,
    tasks,
    completedTasks,
    overdueTasks,
  });
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const { role } = req.body;

  if (!validRoles.includes(role)) {
    throw new ApiError(422, "Invalid role");
  }

  const user = await User.findByIdAndUpdate(req.params.id, { role }, { new: true, runValidators: true });
  if (!user) throw new ApiError(404, "User not found");

  const updatedUser = await User.findById(user._id);
  res.json(updatedUser);
});

export const pendingUsers = asyncHandler(async (_req, res) => {
  const users = await User.find({ approvalStatus: "pending" }).sort({ createdAt: -1 });
  res.json(users);
});

export const approveUser = asyncHandler(async (req, res) => {
  const { role, teamId, projectId, managerId } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) throw new ApiError(404, "User not found");
  if (!["Project Manager", "Team Member"].includes(role)) {
    throw new ApiError(422, "Admins can approve new users only as Project Manager or Team Member");
  }

  user.role = role;
  user.active = true;
  user.approvalStatus = "approved";
  user.approvedAt = new Date();
  user.approvedBy = req.user.id;
  user.rejectionReason = "";
  await user.save();
  await assignUserToManagedTeam({ user, teamId, projectId, managerId, role });

  const updatedUser = await User.findById(user._id);
  res.json(updatedUser);
});

export const assignUserTeam = asyncHandler(async (req, res) => {
  const { teamId, projectId, managerId } = req.body;
  const user = await User.findById(req.params.id);

  if (!user) throw new ApiError(404, "User not found");

  await assignUserToManagedTeam({ user, teamId, projectId, managerId, role: user.role });

  res.json(user);
});

export const rejectUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) throw new ApiError(404, "User not found");

  user.active = false;
  user.approvalStatus = "rejected";
  user.rejectedAt = new Date();
  user.rejectedBy = req.user.id;
  user.rejectionReason = req.body.reason || "Rejected by admin";
  await user.save();

  res.json(user);
});

export const archiveProject = asyncHandler(async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, { status: "Archived" }, { new: true, runValidators: true });
  if (!project) throw new ApiError(404, "Project not found");

  res.json(project);
});

import Team from "../models/Team.js";
import Project from "../models/Project.js";
import User from "../models/User.js";
import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { cleanObjectIds } from "../utils/ids.js";

function canManageTeam(user, team) {
  return user.role === "Admin" || (user.role === "Project Manager" && team.leaderId?.toString() === user.id);
}

export const listTeams = asyncHandler(async (_req, res) => {
  const teams = await Team.find().sort({ name: 1 });
  res.json(teams);
});

export const getTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.id);
  if (!team) throw new ApiError(404, "Team not found");
  res.json(team);
});

export const createTeam = asyncHandler(async (req, res) => {
  const payload = cleanObjectIds(req.body, ["leaderId", "memberIds", "projectIds"]);

  if (req.user.role === "Project Manager") {
    payload.leaderId = req.user.id;
    payload.memberIds = [...new Set([...(payload.memberIds || []), req.user.id])];
  }

  const team = await Team.create(payload);
  res.status(201).json(team);
});

export const updateTeam = asyncHandler(async (req, res) => {
  const existingTeam = await Team.findById(req.params.id);
  if (!existingTeam) throw new ApiError(404, "Team not found");
  if (!canManageTeam(req.user, existingTeam)) throw new ApiError(403, "Only admin or this team's project manager can update the team");

  const payload = cleanObjectIds(req.body, ["leaderId", "memberIds", "projectIds"]);
  if (req.user.role === "Project Manager") {
    delete payload.leaderId;
    delete payload.projectIds;
  }

  const team = await Team.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });
  if (!team) throw new ApiError(404, "Team not found");
  res.json(team);
});

export const addTeamMember = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const team = await Team.findById(req.params.id);

  if (!team) throw new ApiError(404, "Team not found");
  if (!canManageTeam(req.user, team)) throw new ApiError(403, "Only admin or this team's project manager can add members");
  if (!userId) throw new ApiError(422, "User is required");

  const user = await User.findById(userId);
  if (!user || !user.active || user.approvalStatus !== "approved") {
    throw new ApiError(404, "Approved user not found");
  }

  const memberIds = new Set((team.memberIds || []).map((id) => id.toString()));
  memberIds.add(user._id.toString());
  team.memberIds = [...memberIds];
  await team.save();

  const userTeamIds = new Set((user.teamIds || []).map((id) => id.toString()));
  userTeamIds.add(team._id.toString());
  user.teamIds = [...userTeamIds];
  await user.save();

  if (team.projectIds?.length) {
    await Project.updateMany(
      { _id: { $in: team.projectIds } },
      { $addToSet: { memberIds: user._id, teamIds: team._id } }
    );
  }

  res.json(team);
});

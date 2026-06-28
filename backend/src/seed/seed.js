import "dotenv/config";
import { connectDB } from "../config/db.js";
import Activity from "../models/Activity.js";
import Notification from "../models/Notification.js";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import Team from "../models/Team.js";
import User from "../models/User.js";

async function seed() {
  await connectDB();

  await Promise.all([
    Activity.deleteMany({}),
    Notification.deleteMany({}),
    Task.deleteMany({}),
    Team.deleteMany({}),
    Project.deleteMany({}),
    User.deleteMany({}),
  ]);

  await User.create({
    name: "Workspace Admin",
    username: "admin",
    email: "admin@taskmanagement.local",
    password: "Admin@12345",
    role: "Admin",
    requestedRole: "Admin",
    avatar: "WA",
    jobTitle: "Workspace Administrator",
    department: "Administration",
    timezone: "Asia/Katmandu",
    active: true,
    approvalStatus: "approved",
    approvedAt: new Date(),
  });

  console.log("Seed complete. Workspace is empty except for the admin account.");
  console.log("Admin login: admin@taskmanagement.local / Admin@12345");
  process.exit(0);
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});

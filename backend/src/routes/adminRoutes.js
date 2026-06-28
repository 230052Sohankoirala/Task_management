import express from "express";
import { approveUser, archiveProject, assignUserTeam, dashboard, pendingUsers, rejectUser, updateUserRole } from "../controllers/adminController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, authorize("Admin"));
router.get("/dashboard", dashboard);
router.get("/users/pending", pendingUsers);
router.patch("/users/:id/role", updateUserRole);
router.patch("/users/:id/team", assignUserTeam);
router.patch("/users/:id/approve", approveUser);
router.patch("/users/:id/reject", rejectUser);
router.patch("/projects/:id/archive", archiveProject);

export default router;

import api from "../utils/api";
import { withFallback } from "./mockService";

export const adminService = {
  dashboard: () => withFallback(() => api.get("/admin/dashboard"), null),
  pendingUsers: () => withFallback(() => api.get("/admin/users/pending"), []),
  approveUser: (id, payload) => {
    const body = typeof payload === "string" ? { role: payload } : payload;
    return withFallback(() => api.patch(`/admin/users/${id}/approve`, body), { id, ...body, active: true, approvalStatus: "approved", teamIds: body.teamId ? [body.teamId] : [] });
  },
  assignUserTeam: (id, payload) => {
    const body = typeof payload === "string" ? { teamId: payload } : payload;
    return withFallback(() => api.patch(`/admin/users/${id}/team`, body), { id, teamIds: body.teamId ? [body.teamId] : [] });
  },
  rejectUser: (id, reason) => withFallback(() => api.patch(`/admin/users/${id}/reject`, { reason }), { id, active: false, approvalStatus: "rejected", rejectionReason: reason }),
  updateUserRole: (id, role) => withFallback(() => api.patch(`/admin/users/${id}/role`, { role }), { id, role }),
  archiveProject: (id) => withFallback(() => api.patch(`/admin/projects/${id}/archive`), { id, status: "Archived" }),
};

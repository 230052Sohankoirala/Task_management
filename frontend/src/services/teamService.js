import api from "../utils/api";

export const teamService = {
  list: async () => {
    try {
      const response = await api.get("/teams");
      return response.data;
    } catch {
      return [];
    }
  },
  get: async (id) => {
    try {
      const response = await api.get(`/teams/${id}`);
      return response.data;
    } catch {
      return null;
    }
  },
  save: async (payload) => {
    try {
      const response = payload.id ? await api.put(`/teams/${payload.id}`, payload) : await api.post("/teams", payload);
      return response.data;
    } catch {
      return { ...payload, id: payload.id || `t-${Date.now()}` };
    }
  },
  addMember: async (teamId, userId) => {
    const response = await api.patch(`/teams/${teamId}/members`, { userId });
    return response.data;
  },
};

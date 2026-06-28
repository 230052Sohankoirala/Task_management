import api from "../utils/api";

export const projectService = {
  list: async () => {
    try {
      const response = await api.get("/projects");
      return response.data;
    } catch {
      return [];
    }
  },
  get: async (id) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch {
      return null;
    }
  },
  save: async (payload) => {
    try {
      const response = await api.post("/projects", payload);
      return response.data;
    } catch {
      return { ...payload, id: `p-${Date.now()}` };
    }
  },
  update: async (id, payload) => {
    try {
      const response = await api.put(`/projects/${id}`, payload);
      return response.data;
    } catch {
      return { ...payload, id };
    }
  },
};

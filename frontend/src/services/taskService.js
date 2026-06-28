import api from "../utils/api";

export const taskService = {
  list: async () => {
    try {
      const response = await api.get("/tasks");
      return response.data;
    } catch {
      return [];
    }
  },
  get: async (id) => {
    try {
      const response = await api.get(`/tasks/${id}`);
      return response.data;
    } catch {
      return null;
    }
  },
  save: async (payload) => {
    try {
      const response = await api.post("/tasks", payload);
      return response.data;
    } catch {
      return { ...payload, id: `task-${Date.now()}`, key: payload.key || `NEW-${Date.now().toString().slice(-4)}` };
    }
  },
  update: async (id, payload) => {
    try {
      const response = await api.put(`/tasks/${id}`, payload);
      return response.data;
    } catch {
      return { ...payload, id };
    }
  },
  move: async (id, status) => {
    try {
      const response = await api.patch(`/tasks/${id}`, { status });
      return response.data;
    } catch {
      return { id, status };
    }
  },
};

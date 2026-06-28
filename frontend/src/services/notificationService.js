import api from "../utils/api";

export const notificationService = {
  list: async () => {
    try {
      const response = await api.get("/notifications");
      return response.data;
    } catch {
      return [];
    }
  },
  markAllRead: async () => {
    try {
      const response = await api.post("/notifications/read-all");
      return response.data;
    } catch {
      return { ok: true };
    }
  },
};

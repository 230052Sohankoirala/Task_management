import api from "../utils/api";

export const activityService = {
  list: async () => {
    try {
      const response = await api.get("/activity");
      return response.data;
    } catch {
      return [];
    }
  },
};

import api from "../utils/api";
export const userService = {
  list: async () => {
    try {
      const response = await api.get("/users");
      return response.data;
    } catch {
      return [];
    }
  },
  update: async (id, payload) => {
    try {
      const response = await api.put(`/users/${id}`, payload);
      return response.data;
    } catch {
      return { ...payload, id };
    }
  },
};

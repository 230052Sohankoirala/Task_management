import api from "../utils/api";
import { demoLogin } from "./demoData";

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post("/auth/login", credentials);
      return response.data;
    } catch (error) {
      if (credentials.email === "admin@taskmanagement.local" || credentials.email?.endsWith("@flowdesk.local")) {
        return demoLogin(credentials);
      }
      throw error;
    }
  },
  register: async (payload) => {
    const response = await api.post("/auth/register", payload);
    return response.data;
  },
  forgotPassword: async (email) => {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  },
  resetPassword: async (payload) => {
    const response = await api.post("/auth/reset-password", payload);
    return response.data;
  },
};

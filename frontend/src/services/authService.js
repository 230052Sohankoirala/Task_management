import api from "../utils/api";
import { users } from "../data/users";
import { withFallback } from "./mockService";

export const authService = {
  login: (credentials) => withFallback(() => api.post("/auth/login", credentials), { token: "mock-token", user: users[0] }),
  register: (payload) => withFallback(() => api.post("/auth/register", payload), { token: "mock-token", user: { ...users[5], ...payload } }),
  forgotPassword: (email) => withFallback(() => api.post("/auth/forgot-password", { email }), { ok: true }),
  resetPassword: (payload) => withFallback(() => api.post("/auth/reset-password", payload), { ok: true }),
};

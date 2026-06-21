import api from "../utils/api";
import { withFallback } from "./mockService";

export const projectService = {
  list: () => withFallback(() => api.get("/projects"), []),
  get: (id) => withFallback(() => api.get(`/projects/${id}`), null),
  save: (payload) => withFallback(() => api.post("/projects", payload), payload),
};

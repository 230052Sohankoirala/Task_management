import api from "../utils/api";
import { projects } from "../data/projects";
import { withFallback } from "./mockService";

export const projectService = {
  list: () => withFallback(() => api.get("/projects"), projects),
  get: (id) => withFallback(() => api.get(`/projects/${id}`), projects.find((project) => project.id === id)),
  save: (payload) => withFallback(() => api.post("/projects", payload), payload),
};

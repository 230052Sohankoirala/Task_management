import api from "../utils/api";
import { tasks } from "../data/tasks";
import { projects } from "../data/projects";
import { withFallback } from "./mockService";

export const reportService = {
  summary: () => withFallback(() => api.get("/reports/summary"), { tasks, projects }),
};

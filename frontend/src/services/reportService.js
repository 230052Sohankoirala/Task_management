import api from "../utils/api";
import { withFallback } from "./mockService";

export const reportService = {
  summary: () => withFallback(() => api.get("/reports/summary"), { tasks: [], projects: [] }),
};

import api from "../utils/api";
import { withFallback } from "./mockService";

export const taskService = {
  list: () => withFallback(() => api.get("/tasks"), []),
  get: (id) => withFallback(() => api.get(`/tasks/${id}`), null),
  save: (payload) => withFallback(() => api.post("/tasks", payload), payload),
  move: (id, status) => withFallback(() => api.patch(`/tasks/${id}`, { status }), { id, status }),
};

import api from "../utils/api";
import { tasks } from "../data/tasks";
import { withFallback } from "./mockService";

export const taskService = {
  list: () => withFallback(() => api.get("/tasks"), tasks),
  get: (id) => withFallback(() => api.get(`/tasks/${id}`), tasks.find((task) => task.id === id)),
  save: (payload) => withFallback(() => api.post("/tasks", payload), payload),
  move: (id, status) => withFallback(() => api.patch(`/tasks/${id}`, { status }), { id, status }),
};

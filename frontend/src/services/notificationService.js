import api from "../utils/api";
import { notifications } from "../data/notifications";
import { withFallback } from "./mockService";

export const notificationService = {
  list: () => withFallback(() => api.get("/notifications"), notifications),
  markAllRead: () => withFallback(() => api.post("/notifications/read-all"), { ok: true }),
};

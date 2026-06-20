import api from "../utils/api";
import { users } from "../data/users";
import { withFallback } from "./mockService";

export const userService = {
  list: () => withFallback(() => api.get("/users"), users),
  update: (id, payload) => withFallback(() => api.put(`/users/${id}`, payload), { ...payload, id }),
};

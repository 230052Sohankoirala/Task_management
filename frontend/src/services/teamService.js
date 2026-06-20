import api from "../utils/api";
import { teams } from "../data/teams";
import { withFallback } from "./mockService";

export const teamService = {
  list: () => withFallback(() => api.get("/teams"), teams),
  get: (id) => withFallback(() => api.get(`/teams/${id}`), teams.find((team) => team.id === id)),
};

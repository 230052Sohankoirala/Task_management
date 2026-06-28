import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import { teamService } from "../services/teamService";

export const TeamContext = createContext(null);

export function TeamProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadTeams = useCallback(async () => {
    if (!user) {
      setTeams([]);
      return [];
    }

    setLoading(true);
    try {
      const data = await teamService.list();
      setTeams(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load teams");
      return [];
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  const saveTeam = useCallback(async (team) => {
    let saved;

    try {
      saved = await teamService.save(team);
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not save team");
      throw error;
    }

    setTeams((current) => {
      const nextTeam = saved?.id ? saved : { ...team, id: team.id || `t-${Date.now()}` };
      const exists = current.some((item) => item.id === nextTeam.id);
      return exists ? current.map((item) => (item.id === nextTeam.id ? nextTeam : item)) : [nextTeam, ...current];
    });
    toast.success("Team saved");
    return saved;
  }, []);

  const addTeamMember = useCallback(async (teamId, userId) => {
    try {
      const updated = await teamService.addMember(teamId, userId);
      setTeams((current) => current.map((team) => (team.id === teamId ? updated : team)));
      toast.success("Member added to team");
      return updated;
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not add member");
      throw error;
    }
  }, []);

  const value = useMemo(() => ({ teams, loading, loadTeams, saveTeam, addTeamMember }), [teams, loading, loadTeams, saveTeam, addTeamMember]);

  return <TeamContext.Provider value={value}>{children}</TeamContext.Provider>;
}

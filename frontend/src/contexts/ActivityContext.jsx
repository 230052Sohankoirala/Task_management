import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import { activityService } from "../services/activityService";

export const ActivityContext = createContext(null);

export function ActivityProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);

  const loadActivity = useCallback(async () => {
    if (!user) {
      setActivities([]);
      return [];
    }

    try {
      const data = await activityService.list();
      setActivities(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load activity");
      return [];
    }
  }, [user]);

  useEffect(() => {
    loadActivity();
  }, [loadActivity]);

  const value = useMemo(() => ({ activities, loadActivity }), [activities, loadActivity]);

  return <ActivityContext.Provider value={value}>{children}</ActivityContext.Provider>;
}

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import { userService } from "../services/userService";

export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const { user: currentUser } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    if (!currentUser) {
      setUsers([]);
      return [];
    }

    setLoading(true);
    try {
      const data = await userService.list();
      setUsers(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load users");
      return [];
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const updateUser = useCallback(async (id, payload) => {
    const updated = await userService.update(id, payload);
    setUsers((current) => current.map((user) => (user.id === id ? { ...user, ...updated } : user)));
    toast.success("User updated");
    return updated;
  }, []);

  const value = useMemo(() => ({ users, loading, loadUsers, updateUser }), [users, loading, loadUsers, updateUser]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

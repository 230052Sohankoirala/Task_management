import { createContext, useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { users } from "../data/users";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : users[0]);

  const login = useCallback(({ email, remember }) => {
    const nextUser = users.find((item) => item.email === email) || users[0];
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("token", "mock-token");
    storage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser);
    toast.success(`Welcome back, ${nextUser.name}`);
    return nextUser;
  }, []);

  const register = useCallback((payload) => {
    const nextUser = { ...users[5], ...payload, id: "u-local" };
    localStorage.setItem("token", "mock-token");
    localStorage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser);
    toast.success("Workspace account created");
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    setUser(null);
    toast.success("Signed out");
  }, []);

  const updateProfile = useCallback((updates) => {
    const nextUser = { ...user, ...updates };
    localStorage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser);
    toast.success("Profile updated");
  }, [user]);

  const value = useMemo(() => ({ user, users, login, register, logout, updateProfile, isAuthenticated: Boolean(user) }), [user, login, register, logout, updateProfile]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

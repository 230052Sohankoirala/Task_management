import { createContext, useCallback, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { authService } from "../services/authService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);

  const login = useCallback(async ({ email, password, remember }) => {
    const response = await authService.login({ email, password });
    const nextUser = response.user;
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem("token", response.token);
    storage.setItem("user", JSON.stringify(nextUser));
    setUser(nextUser);
    toast.success(`Welcome back, ${nextUser.name}`);
    return nextUser;
  }, []);

  const register = useCallback(async (payload) => {
    const response = await authService.register(payload);
    toast.success("Account request sent to admin");
    return response;
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

  const value = useMemo(() => ({ user, login, register, logout, updateProfile, isAuthenticated: Boolean(user) }), [user, login, register, logout, updateProfile]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

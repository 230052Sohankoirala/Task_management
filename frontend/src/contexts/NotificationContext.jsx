import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import { notificationService } from "../services/notificationService";

export const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { user } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  const loadNotifications = useCallback(async () => {
    if (!user) {
      setNotifications([]);
      return [];
    }

    try {
      const data = await notificationService.list();
      setNotifications(Array.isArray(data) ? data : []);
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not load notifications");
      return [];
    }
  }, [user]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const markAllRead = useCallback(async () => {
    await notificationService.markAllRead();
    setNotifications((current) => current.map((item) => ({ ...item, read: true })));
    toast.success("All notifications marked read");
  }, []);

  const markRead = useCallback((id) => {
    setNotifications((current) => current.map((item) => (item.id === id ? { ...item, read: true } : item)));
  }, []);

  const deleteNotification = useCallback((id) => {
    setNotifications((current) => current.filter((item) => item.id !== id));
  }, []);

  const unread = useMemo(() => notifications.filter((item) => !item.read).length, [notifications]);
  const value = useMemo(() => ({ notifications, unread, markAllRead, markRead, deleteNotification, loadNotifications }), [notifications, unread, markAllRead, markRead, deleteNotification, loadNotifications]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

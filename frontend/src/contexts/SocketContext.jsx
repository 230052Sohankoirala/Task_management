import { createContext, useEffect, useMemo } from "react";
import { createSocket } from "../utils/socket";

export const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const socket = useMemo(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return createSocket(token);
  }, []);

  useEffect(() => {
    return () => socket.disconnect();
  }, [socket]);

  const value = useMemo(() => ({ socket, connected: Boolean(socket?.connected) }), [socket]);
  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

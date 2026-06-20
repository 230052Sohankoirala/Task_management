import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:4000";

export const createSocket = (token) =>
  io(SOCKET_URL, {
    autoConnect: false,
    auth: { token },
  });

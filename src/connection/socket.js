import { io } from "socket.io-client";

const base_url = import.meta.env.VITE_API_BASE_URL || "";
// Fallback if base_url doesn't include /api/v1
const socketURL = base_url.includes("/api/v1")
  ? base_url.replace("/api/v1", "")
  : base_url;

let socket = null;

export const initSocket = () => {
  if (!socket) {
    socket = io(socketURL, {
      withCredentials: true,
      transports: ["websocket", "polling"],
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};


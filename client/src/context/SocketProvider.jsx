import { createContext, useContext } from "react";
import { SOCKET_URL } from "../resources/constants";
import socketio from "socket.io-client";

const SocketContext = createContext();

export default function SocketProvider({ children }) {
  const socket = socketio.connect(SOCKET_URL);
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a provider");
  }
  const socket = context;
  return socket;
}

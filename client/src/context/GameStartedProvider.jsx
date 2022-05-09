import { createContext, useContext, useState } from "react";

const GameStartedContext = createContext();

export default function GameStartedProvider({ children }) {
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <GameStartedContext.Provider value={{ gameStarted, setGameStarted }}>
      {children}
    </GameStartedContext.Provider>
  );
}

export function useGameStarted() {
  const context = useContext(GameStartedContext);
  if (!context) {
    throw new Error("useGameStarted must be used within a provider");
  }
  const { gameStarted, setGameStarted } = context;
  return { gameStarted, setGameStarted };
}

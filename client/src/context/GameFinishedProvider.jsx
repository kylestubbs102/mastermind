import { createContext, useContext, useState } from "react";

const GameFinishedContext = createContext();

export default function GameFinishedProvider({ children }) {
  const [gameFinished, setGameFinished] = useState(false);
  return (
    <GameFinishedContext.Provider value={{ gameFinished, setGameFinished }}>
      {children}
    </GameFinishedContext.Provider>
  );
}

export function useGameFinished() {
  const context = useContext(GameFinishedContext);
  if (!context) {
    throw new Error("useGameFinished must be used within a provider");
  }
  const { gameFinished, setGameFinished } = context;
  return { gameFinished, setGameFinished };
}

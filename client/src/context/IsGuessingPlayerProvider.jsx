import { createContext, useContext, useState } from "react";

const IsGuessingPlayerContext = createContext();

export default function IsGuessingPlayerProvider({ children }) {
  const [isGuessingPlayer, setIsGuessingPlayer] = useState(null);
  return (
    <IsGuessingPlayerContext.Provider value={{ isGuessingPlayer, setIsGuessingPlayer }}>
      {children}
    </IsGuessingPlayerContext.Provider>
  );
}

export function useIsGuessingPlayer() {
  const context = useContext(IsGuessingPlayerContext);
  if (!context) {
    throw new Error("useIsGuessingPlayer must be used within a provider");
  }
  const { isGuessingPlayer, setIsGuessingPlayer } = context;
  return { isGuessingPlayer, setIsGuessingPlayer };
}

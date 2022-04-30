import { createContext, useContext, useState } from "react";

const GuessContext = createContext();

export default function GuessProvider({ children }) {
  const [guesses, setGuesses] = useState([]);
  return (
    <GuessContext.Provider value={{ guesses, setGuesses }}>
      {children}
    </GuessContext.Provider>
  );
}

export function useGuesses() {
  const context = useContext(GuessContext);
  if (!context) {
    throw new Error("useGuesses must be used within a provider");
  }
  const { guesses, setGuesses } = context;
  return { guesses, setGuesses };
}

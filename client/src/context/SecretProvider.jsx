import { createContext, useContext, useState } from "react";

const SecretContext = createContext();

export default function SecretProvider({ children }) {
  const [secret, setSecret] = useState(["red", "red", "red", "green"]);
  return (
    <SecretContext.Provider value={{ secret, setSecret }}>
      {children}
    </SecretContext.Provider>
  );
}

export function useSecret() {
  const context = useContext(SecretContext);
  if (!context) {
    throw new Error("useSecret must be used within a provider");
  }
  const { secret, setSecret } = context;
  return { secret, setSecret };
}

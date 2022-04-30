import { createContext, useContext, useState } from "react";

const ColorContext = createContext();

export default function ColorProvider({ children }) {
  const [color, setColor] = useState("white"); // set to white because placeholders are white
  return (
    <ColorContext.Provider value={{ color, setColor }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (!context) {
    throw new Error("useColor must be used within a provider");
  }
  const { color, setColor } = context;
  return { color, setColor };
}

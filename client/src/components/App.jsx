import { ChakraProvider } from "@chakra-ui/react";
import ColorProvider from "../context/ColorProvider";
import GameFinishedProvider from "../context/GameFinishedProvider";
import GuessProvider from "../context/GuessProvider";
import SecretProvider from "../context/SecretProvider";
import Game from "./Game";

function App() {
  return (
    <ChakraProvider>
      <GameFinishedProvider>
        <ColorProvider>
          <GuessProvider>
            <SecretProvider>
              <Game />
            </SecretProvider>
          </GuessProvider>
        </ColorProvider>
      </GameFinishedProvider>
    </ChakraProvider>
  );
}

export default App;

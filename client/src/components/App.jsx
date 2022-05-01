import { ChakraProvider } from "@chakra-ui/react";
import ColorProvider from "../context/ColorProvider";
import GameFinishedProvider from "../context/GameFinishedProvider";
import GuessProvider from "../context/GuessProvider";
import IsGuessingPlayerProvider from "../context/IsGuessingPlayerProvider";
import SecretProvider from "../context/SecretProvider";
import Game from "./Game";

function App() {
  return (
    <ChakraProvider>
      <GameFinishedProvider>
        <ColorProvider>
          <GuessProvider>
            <SecretProvider>
              <IsGuessingPlayerProvider>
                <Game />
              </IsGuessingPlayerProvider>
            </SecretProvider>
          </GuessProvider>
        </ColorProvider>
      </GameFinishedProvider>
    </ChakraProvider>
  );
}

export default App;

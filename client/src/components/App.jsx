import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import ColorProvider from "../context/ColorProvider";
import GameFinishedProvider from "../context/GameFinishedProvider";
import GuessProvider from "../context/GuessProvider";
import IsGuessingPlayerProvider from "../context/IsGuessingPlayerProvider";
import SecretProvider from "../context/SecretProvider";
import WelcomePage from "./WelcomePage";
import theme from "../resources/theme";
import SocketProvider from "../context/SocketProvider";
import SingleplayerGame from "./SingleplayerGame";
import MultiplayerGame from "./MultiplayerGame";
import GameStartedProvider from "../context/GameStartedProvider";

function App() {
  function generateUrl(date) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  return (
    <ChakraProvider theme={theme}>
      <GameFinishedProvider>
        <ColorProvider>
          <GuessProvider>
            <SecretProvider>
              <IsGuessingPlayerProvider>
                <GameStartedProvider>
                  <SocketProvider>
                    <Router>
                      <Routes>
                        <Route path="/" element={<WelcomePage />} />
                        <Route
                          path="/singleplayer"
                          element={<SingleplayerGame />}
                        />
                        <Route
                          path="/multiplayer"
                          on
                          element={
                            <Navigate
                              to={"/multiplayer/" + generateUrl()}
                              replace={true}
                            />
                          }
                        />
                        <Route
                          path="/multiplayer/:gameId"
                          element={<MultiplayerGame />}
                        />
                      </Routes>
                    </Router>
                  </SocketProvider>
                </GameStartedProvider>
              </IsGuessingPlayerProvider>
            </SecretProvider>
          </GuessProvider>
        </ColorProvider>
      </GameFinishedProvider>
    </ChakraProvider>
  );
}

export default App;

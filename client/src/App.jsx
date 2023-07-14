import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import ColorProvider from "./context/ColorProvider";
import GameFinishedProvider from "./context/GameFinishedProvider";
import GameStartedProvider from "./context/GameStartedProvider";
import GuessProvider from "./context/GuessProvider";
import IsGuessingPlayerProvider from "./context/IsGuessingPlayerProvider";
import SecretProvider from "./context/SecretProvider";
import SocketProvider from "./context/SocketProvider";
import MultiplayerGame from "./game/gamemode/MultiplayerGame";
import SingleplayerGame from "./game/gamemode/SingleplayerGame";
import WelcomePage from "./game/pages/WelcomePage";
import theme from "./resources/theme";
import store from "./store/store.js";

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
                    <Provider store={store}>
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
                    </Provider>
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

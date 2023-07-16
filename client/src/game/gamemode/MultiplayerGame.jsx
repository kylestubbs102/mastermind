import { Flex, Heading, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useSocket } from "../../context/SocketProvider";
import {
  gameReadyReceived,
  setSecret,
} from "../../store/slices/updateGameSlice";
import Board from "../components/Board";
import PlayerLeftAlert from "../components/PlayerLeftAlert";
import CreateSecretScreen from "../pages/CreateSecretScreen";
import WaitingScreen from "../pages/WaitingScreen";

function MultiplayerGame() {
  const state = useSelector((state) => {
    return {
      gameStarted: state.updateGame.gameStarted,
      secret: state.updateGame.secret,
    };
  }, shallowEqual);

  const dispatch = useDispatch();

  const socket = useSocket();

  const [roomIsFull, setRoomIsFull] = useState(false);
  const [playerLeft, setPlayerLeft] = useState(false);

  const { gameId } = useParams();

  const urlIsValid = gameId !== undefined && gameId.length === 10;

  /*
    First player gets to welcome screen, emits message that he's ready  
    Player 2 receives link and emits message that he's ready
    Player 1 receives messages, goes to game, and sends message to Player 2 to go to game as well
  */
  useEffect(() => {
    if (!urlIsValid || playerLeft) {
      return;
    }

    socket.emit("game ready", gameId);

    socket.once("game ready received", (isGuessing) => {
      dispatch(
        gameReadyReceived({
          isGuessingPlayer: isGuessing,
          gameStarted: true,
        })
      );
    });

    socket.on("room is full", () => {
      setRoomIsFull(true);
    });

    // handled by guessing player
    socket.on("secret received", (secret) => {
      dispatch(setSecret(secret));
    });

    socket.on("other player left", () => {
      setPlayerLeft(true);
    });
  }, [gameId, socket, urlIsValid, playerLeft, dispatch]);

  return (
    <>
      {playerLeft && state.gameStarted && <PlayerLeftAlert />}
      {!urlIsValid ? (
        <Flex align="center" justify="center" minH="100vh">
          <Heading as="h1" size="2xl">
            URL is invalid
          </Heading>
        </Flex>
      ) : roomIsFull ? (
        <Flex align="center" justify="center" minH="100vh">
          <Heading as="h1" size="2xl">
            Room is full
          </Heading>
        </Flex>
      ) : state.gameStarted && state.secret.length > 0 ? (
        <VStack
          justify="center"
          align="center"
          minH="100vh"
          spacing={4}
          margin={4}
        >
          <Board singleplayer={false} />
        </VStack>
      ) : state.gameStarted && state.secret.length === 0 ? (
        <CreateSecretScreen />
      ) : (
        <>
          <WaitingScreen />
        </>
      )}
    </>
  );
}

export default MultiplayerGame;

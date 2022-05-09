import { Flex, Heading, VStack } from "@chakra-ui/react";
import { useIsGuessingPlayer } from "../context/IsGuessingPlayerProvider";
import { useSecret } from "../context/SecretProvider";
import Board from "./Board";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import WaitingScreen from "./WaitingScreen";
import { useSocket } from "../context/SocketProvider";
import CreateSecretScreen from "./CreateSecretScreen";
import PlayerLeftAlert from "./PlayerLeftAlert";
import { useGameStarted } from "../context/GameStartedProvider";

function MultiplayerGame() {
  const { setIsGuessingPlayer } = useIsGuessingPlayer();
  const { secret, setSecret } = useSecret();
  const { gameStarted, setGameStarted } = useGameStarted();
  const socket = useSocket();

  const [roomIsFull, setRoomIsFull] = useState(false);
  const [playerLeft, setPlayerLeft] = useState(false);

  const { gameId } = useParams();

  const urlIsValid = gameId !== undefined && gameId.length === 10;

  // TODO: refactor into useGame() and dispatch event

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
      setIsGuessingPlayer(isGuessing);
      setGameStarted(true);
    });

    socket.on("room is full", () => {
      setRoomIsFull(true);
    });

    // handled by guessing player
    socket.on("secret received", (secret) => {
      setSecret(secret);
    });

    socket.on("other player left", () => {
      setPlayerLeft(true);
    });
  }, [gameId, socket, urlIsValid, setIsGuessingPlayer, setSecret, playerLeft, setGameStarted]);

  return (
    <>
      {playerLeft && gameStarted && <PlayerLeftAlert />}
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
      ) : gameStarted && secret.length > 0 ? (
        <VStack
          justify="center"
          align="center"
          minH="100vh"
          spacing={4}
          margin={4}
        >
          <Board singleplayer={false} />
        </VStack>
      ) : gameStarted && secret.length === 0 ? (
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

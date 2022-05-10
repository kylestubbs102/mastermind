import { RepeatIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useColor } from "../../context/ColorProvider";
import { useGameFinished } from "../../context/GameFinishedProvider";
import { useGameStarted } from "../../context/GameStartedProvider";
import { useGuesses } from "../../context/GuessProvider";
import { useIsGuessingPlayer } from "../../context/IsGuessingPlayerProvider";
import { useSecret } from "../../context/SecretProvider";
import { useSocket } from "../../context/SocketProvider";
import { getRandomSecret } from "../../resources/game-logic";

function Header({ singleplayer }) {
  const { guesses, setGuesses } = useGuesses();
  const { setSecret } = useSecret();
  const { gameFinished, setGameFinished } = useGameFinished();
  const { isGuessingPlayer, setIsGuessingPlayer } = useIsGuessingPlayer();
  const { setColor } = useColor();
  const { setGameStarted } = useGameStarted();
  const socket = useSocket();

  const [opponentSentReset, setOpponentSetReset] = useState(false);
  const [playerSentReset, setPlayerSentReset] = useState(false);

  const { isOpen, onOpen } = useDisclosure();

  const title =
    !gameFinished && guesses.length < 10
      ? "Turn " + (guesses.length + 1)
      : guesses.length < 10 && isGuessingPlayer
      ? "You won!"
      : "You lost :(";

  const handleGameReset = useCallback(() => {
    let newSecret = [];

    if (singleplayer) {
      newSecret = getRandomSecret();
    }

    setSecret(newSecret);
    setGameFinished(false);
    setGuesses([]);
    setColor("white");
    setIsGuessingPlayer(singleplayer ? isGuessingPlayer : !isGuessingPlayer);
    setGameStarted(true);
  }, [
    isGuessingPlayer,
    setColor,
    setGameFinished,
    setGameStarted,
    setGuesses,
    setIsGuessingPlayer,
    setSecret,
    singleplayer,
  ]);

  useEffect(() => {
    if (opponentSentReset && playerSentReset) {
      handleGameReset();
    }

    const opponentResetListener = () => setOpponentSetReset(true);

    socket.on("game reset received", opponentResetListener);

    return () => {
      socket.off("game reset received", opponentResetListener);
    };
  }, [handleGameReset, opponentSentReset, playerSentReset, socket]);

  return (
    <Flex direction="row" width="100%" padding={2}>
      <Box>
        <Heading as="h1" size="xl">
          {title}
        </Heading>
      </Box>
      <Spacer />
      {singleplayer ? (
        <IconButton
          aria-label="Reset game"
          icon={<RepeatIcon />}
          size="lg"
          variant="ghost"
          onClick={() => handleGameReset()}
          transitionDuration="300ms"
          _hover={{
            boxShadow: "0 0 4px gray;",
          }}
        />
      ) : gameFinished ? (
        <Button
          aria-label="Switch sides"
          disabled={playerSentReset}
          size="md"
          variant="solid"
          onClick={() => {
            onOpen();
            setPlayerSentReset(true);
            socket.emit("send game reset");
          }}
          transitionDuration="300ms"
        >
          Switch sides
        </Button>
      ) : null}
      {!singleplayer && playerSentReset && (
        <AlertDialog motionPreset="slideInBottom" isOpen={isOpen} isCentered>
          <AlertDialogOverlay />
          <AlertDialogContent>
            <AlertDialogHeader>
              Waiting for the other player to ready up...
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </Flex>
  );
}

export default Header;

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
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useSocket } from "../../context/SocketProvider";
import { getRandomSecret } from "../../resources/game-logic";
import { resetMultiplayerGame } from "../../store/slices/updateGameSlice";

function Header({ singleplayer }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      gameFinished: state.updateGame.gameFinished,
      guesses: state.updateGame.guesses,
      isGuessingPlayer: state.updateGame.isGuessingPlayer,
    };
  }, shallowEqual);

  const socket = useSocket();

  const [opponentSentReset, setOpponentSetReset] = useState(false);
  const [playerSentReset, setPlayerSentReset] = useState(false);

  const { isOpen, onOpen } = useDisclosure();

  const title =
    !state.gameFinished && state.guesses.length < 10
      ? "Turn " + (state.guesses.length + 1)
      : state.guesses.length < 10 && state.isGuessingPlayer
      ? "You won!"
      : "You lost :(";

  const handleGameReset = useCallback(() => {
    let newSecret = [];

    if (singleplayer) {
      newSecret = getRandomSecret();
    }

    dispatch(
      resetMultiplayerGame({
        secret: newSecret,
        isGuessingPlayer: singleplayer
          ? state.isGuessingPlayer
          : !state.isGuessingPlayer,
      })
    );
  }, [dispatch, singleplayer, state.isGuessingPlayer]);

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
      ) : state.gameFinished ? (
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

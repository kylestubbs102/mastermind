import { Button, Circle, HStack } from "@chakra-ui/react";
import _ from "lodash";
import { memo, useCallback, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useColor } from "../../context/ColorProvider";
import { useGameFinished } from "../../context/GameFinishedProvider";
import { useGuesses } from "../../context/GuessProvider";
import { useIsGuessingPlayer } from "../../context/IsGuessingPlayerProvider";
import { useSecret } from "../../context/SecretProvider";
import { useSocket } from "../../context/SocketProvider";
import {
  INACTIVE_PIECE_BORDER,
  PIECE_SIZE,
  PLACEHOLDER_PIECE_COLOR,
  ROW_PADDING,
  ROW_WIDTH,
} from "../../resources/constants";

function PlayerRow({ singleplayer }) {
  const { guesses, setGuesses } = useGuesses();
  const { color } = useColor();
  const { secret } = useSecret();
  const { gameFinished } = useGameFinished();
  const { isGuessingPlayer } = useIsGuessingPlayer();
  const { setGameFinished } = useGameFinished();
  const socket = useSocket();

  const [currentGuess, setCurrentGuess] = useState(
    Array(4).fill(PLACEHOLDER_PIECE_COLOR)
  );

  const updateCurrentGuess = useCallback(
    (circleGuess, index) => {
      if (gameFinished) return;

      // sent to player watching guessing player
      if (isGuessingPlayer) {
        socket.emit("send circle guess", circleGuess, index);
      }

      let guess = [...currentGuess];
      guess[index] = circleGuess;
      setCurrentGuess(guess);
    },
    [currentGuess, gameFinished, isGuessingPlayer, socket]
  );

  const pushGuess = useCallback(
    (newGuess) => {
      // sent to player watching guessing player
      if (isGuessingPlayer) {
        socket.emit("send row guess", newGuess);
      }

      let newGuesses = [...guesses, newGuess];
      setGuesses(newGuesses);
      setCurrentGuess(Array(4).fill(PLACEHOLDER_PIECE_COLOR));
    },
    [guesses, isGuessingPlayer, setGuesses, socket]
  );

  useEffect(() => {
    if (singleplayer) return;

    const rowListener = (rowGuess) => {
      pushGuess(rowGuess);
    };

    const circleListener = (circleGuess, index) => {
      updateCurrentGuess(circleGuess, index);
    };

    socket.on("row guess received", rowListener);

    socket.on("circle guess received", circleListener);

    return () => {
      socket.off("row guess received", rowListener);
      socket.off("circle guess received", circleListener);
    };
  }, [pushGuess, singleplayer, socket, updateCurrentGuess]);

  // checks if secret is equal to last guess
  useEffect(() => {
    if (guesses.length === 0) {
      setCurrentGuess(Array(4).fill(PLACEHOLDER_PIECE_COLOR));
      return;
    }

    let lastGuess = guesses[guesses.length - 1];
    if (_.isEqual(lastGuess, secret)) {
      setGameFinished(true);
    }
  }, [guesses, secret, setGameFinished]);

  return (
    <HStack
      bg={"lightgrey"}
      rounded={12}
      justify="space-between"
      w={ROW_WIDTH}
      padding={ROW_PADDING}
    >
      <HStack justify="center">
        {currentGuess.map((currentGuessColor, index) => {
          return (
            <Circle
              size={PIECE_SIZE}
              bg={currentGuessColor}
              cursor={color === "white" || gameFinished ? "auto" : "pointer"}
              border={INACTIVE_PIECE_BORDER}
              key={uuid()}
              onClick={() => updateCurrentGuess(color, index)}
            />
          );
        })}
      </HStack>
      {isGuessingPlayer && (
        <Button
          disabled={gameFinished ? true : currentGuess.includes("white")}
          onClick={() => pushGuess(currentGuess)}
        >
          Guess
        </Button>
      )}
    </HStack>
  );
}

export default memo(PlayerRow);

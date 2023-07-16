import { Button, Circle, HStack } from "@chakra-ui/react";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { useSocket } from "../../context/SocketProvider";
import {
  INACTIVE_PIECE_BORDER,
  PIECE_SIZE,
  PLACEHOLDER_PIECE_COLOR,
  ROW_PADDING,
  ROW_WIDTH,
} from "../../resources/constants";
import {
  setGameFinished,
  updateGuesses,
} from "../../store/slices/updateGameSlice";

function PlayerRow({ singleplayer }) {
  const state = useSelector((state) => {
    return {
      guesses: state.updateGame.guesses,
      color: state.updateGame.color,
      secret: state.updateGame.secret,
      gameFinished: state.updateGame.gameFinished,
      isGuessingPlayer: state.updateGame.isGuessingPlayer,
    };
  }, shallowEqual);
  const dispatch = useDispatch();

  const socket = useSocket();

  const [currentGuess, setCurrentGuess] = useState(
    Array(4).fill(PLACEHOLDER_PIECE_COLOR)
  );

  const updateCurrentGuess = useCallback(
    (circleGuess, index) => {
      if (state.gameFinished) return;

      // sent to player watching guessing player
      if (state.isGuessingPlayer) {
        socket.emit("send circle guess", circleGuess, index);
      }

      let guess = [...currentGuess];
      guess[index] = circleGuess;
      setCurrentGuess(guess);
    },
    [currentGuess, socket, state.gameFinished, state.isGuessingPlayer]
  );

  const pushGuess = useCallback(
    (newGuess) => {
      // sent to player watching guessing player
      if (state.isGuessingPlayer) {
        socket.emit("send row guess", newGuess);
      }

      let newGuesses = [...state.guesses, newGuess];
      setCurrentGuess(Array(4).fill(PLACEHOLDER_PIECE_COLOR));
      dispatch(updateGuesses(newGuesses));
    },
    [dispatch, socket, state.guesses, state.isGuessingPlayer]
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
    if (state.guesses.length === 0) {
      setCurrentGuess(Array(4).fill(PLACEHOLDER_PIECE_COLOR));
      return;
    }

    let lastGuess = state.guesses[state.guesses.length - 1];
    if (_.isEqual(lastGuess, state.secret)) {
      dispatch(setGameFinished(true));
    }
  }, [dispatch, state.guesses, state.guesses.length, state.secret]);

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
              cursor={
                state.color === "white" || state.gameFinished
                  ? "auto"
                  : "pointer"
              }
              pointerEvents={state.isGuessingPlayer ? "auto" : "none"}
              border={INACTIVE_PIECE_BORDER}
              key={uuid()}
              onClick={() => updateCurrentGuess(state.color, index)}
            />
          );
        })}
      </HStack>
      {state.isGuessingPlayer && (
        <Button
          disabled={state.gameFinished ? true : currentGuess.includes("white")}
          onClick={() => pushGuess(currentGuess)}
        >
          Guess
        </Button>
      )}
    </HStack>
  );
}

export default PlayerRow;

import { Button, Circle, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { useGuesses } from "../context/GuessProvider";
import { v4 as uuid } from "uuid";
import {
  INACTIVE_PIECE_BORDER,
  PIECE_SIZE,
  ROW_PADDING,
  ROW_WIDTH,
} from "../resources/constants";
import { useColor } from "../context/ColorProvider";
import { useGameFinished } from "../context/GameFinishedProvider";

function PlayerRow() {
  const PLACEHOLDER_PIECE_COLOR = "white";
  const { guesses, setGuesses } = useGuesses();
  const { color } = useColor();
  const { gameFinished } = useGameFinished();

  const [currentGuess, setCurrentGuess] = useState(
    Array(4).fill(PLACEHOLDER_PIECE_COLOR)
  );

  function updateCurrentGuess(index) {
    if (gameFinished) return;

    let guess = [...currentGuess];
    guess[index] = color;
    setCurrentGuess(guess);
  }

  function pushGuess() {
    let newGuesses = [...guesses];
    newGuesses.push(currentGuess);
    setGuesses(newGuesses);
    setCurrentGuess(Array(4).fill(PLACEHOLDER_PIECE_COLOR));
  }

  return (
    <HStack
      bg={"lightgrey"}
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
              onClick={() => updateCurrentGuess(index)}
            />
          );
        })}
      </HStack>
      <Button
        disabled={gameFinished ? true : currentGuess.includes("white")}
        onClick={() => pushGuess()}
      >
        Guess
      </Button>
    </HStack>
  );
}

export default PlayerRow;

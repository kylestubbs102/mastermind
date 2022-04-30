import { Circle, HStack } from "@chakra-ui/react";
import { useGuesses } from "../context/GuessProvider";
import { v4 as uuid } from "uuid";
import {
  INACTIVE_PIECE_BORDER,
  PIECE_SIZE,
  ROW_PADDING,
  ROW_WIDTH,
} from "../resources/constants";
import Hints from "./Hints";

function Guesses() {
  const { guesses } = useGuesses();

  return (
    <>
      {guesses.map((guess) => (
        <HStack
          padding={ROW_PADDING}
          justify="space-between"
          w={ROW_WIDTH}
          key={uuid()}
        >
          <HStack justify="center">
            {guess.map((color) => (
              <Circle
                size={PIECE_SIZE}
                border={INACTIVE_PIECE_BORDER}
                bg={color}
                key={uuid()}
              />
            ))}
          </HStack>
          <Hints guess={guess} />
        </HStack>
      ))}
    </>
  );
}

export default Guesses;

import { Circle, HStack } from "@chakra-ui/react";
import _ from "lodash";
import { memo } from "react";
import { v4 as uuid } from "uuid";
import { useGuesses } from "../../context/GuessProvider";
import {
  INACTIVE_PIECE_BORDER,
  PIECE_SIZE,
  ROW_PADDING,
  ROW_WIDTH,
} from "../../resources/constants";
import Hints from "./Hints";

function PlaceholderRows() {
  const { guesses } = useGuesses();

  const rows = 10 - guesses.length - 1;

  return (
    <>
      {_.times(rows, () => (
        <HStack
          padding={ROW_PADDING}
          justify="space-between"
          w={ROW_WIDTH}
          key={uuid()}
        >
          <HStack justify="center">
            {_.times(4, () => (
              <Circle
                size={PIECE_SIZE}
                border={INACTIVE_PIECE_BORDER}
                key={uuid()}
              />
            ))}
          </HStack>
          <Hints />
        </HStack>
      ))}
    </>
  );
}

export default memo(PlaceholderRows);

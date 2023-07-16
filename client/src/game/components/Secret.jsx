import { Circle, HStack } from "@chakra-ui/react";
import { shallowEqual, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  INACTIVE_PIECE_BORDER,
  PIECE_SIZE,
  ROW_PADDING,
  ROW_WIDTH,
} from "../../resources/constants";

function Secret() {
  const secret = useSelector((state) => state.updateGame.secret, shallowEqual);

  return (
    <HStack
      padding={ROW_PADDING}
      justify="space-between"
      w={ROW_WIDTH}
      key={uuid()}
    >
      <HStack justify="center">
        {secret.map((color) => (
          <Circle
            size={PIECE_SIZE}
            border={INACTIVE_PIECE_BORDER}
            bg={color}
            key={uuid()}
          />
        ))}
      </HStack>
    </HStack>
  );
}

export default Secret;

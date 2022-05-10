import { Circle, HStack } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { useSecret } from "../../context/SecretProvider";
import {
  INACTIVE_PIECE_BORDER,
  PIECE_SIZE,
  ROW_PADDING,
  ROW_WIDTH,
} from "../../resources/constants";

function Secret() {
  const { secret } = useSecret();

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

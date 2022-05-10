import { Circle, Flex } from "@chakra-ui/react";
import { v4 as uuid } from "uuid";
import { useColor } from "../../context/ColorProvider";
import { useIsGuessingPlayer } from "../../context/IsGuessingPlayerProvider";
import { useSecret } from "../../context/SecretProvider";
import {
  ACTIVE_PIECE_BORDER,
  COLORS,
  INACTIVE_PIECE_BORDER,
  PIECE_SIZE,
} from "../../resources/constants";

function ColorPicker({ orientation }) {
  const { color, setColor } = useColor();
  const { secret } = useSecret();
  const { isGuessingPlayer } = useIsGuessingPlayer();

  return (
    <Flex
      flexDirection={orientation}
      align="center"
      rowGap={2}
      columnGap={2}
      padding={5}
    >
      {COLORS.map((circleColor) => (
        <Circle
          size={PIECE_SIZE}
          bg={circleColor}
          border={
            circleColor === color && (isGuessingPlayer || secret.length === 0)
              ? ACTIVE_PIECE_BORDER
              : INACTIVE_PIECE_BORDER
          }
          key={uuid()}
          onClick={() =>
            isGuessingPlayer || secret.length === 0
              ? setColor(circleColor)
              : null
          }
          style={{ cursor: "pointer" }}
        />
      ))}
    </Flex>
  );
}

export default ColorPicker;

import { Circle, VStack } from "@chakra-ui/react";
import { useColor } from "../context/ColorProvider";
import {
  ACTIVE_PIECE_BORDER,
  COLORS,
  INACTIVE_PIECE_BORDER,
  PIECE_SIZE,
} from "../resources/constants";
import { v4 as uuid } from "uuid";

function ColorPicker() {
  const { color, setColor } = useColor();

  return (
    <VStack align="center" padding={5}>
      {COLORS.map((circleColor) => (
        <Circle
          size={PIECE_SIZE}
          bg={circleColor}
          border={
            circleColor === color ? ACTIVE_PIECE_BORDER : INACTIVE_PIECE_BORDER
          }
          key={uuid()}
          onClick={() => setColor(circleColor)}
          style={{ cursor: "pointer" }}
        />
      ))}
    </VStack>
  );
}

export default ColorPicker;

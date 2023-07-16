import { Circle, Flex } from "@chakra-ui/react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  ACTIVE_PIECE_BORDER,
  COLORS,
  INACTIVE_PIECE_BORDER,
  PIECE_SIZE,
} from "../../resources/constants";
import { setColor } from "../../store/slices/updateGameSlice";

function ColorPicker({ orientation }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      color: state.updateGame.color,
      secret: state.updateGame.secret,
      isGuessingPlayer: state.updateGame.isGuessingPlayer,
    };
  }, shallowEqual);

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
            circleColor === state.color &&
            (state.isGuessingPlayer || state.secret.length === 0)
              ? ACTIVE_PIECE_BORDER
              : INACTIVE_PIECE_BORDER
          }
          key={uuid()}
          onClick={() =>
            state.isGuessingPlayer || state.secret.length === 0
              ? dispatch(setColor(circleColor))
              : null
          }
          style={{ cursor: "pointer" }}
        />
      ))}
    </Flex>
  );
}

export default ColorPicker;

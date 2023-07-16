import { Circle, HStack } from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import {
  HINT_BORDER,
  HINT_SIZE,
  PLACEHOLDER_HINT_COLOR,
} from "../../resources/constants";
import { calculateHints } from "../../resources/game-logic";

function Hints({ guess }) {
  const secret = useSelector((state) => state.updateGame.secret);

  const [hintColors, setHintColors] = useState(
    Array(4).fill(PLACEHOLDER_HINT_COLOR)
  );

  useEffect(() => {
    let newHintColors = calculateHints(secret, guess);
    setHintColors(newHintColors);
  }, [guess, secret]);

  return (
    <HStack>
      {hintColors.map((hc) => (
        <Circle
          size={HINT_SIZE}
          border={hc !== PLACEHOLDER_HINT_COLOR ? HINT_BORDER : "none"}
          bg={hc}
          key={uuid()}
        />
      ))}
    </HStack>
  );
}

export default memo(Hints);

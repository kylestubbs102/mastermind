import { Circle, HStack } from "@chakra-ui/react";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useSecret } from "../context/SecretProvider";
import { HINT_BORDER, HINT_SIZE } from "../resources/constants";
import { v4 as uuid } from "uuid";
import { useGameFinished } from "../context/GameFinishedProvider";

function Hints({ guess }) {
  const PLACEHOLDER_HINT_COLOR = "lightgrey";
  const { secret } = useSecret();
  const {setGameFinished} = useGameFinished();

  const [hintColors, setHintColors] = useState(
    Array(4).fill(PLACEHOLDER_HINT_COLOR)
  );

  useEffect(() => {
    let newHintColors = [];

    let occurrencesMap = secret.reduce((acc, secretColor) => {
      if (secretColor in acc) {
        acc[secretColor] += 1;
      } else {
        acc[secretColor] = 1;
      }
      return acc;
    }, {});

    let indexMap = {};

    _.zip(guess, secret).forEach(([guessColor, secretColor], index) => {
      if (guessColor === secretColor) {
        occurrencesMap[guessColor] -= 1;
        newHintColors.push("red");
        indexMap[index] = 1;
      }
    });

    _.forEach(guess, (guessColor, index) => {
      if (index in indexMap) return;

      if (occurrencesMap[guessColor]) {
        occurrencesMap[guessColor] -= 1;
        newHintColors.push("white");
      }
    });

    while (newHintColors.length < 4) {
      newHintColors.push(PLACEHOLDER_HINT_COLOR);
    }

    if (newHintColors.every(hc => hc === "red")) {
        setGameFinished(true);
    }

    setHintColors(newHintColors);
  }, [guess, secret, setGameFinished]);

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

export default Hints;

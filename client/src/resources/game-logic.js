import _ from "lodash";
import { COLORS, PLACEHOLDER_HINT_COLOR } from "./constants";

export const calculateHints = (secret, guess) => {
  let newHintColors = [];

  let occurrencesMap = secret.reduce((acc, secretColor) => {
    if (secretColor in acc) {
      acc[secretColor] += 1;
    } else {
      acc[secretColor] = 1;
    }
    return acc;
  }, {});

  let indexSet = new Set();

  _.zip(guess, secret).forEach(([guessColor, secretColor], index) => {
    if (guessColor === secretColor) {
      occurrencesMap[guessColor] -= 1;
      newHintColors.push("red");
      indexSet.add(index);
    }
  });

  _.forEach(guess, (guessColor, index) => {
    if (indexSet.has(index)) return;

    if (occurrencesMap[guessColor]) {
      occurrencesMap[guessColor] -= 1;
      newHintColors.push("white");
    }
  });

  while (newHintColors.length < 4) {
    newHintColors.push(PLACEHOLDER_HINT_COLOR);
  }

  return newHintColors;
};

export const getRandomSecret = () => {
  let newSecret = [];

  // create random secret if singleplayer
  for (let i = 0; i < 4; i++) {
    let randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    newSecret.push(randomColor);
  }

  return newSecret;
};

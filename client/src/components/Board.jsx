import { Divider, HStack, VStack } from "@chakra-ui/react";
import ColorPicker from "./ColorPicker";
import Guesses from "./Guesses";
import PlaceholderRows from "./PlaceholderRows";
import PlayerRow from "./PlayerRow";
import Header from "./Header";
import { useIsGuessingPlayer } from "../context/IsGuessingPlayerProvider";
import Secret from "./Secret";
import { useGuesses } from "../context/GuessProvider";

function Board({ singleplayer }) {
  const { isGuessingPlayer } = useIsGuessingPlayer();
  const { guesses } = useGuesses();

  return (
    <VStack>
      <Header singleplayer={singleplayer} />
      <HStack border="4px solid black" rounded={20} padding={4}>
        {isGuessingPlayer && <ColorPicker orientation="column" />}
        <VStack>
          <Guesses />
          {guesses.length < 10 && <PlayerRow singleplayer={singleplayer} />}
          <PlaceholderRows />
          {!isGuessingPlayer && <Divider opacity={1} borderBottomWidth={2} />}
          {!isGuessingPlayer && <Secret />}
        </VStack>
      </HStack>
    </VStack>
  );
}

export default Board;

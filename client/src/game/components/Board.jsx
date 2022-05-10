import { Divider, HStack, VStack } from "@chakra-ui/react";
import { useGuesses } from "../../context/GuessProvider";
import { useIsGuessingPlayer } from "../../context/IsGuessingPlayerProvider";
import ColorPicker from "./ColorPicker";
import Guesses from "./Guesses";
import Header from "./Header";
import PlaceholderRows from "./PlaceholderRows";
import PlayerRow from "./PlayerRow";
import Secret from "./Secret";

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

import { HStack, VStack } from "@chakra-ui/react";
import ColorPicker from "./ColorPicker";
import Guesses from "./Guesses";
import PlaceholderRows from "./PlaceholderRows";
import PlayerRow from "./PlayerRow";

function Board() {
  return (
    <HStack border="4px solid black" padding={4}>
      <ColorPicker />
      <VStack>
        <Guesses />
        <PlayerRow />
        <PlaceholderRows />
      </VStack>
    </HStack>
  );
}

export default Board;

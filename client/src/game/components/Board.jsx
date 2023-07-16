import { Divider, HStack, VStack } from "@chakra-ui/react";
import { shallowEqual, useSelector } from "react-redux";
import ColorPicker from "./ColorPicker";
import Guesses from "./Guesses";
import Header from "./Header";
import PlaceholderRows from "./PlaceholderRows";
import PlayerRow from "./PlayerRow";
import Secret from "./Secret";

function Board({ singleplayer }) {
  const state = useSelector((state) => {
    return {
      isGuessingPlayer: state.updateGame.isGuessingPlayer,
      guesses: state.updateGame.guesses,
    };
  }, shallowEqual);

  return (
    <VStack>
      <Header singleplayer={singleplayer} />
      <HStack border="4px solid black" rounded={20} padding={4}>
        {state.isGuessingPlayer && <ColorPicker orientation="column" />}
        <VStack>
          <Guesses />
          {state.guesses.length < 10 && (
            <PlayerRow singleplayer={singleplayer} />
          )}
          <PlaceholderRows />
          {!state.isGuessingPlayer && (
            <Divider opacity={1} borderBottomWidth={2} />
          )}
          {!state.isGuessingPlayer && <Secret />}
        </VStack>
      </HStack>
    </VStack>
  );
}

export default Board;

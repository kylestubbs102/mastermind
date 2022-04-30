import { VStack } from "@chakra-ui/react";
import Board from "./Board";
import Header from "./Header";

function Game() {
  return (
    <VStack justify="center" spacing={4} margin={4}>
      <Header />
      <Board />
    </VStack>
  );
}

export default Game;

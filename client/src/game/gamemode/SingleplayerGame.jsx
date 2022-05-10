import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useIsGuessingPlayer } from "../../context/IsGuessingPlayerProvider";
import { useSecret } from "../../context/SecretProvider";
import { getRandomSecret } from "../../resources/game-logic";
import Board from "../components/Board";

function SingleplayerGame() {
  const { setIsGuessingPlayer } = useIsGuessingPlayer();
  const { setSecret } = useSecret();

  useEffect(() => {
    setIsGuessingPlayer(true);
    let newSecret = getRandomSecret();
    setSecret(newSecret);
  }, [setIsGuessingPlayer, setSecret]);

  return (
    <VStack justify="center" align="center" minH="100vh" spacing={4} margin={4}>
      <Board singleplayer={true} />
    </VStack>
  );
}

export default SingleplayerGame;

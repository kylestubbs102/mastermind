import { VStack } from "@chakra-ui/react";
import { useIsGuessingPlayer } from "../context/IsGuessingPlayerProvider";
import { useSecret } from "../context/SecretProvider";
import { COLORS } from "../resources/constants";
import Board from "./Board";
import { useEffect } from "react";

function SingleplayerGame() {
  const { setIsGuessingPlayer } = useIsGuessingPlayer();
  const { setSecret } = useSecret();

  useEffect(() => {
    setIsGuessingPlayer(true);
    let newSecret = [];
    for (let i = 0; i < 4; i++) {
      let randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      newSecret.push(randomColor);
    } // choose random secret
    setSecret(newSecret);
  }, [setIsGuessingPlayer, setSecret]);

  return (
    <VStack justify="center" align="center" minH="100vh" spacing={4} margin={4}>
      <Board singleplayer={true} />
    </VStack>
  );
}

export default SingleplayerGame;

import { VStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getRandomSecret } from "../../resources/game-logic";
import { setSecretSingleplayer } from "../../store/slices/updateGameSlice";
import Board from "../components/Board";

function SingleplayerGame() {
  const dispatch = useDispatch();

  useEffect(() => {
    let newSecret = getRandomSecret();
    dispatch(
      setSecretSingleplayer({
        isGuessingPlayer: true,
        secret: newSecret,
      })
    );
  }, [dispatch]);

  return (
    <VStack justify="center" align="center" minH="100vh" spacing={4} margin={4}>
      <Board singleplayer={true} />
    </VStack>
  );
}

export default SingleplayerGame;

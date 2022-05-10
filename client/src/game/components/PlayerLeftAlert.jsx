import { Alert, AlertIcon, AlertTitle, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColor } from "../../context/ColorProvider";
import { useGuesses } from "../../context/GuessProvider";
import { useIsGuessingPlayer } from "../../context/IsGuessingPlayerProvider";
import { useSecret } from "../../context/SecretProvider";

function PlayerLeftAlert() {
  const { setGuesses } = useGuesses();
  const { setIsGuessingPlayer } = useIsGuessingPlayer();
  const { setSecret } = useSecret();
  const { setColor } = useColor();

  function resetGame() {
    setGuesses([]);
    setIsGuessingPlayer();
    setSecret([]);
    setColor("white");
  }

  return (
    <>
      <Alert status="error" variant="subtle">
        <AlertIcon />
        <AlertTitle pr={4}>The other player has left the game.</AlertTitle>
        <Link to="/" reloadDocument={true}>
          <Button variant="solid" onClick={() => resetGame()}>
            Exit
          </Button>
        </Link>
      </Alert>
    </>
  );
}

export default PlayerLeftAlert;

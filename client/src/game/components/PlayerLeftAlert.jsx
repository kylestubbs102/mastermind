import { Alert, AlertIcon, AlertTitle, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { exitToHomeScreen } from "../../store/slices/updateGameSlice";

function PlayerLeftAlert() {
  const dispatch = useDispatch();

  function resetGame() {
    dispatch(exitToHomeScreen());
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

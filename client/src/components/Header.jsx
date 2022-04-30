import { useGuesses } from "../context/GuessProvider";
import { useGameFinished } from "../context/GameFinishedProvider";
import { Heading } from "@chakra-ui/react";

function Header() {
  const { guesses } = useGuesses();
  const { gameFinished } = useGameFinished();

  const title = !gameFinished
    ? "Turn " + (guesses.length + 1)
    : guesses.length < 10
    ? "You won!"
    : "You lost :(";

  return (
    <>
      <Heading as="h1" size="2xl">
        {title}
      </Heading>
    </>
  );
}

export default Header;

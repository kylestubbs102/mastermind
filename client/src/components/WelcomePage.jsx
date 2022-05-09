import { Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function WelcomePage() {
  return (
    <Flex
      height="100%"
      width="100%"
      minH="100vh"
      justify="center"
      align="center"
      direction="column"
      rowGap={20}
    >
      <Heading
        as="h1"
        size="4xl"
        bgGradient="linear(to-l, #7928CA, #FF0080)"
        bgClip="text"
      >
        Welcome to Mastermind!
      </Heading>

      <Flex direction="row" justify="space-between" columnGap={20}>
        <Link to="singleplayer" reloadDocument={true}>
          <Button variant="welcome">Single-Player</Button>
        </Link>
        <Link to="multiplayer" reloadDocument={true}>
          <Button variant="welcome">Multiplayer</Button>
        </Link>
      </Flex>
    </Flex>
  );
}

export default WelcomePage;

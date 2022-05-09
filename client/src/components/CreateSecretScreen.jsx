import { useIsGuessingPlayer } from "../context/IsGuessingPlayerProvider";
import { Button, Circle, Flex, Heading, HStack } from "@chakra-ui/react";
import ColorPicker from "./ColorPicker";
import { v4 as uuid } from "uuid";
import {
  ROW_WIDTH,
  INACTIVE_PIECE_BORDER,
  PLACEHOLDER_PIECE_COLOR,
  PIECE_SIZE,
} from "../resources/constants";
import { useColor } from "../context/ColorProvider";
import { useState } from "react";
import { useSecret } from "../context/SecretProvider";
import { useSocket } from "../context/SocketProvider";

function CreateSecretScreen() {
  const { setSecret } = useSecret();
  const { isGuessingPlayer } = useIsGuessingPlayer();
  const { color } = useColor();
  const socket = useSocket();

  const [currentSecret, setCurrentSecret] = useState(
    Array(4).fill(PLACEHOLDER_PIECE_COLOR)
  );

  function updateCurrentSecret(index) {
    let secret = [...currentSecret];
    secret[index] = color;
    setCurrentSecret(secret);
  }

  function createAndEmitSecret() {
    setSecret(currentSecret);
    socket.emit("set secret", currentSecret);
  }

  return (
    <>
      {isGuessingPlayer ? (
        <Flex align="center" justify="center" minH="100vh">
          <Heading as="h1" size="2xl">
            Waiting for other player to create their secret
          </Heading>
        </Flex>
      ) : (
        <Flex align="center" justify="center" minH="100vh">
          <Flex border="4px solid black" flexDirection="column">
            <HStack>
              <ColorPicker orientation="row" />
            </HStack>
            <HStack
              rounded={12}
              justify="space-between"
              w={ROW_WIDTH}
              padding={5}
            >
              <HStack justify="start">
                {currentSecret.map((currentGuessColor, index) => {
                  return (
                    <Circle
                      size={PIECE_SIZE}
                      bg={currentGuessColor}
                      cursor={color === "white" ? "auto" : "pointer"}
                      border={INACTIVE_PIECE_BORDER}
                      key={uuid()}
                      onClick={() => updateCurrentSecret(index)}
                    />
                  );
                })}
              </HStack>
              <Button
                disabled={currentSecret.includes("white")}
                onClick={() => createAndEmitSecret()}
              >
                Submit
              </Button>
            </HStack>
          </Flex>
        </Flex>
      )}
    </>
  );
}

export default CreateSecretScreen;

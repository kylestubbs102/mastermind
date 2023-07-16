import { Button, Circle, Flex, Heading, HStack } from "@chakra-ui/react";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { useSocket } from "../../context/SocketProvider";
import {
  INACTIVE_PIECE_BORDER,
  PIECE_SIZE,
  PLACEHOLDER_PIECE_COLOR,
  ROW_WIDTH,
} from "../../resources/constants";
import { setSecret } from "../../store/slices/updateGameSlice";
import ColorPicker from "../components/ColorPicker";

function CreateSecretScreen() {
  const state = useSelector((state) => {
    return {
      isGuessingPlayer: state.updateGame.isGuessingPlayer,
      color: state.updateGame.color,
    };
  }, shallowEqual);
  const socket = useSocket();

  const dispatch = useDispatch();

  const [currentSecret, setCurrentSecret] = useState(
    Array(4).fill(PLACEHOLDER_PIECE_COLOR)
  );

  function updateCurrentSecret(index) {
    let secret = [...currentSecret];
    secret[index] = state.color;
    setCurrentSecret(secret);
  }

  function createAndEmitSecret() {
    dispatch(setSecret(currentSecret));
    socket.emit("set secret", currentSecret);
  }

  return (
    <>
      {state.isGuessingPlayer ? (
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
                      cursor={state.color === "white" ? "auto" : "pointer"}
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

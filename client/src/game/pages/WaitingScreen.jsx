import { Button, Flex, Heading, Input, useClipboard } from "@chakra-ui/react";

function WaitingScreen() {
  const url = window.location.href;
  const { hasCopied, onCopy } = useClipboard(url);

  return (
    <Flex
      align="center"
      justify="center"
      minH="100vh"
      flexDirection="column"
      rowGap="20"
    >
      <Heading as="h1" size="2xl">
        Send this link to play with a friend.
      </Heading>
      <Flex w="fit-content">
        <Input
          value={url}
          w={url.length + "ch"}
          isReadOnly
          placeholder="No valid link"
          onFocus={(e) => e.target.select()}
        />
        <Button onClick={onCopy} ml={2}>
          {hasCopied ? "Copied" : "Copy"}
        </Button>
      </Flex>
    </Flex>
  );
}

export default WaitingScreen;

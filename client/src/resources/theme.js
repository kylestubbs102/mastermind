import { extendTheme } from "@chakra-ui/react";

export default extendTheme({
  components: {
    Button: {
      variants: {
        welcome: {
          bg: "purple",
          bgGradient: "linear(to-l, #7928CA, #FF0080)",
          borderRadius: "lg",
          fontSize: "2xl",
          outlineColor: "black",
          padding: "6",
          size: "lg",
          textColor: "white",
          transitionDuration: "300ms",
          variant: "outline",
          _hover: {
            bgGradient: "linear(to-l, #43cea2, #185a9d)",
            textColor: "black",
          },
        },
      },
    },
  },
});

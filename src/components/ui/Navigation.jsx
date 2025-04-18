import { Box, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Navigation = () => {
  return (
    <Flex justify="center" py={10} mt={14}>
      <Box>
        <Link to="/">
          <Image
            src="/logo.png"
            alt="Scoala Modern Logo"
            height="80px"
            objectFit="contain"
          />
        </Link>
      </Box>
    </Flex>
  );
};

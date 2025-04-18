import { Outlet } from "react-router-dom";
import { Box, Flex, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Root = () => {
  return (
    <Box bg="white" minH="100vh">
      <Flex justify="center" mt={24} mb={24}>
        <Link to="/">
          <Image
            src="/logo.png"
            alt="Scoala Modern"
            height="80px"
            objectFit="contain"
            _hover={{ opacity: 0.8, transition: "opacity 0.3s" }}
          />
        </Link>
      </Flex>
      <Outlet />
    </Box>
  );
};

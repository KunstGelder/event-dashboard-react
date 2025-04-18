import React from "react";
import { Button } from "@chakra-ui/react";

export const DeleteButton = ({ onClick }) => {
  return (
    <Button
      size="sm"
      bg="gray.700"
      color="white"
      _hover={{ bg: "gray.800" }}
      onClick={onClick}
    >
      Delete
    </Button>
  );
};

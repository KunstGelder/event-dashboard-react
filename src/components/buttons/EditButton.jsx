import React from "react";
import { Button } from "@chakra-ui/react";

export const EditButton = ({ onClick }) => {
  return (
    <Button size="sm" colorScheme="gray" onClick={onClick}>
      Edit
    </Button>
  );
};

import { Link } from "react-router-dom";
import {
  Heading,
  Card,
  Text,
  Image,
  Box,
  Flex,
  Button,
} from "@chakra-ui/react";

export const EventDetail = ({ event, categories, onEdit, onDelete }) => {
  if (!event || !categories) {
    return <Box>Loading...</Box>;
  }

  const formatDateTime = (dateTimeString) => {
    return new Date(dateTimeString).toLocaleString("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card
      width="100%"
      height="100%"
      minH="460px"
      p={4}
      boxShadow="base"
      border="1px solid #E2E8F0"
      transition="all 0.2s"
      _hover={{ boxShadow: "lg", transform: "translateY(-4px)" }}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
    >
      <Link to={`/event/${event.id}`} style={{ textDecoration: "none" }}>
        <Box>
          {/* 💡 제목+설명 고정 height 블록 */}
          <Box minH="72px" mb={2}>
            <Heading size="md" noOfLines={2}>
              {event.title}
            </Heading>
            <Text fontSize="sm" color="gray.600" noOfLines={2}>
              {event.description}
            </Text>
          </Box>

          <Image
            src={event.image}
            alt={event.title}
            fallbackSrc="https://via.placeholder.com/300x200?text=No+Image"
            mb={3}
            width="100%"
            height="180px"
            objectFit="cover"
            borderRadius="md"
          />

          <Text fontSize="sm" mb={1}>
            <strong>Start:</strong> {formatDateTime(event.startTime)}
          </Text>
          <Text fontSize="sm" mb={2}>
            <strong>End:</strong> {formatDateTime(event.endTime)}
          </Text>
        </Box>
      </Link>

      <Flex justify="space-between" mt="auto">
        <Button size="sm" colorScheme="gray" onClick={() => onEdit(event)}>
          Edit
        </Button>
        <Button
          size="sm"
          bg="gray.700"
          color="white"
          _hover={{ bg: "gray.800" }}
          onClick={() => onDelete(event.id)}
        >
          Delete
        </Button>
      </Flex>
    </Card>
  );
};

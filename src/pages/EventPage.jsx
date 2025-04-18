import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Heading,
  Image,
  Text,
  Stack,
  Spinner,
  Tag,
  IconButton,   // ✅ 추가
  Flex,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons"; // ✅ 추가

export function EventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventAndCategories = async () => {
      try {
        const [eventRes, categoriesRes] = await Promise.all([
          fetch(`http://localhost:3001/events/${Number(eventId)}`),
          fetch("http://localhost:3001/categories"),
        ]);

        if (!eventRes.ok || !categoriesRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const eventData = await eventRes.json();
        const categoryData = await categoriesRes.json();

        setEvent(eventData);
        setCategories(categoryData);
        setLoading(false);
      } catch (error) {
        console.error("❌ Failed to load event:", error);
        setLoading(false);
      }
    };

    fetchEventAndCategories();
  }, [eventId]);

  const getCategoryName = (id) => {
    const category = categories.find((c) => c.id === id);
    return category ? category.name : null;
  };

  if (loading) {
    return (
      <Box textAlign="center" mt={20}>
        <Spinner size="xl" color="white" />
        <Text mt={4} color="gray.500">Loading event...</Text>
      </Box>
    );
  }

  if (!event || !event.id) {
    return (
      <Box textAlign="center" mt={20}>
        <Text fontSize="lg" color="red.500">❌ Event not found or failed to load.</Text>
      </Box>
    );
  }

  return (
    <Box bg="white" minH="100vh">
      <Box maxW="800px" mx="auto" p={6} mt={6}>

        {/* ✅ 동그란 아이콘 버튼으로 뒤로가기 */}
        <IconButton
          icon={<ChevronLeftIcon boxSize={6} />}
          aria-label="Back"
          onClick={() => navigate(-1)}
          variant="outline"
          borderRadius="full"
          size="lg"
          mb={6}
          _hover={{ bg: "gray.200" }}
        />

        <Box
          position="relative"
          width="100%"
          pb="66.6667%"
          mb={6}
          borderRadius="md"
          overflow="hidden"
        >
          <Image
            src={event.image}
            alt={event.title}
            fallbackSrc="https://via.placeholder.com/300x200?text=No+Image"
            position="absolute"
            top={0}
            left={0}
            width="100%"
            height="100%"
            objectFit="cover"
          />
        </Box>

        <Heading mb={4} color="black">{event.title}</Heading>
        <Text fontSize="md" mb={4} color="gray.700">{event.description}</Text>
        <Text fontSize="sm" color="gray.500" mb={2}>📍 {event.location}</Text>
        <Text fontSize="sm" color="gray.500" mb={2}>
          🕒 {new Date(event.startTime).toLocaleString()} — {new Date(event.endTime).toLocaleString()}
        </Text>
        
        <Stack direction="row" mt={4} spacing={2}>
          {event.categoryIds?.map((id) => {
            const name = getCategoryName(id);
            return name ? (
              <Tag key={id} colorScheme="gray">
                {name}
              </Tag>
            ) : null;
          })}
        </Stack>
      </Box>
    </Box>
  );
}

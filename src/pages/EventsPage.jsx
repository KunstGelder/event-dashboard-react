import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Spinner,
  Flex,
  Button,
  Input,
  Select,
} from "@chakra-ui/react";
import { EventDetail } from "../components/views/EventDetail";
import { EventModal } from "../components/modals/EventModal";

export const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventRes, categoryRes] = await Promise.all([
          fetch("http://localhost:3001/events"),
          fetch("http://localhost:3001/categories"),
        ]);

        const eventsData = await eventRes.json();
        const categoriesData = await categoryRes.json();

        setEvents(eventsData);
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredEvents = events
    .filter((event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory
        ? event.categoryIds.includes(Number(selectedCategory))
        : true;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime));

  const handleUpdateEvents = async () => {
    try {
      const res = await fetch("http://localhost:3001/events");
      const data = await res.json();
      setEvents(data);
    } catch (error) {
      console.error("Failed to refresh events:", error);
    }
  };

  const handleCloseModal = () => {
    setEditingEvent(null);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await fetch(`http://localhost:3001/events/${id}`, {
        method: "DELETE",
      });
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("❌ Failed to delete event:", err);
    }
  };  

  if (loading) {
    return <Spinner size="xl" color="gray.500" />;
  }

  return (
    <Box p={4} bg="white" color="black" minHeight="100vh" position="relative">
      {/* Header */}
      <Heading size="md" color="black" mb={4} ml={2} mt={6}>
        Upcoming Events
      </Heading>

{/* Filters */}
<Flex justify="space-between" align="center" mb={6} px={2}>
  <Flex flex="1" gap={4}>
    <Input
      placeholder="Search by title"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      height="40px"
      width="100%"
    />
  </Flex>
  <Select
    placeholder="All"
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    height="40px"
    width="200px"
    ml={4}
    flexShrink={0}
  >
    {categories.map((cat) => (
      <option key={cat.id} value={cat.id}>
        {cat.name}
      </option>
    ))}
  </Select>
</Flex>

      {/* Cards Grid */}
      {filteredEvents.length === 0 ? (
  <Box textAlign="center" fontSize="lg" mt={20} color="gray.600">
    No events found.
  </Box>
    ) : (
    <SimpleGrid
      columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
      spacing={6}
      maxW="1440px"
      mx="auto"
      mt={4}
      mb={12}
    >
    {filteredEvents.map((event) => (
      <EventDetail
        key={event.id}
        event={event}
        categories={categories}
        onEdit={setEditingEvent}
        onDelete={handleDeleteEvent}
      />
    ))}
    </SimpleGrid>
  )}


      {/* Event Edit Modal */}
      {editingEvent && (
        <EventModal
          event={editingEvent}
          onClose={handleCloseModal}
          onUpdateEvents={handleUpdateEvents}
        />
      )}

      {/* Floating + Button */}
      <Box position="fixed" bottom="24px" right="24px" zIndex="999">
        <Button
          borderRadius="full"
          bg="black"
          color="white"
          size="lg"
          width="56px"
          height="56px"
          fontSize="2xl"
          _hover={{ bg: "gray.700" }}
          onClick={() => setEditingEvent({})}
        >
          +
        </Button>
      </Box>
    </Box>
  );
};

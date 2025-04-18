import {
  Box,
  Input,
  Button,
  Stack,
  Textarea,
  Checkbox,
  CheckboxGroup,
  VStack,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { ImageUploader } from "../image/ImageUploader";

export const EventForm = ({ eventData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(eventData?.title || "");
  const [startDateTime, setStartDateTime] = useState(eventData?.startTime || "");
  const [endDateTime, setEndDateTime] = useState(eventData?.endTime || "");
  const [location, setLocation] = useState(eventData?.location || "");
  const [description, setDescription] = useState(eventData?.description || "");
  const [imageUrl, setImageUrl] = useState(eventData?.image || "");
  const [selectedCategories, setSelectedCategories] = useState(
    eventData?.categoryIds?.map(String) || []
  );
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("http://localhost:3001/categories");
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = {
      title,
      startTime: startDateTime,
      endTime: endDateTime,
      location,
      description,
      image: imageUrl,
      categoryIds: selectedCategories.map(Number),
    };

    if (eventData?.id) {
      formData.id = eventData.id;
    }

    onSubmit(formData);
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4}>
      <Stack spacing={4}>
        <Box>
          <Text as="strong">Event Title</Text>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} isRequired />
        </Box>

        <Box>
          <Text as="strong">Start Date & Time</Text>
          <Input
            type="datetime-local"
            value={startDateTime}
            onChange={(e) => setStartDateTime(e.target.value)}
            isRequired
          />
        </Box>

        <Box>
          <Text as="strong">End Date & Time</Text>
          <Input
            type="datetime-local"
            value={endDateTime}
            onChange={(e) => setEndDateTime(e.target.value)}
            isRequired
          />
        </Box>

        <Box>
          <Text as="strong">Location</Text>
          <Input value={location} onChange={(e) => setLocation(e.target.value)} />
        </Box>

        <Box>
          <Text as="strong">Event Description</Text>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </Box>

        <Box>
          <Text as="strong">Image Upload:</Text>
          <ImageUploader onImageCropped={setImageUrl} />
        </Box>

        <Box>
          <Text as="strong">Categories:</Text>
          <CheckboxGroup value={selectedCategories} onChange={setSelectedCategories}>
            <VStack align="start" spacing={1} mt={2}>
              {categories.map((cat) => (
                <Checkbox
                  key={cat.id}
                  value={String(cat.id)}
                  iconColor="white"
                  colorScheme="gray"
                  sx={{
                    ".chakra-checkbox__control": {
                      bg: "transparent",
                      borderColor: "gray.400",
                    },
                    "&[data-checked] .chakra-checkbox__control": {
                      bg: "black",
                      borderColor: "black",
                    },
                    "&[data-checked] .chakra-checkbox__label": {
                      color: "inherit",
                      bg: "transparent",
                    },
                  }}
                >
                  {cat.name}
                </Checkbox>
              ))}
            </VStack>
          </CheckboxGroup>
        </Box>

        <Flex justify="space-between" mt={4}>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            bg="black"
            color="white"
            _hover={{ bg: "gray.800" }}
            type="submit"
          >
            {eventData?.id ? "Update" : "Create"}
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

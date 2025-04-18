import React from "react";
import {
  Input,
  Select,
  Box,
  Flex,
} from "@chakra-ui/react";

export default function EventFilters({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories
}) {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      gap={4}
      mb={6}
      maxW="1440px"
      mx="auto"
      px={2}
    >
      <Input
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        flex={2}
      />

      <Select
        placeholder="All"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        flex={1}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </Select>
    </Flex>
  );
}

import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { EventForm } from "../forms/EventForm";

export function EventModal({ event, onClose, onUpdateEvents }) {
  const toast = useToast();

  // 모달이 열릴 조건: event가 null이 아닌 경우
  if (!event) return null;

  const isEditMode = !!event.id;

  const handleSubmit = async (formData) => {
    const url = isEditMode
      ? `http://localhost:3001/events/${event.id}`
      : `http://localhost:3001/events`;

    const method = isEditMode ? "PATCH" : "POST";

    try {
      await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      toast({
        title: isEditMode ? "Event updated" : "Event created",
        status: "success",
        duration: 2500,
        isClosable: true,
      });

      onUpdateEvents(); // 이벤트 리스트 새로고침
      onClose(); // 모달 닫기
    } catch (error) {
      console.error("Failed to submit event:", error);
      toast({
        title: "Error",
        description: "Failed to save event.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={!!event} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{isEditMode ? "Edit Event" : "Create New Event"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <EventForm
            eventData={event}
            onSubmit={handleSubmit}
            onCancel={onClose}
          />
        </ModalBody>
        {/* {/* <ModalFooter>
          <Button onClick={onClose} mr={3}>
            Cancel
          </Button>
        </ModalFooter> */}
      </ModalContent>
    </Modal>
  );
}

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from "@chakra-ui/react";
  
  export const SimpleModal = ({ isOpen, onClose, title, children }) => {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="gray">Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };
  
// components/image/ImageUploader.jsx
import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {
  Box,
  Button,
  Input,
  Slider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Text,
  Image,
  Flex
} from "@chakra-ui/react";
import getCroppedImg from "./utils/cropImage";

export const ImageUploader = ({ onImageCropped }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [preview, setPreview] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        onOpen();
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCrop = async () => {
    try {
      const base64Image = await getCroppedImg(imageSrc, croppedAreaPixels); // base64 반환
      onImageCropped(base64Image);  // formData.image 로 바로 들어감
      setPreview(base64Image);      // 미리보기 업데이트
      onClose();                    // 모달 닫기
    } catch (err) {
      console.error("🚫 Failed to crop image:", err);
    }
  };  

  return (
    <Box>
      <Input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <Box mt={4}>
          <Text mb={2}>Uploaded Image Preview</Text>
          <Image src={preview} alt="Preview" objectFit="cover" borderRadius="md" maxH="200px" filter="grayscale(100%)"/>
        </Box>
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Crop Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box position="relative" w="100%" h="300px">
                <Cropper
                    image={imageSrc}
                    crop={crop}
                    zoom={zoom}
                    aspect={3 / 2}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={(croppedArea, croppedPixels) => {
                        console.log("✅ onCropComplete fired:", croppedPixels);
                        setCroppedAreaPixels(croppedPixels);
                        }}
                    />

            </Box>
            <Flex mt={4} align="center" gap={2}>
            <Button
                size="sm"
                onClick={() => setZoom((prev) => Math.max(prev - 0.1, 1))}
            >
                -
            </Button>
            <Slider
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(val) => setZoom(val)}
                flex="1"
            />
            <Button
                size="sm"
                onClick={() => setZoom((prev) => Math.min(prev + 0.1, 3))}
            >
                +
            </Button>
            </Flex>

          </ModalBody>
          <ModalFooter>
            <Button
                onClick={handleCrop}
                bg="gray.400"
                color="white"
                _hover={{ bg: "gray.900" }}
                >
                Crop & Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

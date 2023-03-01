import React, { PropsWithChildren } from 'react'

import {
  Box,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Modal,
  Button,
} from '@chakra-ui/react';

export type ModalProps = {
  isOpen: boolean;
  onClose: VoidFunction;
  onOpen: VoidFunction;
  onSubmit: VoidFunction;
  isSubmittable?: boolean;
  title: string;
  btnColor?: string;
} & PropsWithChildren

export default function CustomModal({ isOpen, onOpen, onClose, children, title, onSubmit, isSubmittable = true }: ModalProps) {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            rounded={'lg'}
            boxShadow={'lg'}
            p={8}>
            {children}
          </Box >
        </ModalBody>

        <ModalFooter>
          <Button mr={3} type='submit' onClick={onSubmit} isDisabled={!isSubmittable}>
            Submit
          </Button>
          <Button bg='red.400' _hover={{
            bg: 'red.700',
          }} onClick={onClose} >Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>

  );
}
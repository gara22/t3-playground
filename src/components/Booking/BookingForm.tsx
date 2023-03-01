import React, { forwardRef, useImperativeHandle } from 'react'

import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Booking } from '@prisma/client';

export type SubmitHandle = {
  _submit: VoidFunction;
}

export type BookingFormProps = {
  onSubmit: (data: Pick<Booking, 'description'>) => void;
}

export const BookingForm = forwardRef<SubmitHandle, BookingFormProps>(({ onSubmit }, ref) => {
  const { register, handleSubmit } = useForm<Pick<Booking, 'description'>>();

  useImperativeHandle(ref, () => ({
    async _submit() {
      await handleSubmit(onSubmit)();
    }
  }));

  return (

    <form>
      <Stack spacing={6}>
        <FormControl id="booking">
          <FormLabel>Description</FormLabel>
          <Input type="text" {...register('description')} />
        </FormControl>
        <Flex justifyContent={'space-between'}>
        </Flex>
      </Stack>
    </form>

  );
})

BookingForm.displayName = 'BookingForm'

export default BookingForm;
import React, { forwardRef, useImperativeHandle } from 'react'
import * as z from "zod";

import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Booking, Classroom } from '@prisma/client';
import { zodResolver } from '@hookform/resolvers/zod';

const timeIntervals = [
  { view: '8:00 - 9:00', time: 8 },
  { view: '9:00 - 10:00', time: 9 },
  { view: '10:00 - 11:00', time: 10 },
  { view: '11:00 - 12:00', time: 11 },
  { view: '12:00 - 13:00', time: 12 },
  { view: '13:00 - 14:00', time: 13 },
  { view: '14:00 - 15:00', time: 14 },
  { view: '15:00 - 16:00', time: 15 },
  { view: '16:00 - 17:00', time: 16 },
  { view: '17:00 - 18:00', time: 17 },
  { view: '18:00 - 19:00', time: 18 },
  { view: '19:00 - 20:00', time: 19 },
  { view: '20:00 - 21:00', time: 20 },
];

const schema = z.object({
  classroomId: z.string().min(1, {
    message: "Must choose classroom!",
  }),
  description: z.string().optional(),
  day: z.coerce.date(),
  time: z.coerce.number().min(1, {
    message: "Must choose time!",
  }),
});

export type SubmitHandle = {
  _submit: VoidFunction;
}

export type BookingFormProps = {
  onSubmit: (data: BookingFormValues) => void;
  classrooms: Pick<Classroom, 'id' | 'name'>[];
}
//TODO: maybe find a better solution for date and time handling
export type BookingFormValues = Pick<Booking, 'description' | 'classroomId'> & { day: Date, time: number }

export const BookingForm = forwardRef<SubmitHandle, BookingFormProps>(({ onSubmit, classrooms }, ref) => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<BookingFormValues>({
    resolver: zodResolver(schema)
  });

  useImperativeHandle(ref, () => ({
    async _submit() {
      await handleSubmit(onSubmit)();
    }
  }));

  console.log(getValues())

  return (

    <form>
      <Stack spacing={6}>
        <FormControl id="day" isInvalid={!!errors.day}>
          <FormLabel>day</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type='date'
            {...register('day')}
          />
          <FormErrorMessage>{errors.day?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="time" isInvalid={!!errors.time}>
          <FormLabel>time</FormLabel>
          <Select placeholder='Select option'  {...register('time')}>
            {
              timeIntervals.map(({ view, time }) => (
                <option key={time} value={time}>{view}</option>
              ))
            }
          </Select>
          <FormErrorMessage>{errors.time?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="classroomId" isInvalid={!!errors.classroomId}>
          <FormLabel>classroom id</FormLabel>
          <Select placeholder='Select option' {...register('classroomId')}>
            {
              classrooms.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))
            }
          </Select>
          <FormErrorMessage>{errors.classroomId?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="description">
          <FormLabel>Description</FormLabel>
          <Input type="text" {...register('description')} />
        </FormControl>
      </Stack>
    </form>

  );
})

BookingForm.displayName = 'BookingForm'

export default BookingForm;
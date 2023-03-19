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
import { TIME_INTERVALS } from '../../utils/constants';
import { getHourOfDay } from '../../utils/dates';
import moment from 'moment';

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
  defaultValues?: {
    classroomId: string;
    date: Date;
  }
}
//TODO: maybe find a better solution for date and time handling
export type BookingFormValues = Pick<Booking, 'description' | 'classroomId'> & { day: Date, time: number }

export const BookingForm = forwardRef<SubmitHandle, BookingFormProps>(({ onSubmit, classrooms, defaultValues }, ref) => {
  const { register, handleSubmit, formState: { errors }, getValues } = useForm<BookingFormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ? { classroomId: defaultValues?.classroomId, time: getHourOfDay(defaultValues?.date), day: moment(defaultValues.date).format('YYYY-MM-DD') as unknown as Date } : {}
  });

  useImperativeHandle(ref, () => ({
    async _submit() {
      await handleSubmit(onSubmit)();
    }
  }));

  return (

    <form>
      <Stack spacing={6}>
        <FormControl id="day" isInvalid={!!errors.day} isDisabled={!!defaultValues?.date}>
          <FormLabel>day</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type='date'
            {...register('day')}
          />
          <FormErrorMessage>{errors.day?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="time" isInvalid={!!errors.time} isDisabled={!!defaultValues?.date}>
          <FormLabel>time</FormLabel>
          <Select placeholder='Select option'  {...register('time')}>
            {
              //TODO: get rid of TIME_INTERVALS and use getDays here
              TIME_INTERVALS.map(({ view, time }) => (
                <option key={time} value={time}>{view}</option>
              ))
            }
          </Select>
          <FormErrorMessage>{errors.time?.message}</FormErrorMessage>
        </FormControl>
        <FormControl id="classroomId" isInvalid={!!errors.classroomId} isDisabled={!!defaultValues?.classroomId}>
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
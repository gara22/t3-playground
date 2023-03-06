import React, { forwardRef, useImperativeHandle } from 'react'
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Switch,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Classroom } from '@prisma/client';

const schema = z.object({
  name: z.string().min(3).max(20),
  capacity: z.coerce.number().int().positive().max(50),
  hasComputer: z.boolean(),
});

// export type ClassroomFormProps = {
//   onSubmit: (data: Pick<Classroom, 'name' | 'capacity' | 'hasComputer'>) => void;
// }

export const FindClassroomForm = () => {
  const { register, handleSubmit, formState: { errors, isValid } } = useForm<{ day: Date; time: string; hasComputer: boolean }>({
    resolver: zodResolver(schema),
    mode: 'onTouched',
  });

  return (

    <form>
      <Stack spacing={6}>
        <FormControl id="day">
          <FormLabel>date</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type='date'
            {...register('day')}
          />
          {/* <FormErrorMessage>{errors.name?.message}</FormErrorMessage> */}
        </FormControl>
        {/* //TODO: dropdown for time */}
        <FormControl isInvalid={!!errors.time} id="capacity">
          <FormLabel>Capacity</FormLabel>
          <Input type="number" {...register('time')} />
          {/* {errors.capacity && <FormErrorMessage>{errors.capacity.message}</FormErrorMessage>} */}
        </FormControl>
        <FormControl id="hasComputer">
          <FormLabel>Has computers?</FormLabel>
          <Switch id='email-alerts' {...register('hasComputer')} />
        </FormControl>
        <Button type='submit'>
          search
        </Button>
      </Stack>
    </form>

  );
}

FindClassroomForm.displayName = 'FindClassroomForm'

export default FindClassroomForm;
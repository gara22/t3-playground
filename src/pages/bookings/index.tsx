import { Card, CardBody, CardHeader, Heading, Spinner, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import moment from 'moment';
import { api } from '../../utils/api';

export const Bookings = () => {


  const { data: bookings } = api.booking.getBookings.useQuery();
  const { mutate } = api.booking.deleteBooking.useMutation({
    onSuccess() {
      console.log('success')
    }
  });


  const onDelete = (id: string) => {

    mutate(id);
    //todo refetch bookings after deletion
  }
  console.log(bookings)

  const bg = useColorModeValue('gray.200', 'gray.600');

  return (
    <Stack spacing='2'>
      <h1>
        my bookings

      </h1>
      {bookings ?
        (bookings.map(b => (
          <Card bg={bg} key={b.id} size='sm'>
            <CardBody>
              <Heading size='xs' fontSize='md'>{b.classRoom.name}</Heading>
              <Text fontSize='xs' > {moment(b.from).format('YYYY/\MM/\DD HH:00')} -  {moment(b.to).format('HH:00')} {b.booker.name}</Text>
              <span onClick={() => onDelete(b.id)}>delete</span>
            </CardBody>
          </Card>
        )))
        : <Spinner />
      }
    </Stack>
  )
}
export default Bookings;
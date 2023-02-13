import { Card, CardBody, Heading, Spinner, Stack, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import moment from 'moment';
import { api } from '../../utils/api';



export const Bookings = () => {

  // api

  const { data: bookings } = api.booking.getBookings.useQuery(
  );

  console.log(bookings)
  // log(bookings)

  // const [bookings, setBookings] = useState<Booking[]>([])

  // console.log('booking render');

  // console.log(albums);



  // useEffect(() => {
  //   console.log('useeffeec');

  //   // (async () => {
  //   getFullBookings().then(fetchedBookings => setBookings(fetchedBookings)).catch(_err => setBookings([]));
  //   // setBookings(fetchedBookings)

  //   // })()

  // }, [])

  const bg = useColorModeValue('gray.200', 'gray.600');

  return (
    <Stack spacing='1'>
      <h1>
        bookingsasdasdasdasdasd

      </h1>
      {/* {bookings.length > 0 ?
        (bookings.map(b => (
          <Card bg={bg} key={b._id} size='sm'>
            <CardHeader>
            </CardHeader>
            <CardBody>
              <Heading size='xs' fontSize='xs'>{b.classroom.name}</Heading>
              <Text fontSize='xs' > {moment(b.from).format('YYYY/\MM/\DD HH:00')} -  {moment(b.to).format('HH:00')} {b.booked_by.name}</Text>
            </CardBody>
          </Card>
        )))
        : <Spinner />
      } */}
    </Stack>
  )
}
export default Bookings;
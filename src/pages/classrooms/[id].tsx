import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import moment from 'moment';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react'
import BookingForm, { BookingFormValues, SubmitHandle } from '../../components/Booking/BookingForm';
import { Calendar } from '../../components/Calendar/Calendar'
import CustomModal from '../../components/Modal/Modal';
import { api } from '../../utils/api';
import { LENGTH_OF_WEEK } from '../../utils/constants';
import { addDays, getDays, subtractDays } from '../../utils/dates';


const ClassroomShow = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [currentWeekStartingDate, setCurrentWeekStartingDate] = useState<Date>(moment(new Date()).startOf('isoWeek').toDate());
  const { query: { id } } = useRouter();
  const { data: classroom, isLoading, refetch } = api.classroom.getClassroomById.useQuery({ id });

  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();
  const days = getDays(currentWeekStartingDate, LENGTH_OF_WEEK);
  const { data: bookings, isLoading: isBookingsLoading, refetch: refetchBookings } = api.booking.getBookingsOfClassroom.useQuery({ classroomId: id as string, from: days[0] as Date, to: moment(days[days.length - 1]).endOf('day').toDate() });


  const toast = useToast();


  const createBookingRef = useRef<SubmitHandle>(null);

  const { mutate: createBooking } = api.booking.createBooking.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Booking created.',
        description: "Booking created successfully",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      await refetchBookings();
    },
  });

  const onCreate = (data: BookingFormValues) => {
    onCloseCreate();
    const { description, classroomId, day, time } = data;
    //TODO: convert time to number in bookingform
    const from = moment(day).add((Number(time) - 1), 'hours').toDate();
    const to = moment(day).add(Number(time), 'hours').toDate();

    const bookingData = {
      from,
      to,
      classroomId,
      description: description || '',
    }

    createBooking(bookingData);
  }

  function handleCellClick(date: Date): void {
    console.log("🚀 ~ file: [id].tsx:27 ~ handleCellClick ~ date:", date)
    setSelectedDate(date);
    onOpenCreate();
  }

  if (isLoading)
    return <Spinner />

  if (!classroom)
    return <div>no classroom</div>

  return (
    <>
      <Flex direction='column'>
        <Heading>{classroom?.name}</Heading>
        <WeekSelector startDate={currentWeekStartingDate} onDateChange={setCurrentWeekStartingDate} />
        <Calendar days={days} onCellClick={handleCellClick} bookings={bookings || []} />
      </Flex>
      {selectedDate && <CustomModal title='Create Booking' isOpen={isOpenCreate} onOpen={onOpenCreate} onClose={onCloseCreate} onSubmit={() => createBookingRef.current?._submit()} >
        <BookingForm onSubmit={onCreate} ref={createBookingRef} classrooms={[{ id: classroom?.id, name: classroom?.name }]} defaultValues={{ classroomId: classroom.id, date: selectedDate, }} />
      </CustomModal>}
    </>
  )
}

const WeekSelector = ({ startDate, onDateChange }: { startDate: Date, onDateChange: (updatedDate: Date) => void }) => {
  return (
    <Flex justifyContent='center' padding='10' fontSize='3xl' alignItems='center'>
      <ArrowBackIcon boxSize='10' onClick={() => onDateChange(subtractDays(startDate, 7))} cursor='pointer' />
      Current week is: {moment(startDate).format('YYYY/MM/DD')} - {moment(startDate).add(LENGTH_OF_WEEK - 1, 'day').format('YYYY/MM/DD')}
      <ArrowForwardIcon boxSize='10' onClick={() => onDateChange(addDays(startDate, 7))} cursor='pointer' />
    </Flex>
  )
}

export default ClassroomShow;

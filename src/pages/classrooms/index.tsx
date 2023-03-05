import { Button, Card, CardBody, Flex, Heading, Spinner, Stack, Text, useColorModeValue, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useRef, useState } from 'react'
import { api } from '../../utils/api';
import { Classroom } from '@prisma/client';
import { DeleteIcon } from '@chakra-ui/icons';
import CustomModal from '../../components/Modal/Modal';
import DeleteBooking, { DeleteHandle } from '../../components/Booking/DeleteBooking';
import ClassroomForm, { SubmitFormType } from '../../components/Classroom/ClassroomForm';

export const Classrooms = () => {

  const { isOpen: isOpenCreate, onOpen: onOpenCreate, onClose: onCloseCreate } = useDisclosure();
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();

  const [selectedClassroomId, setSelectedClassroomId] = useState('');


  const toast = useToast()

  const createClassroomRef = useRef<SubmitFormType>(null);
  const deleteClassroomRef = useRef<DeleteHandle>(null);

  //TODO: fetching runs unnecessarily when either creating or deleting
  const { data: classrooms = [], isLoading, refetch } = api.classroom.getAllClassrooms.useQuery();
  const { mutate: deleteClassroom } = api.classroom.deleteClassroom.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Classroom deleted.',
        description: "Classroom deleted successfully",
        status: 'info',
        duration: 5000,
        isClosable: true,
      })
      await refetch();
    },
    onError: (err) => {
      toast({
        title: err.message,
        description: "Couldn't delete classroom",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  });

  const { mutate: createClassroom } = api.classroom.createClassroom.useMutation({
    onSuccess: async () => {
      toast({
        title: 'Classroom created.',
        description: "Classroom created successfully",
        status: 'success',
        duration: 5000,
        isClosable: true,
      })
      await refetch();
    },
    onError: (err) => {
      toast({
        title: err.message,
        description: "Couldn't create classroom",
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    },
  });

  const onCreate = (data: Pick<Classroom, 'name' | 'capacity' | 'hasComputer'>) => {
    console.log(data)
    onCloseCreate()
    createClassroom(data);
  }


  const onDelete = (id: string) => {
    onCloseDelete()
    deleteClassroom(id);
  }

  const bg = useColorModeValue('gray.200', 'gray.600');

  return (
    <>
      <Stack spacing='2'>
        <h1>
          classrooms
        </h1>
        <Button onClick={onOpenCreate} width='2xs'>New Classroom</Button>
        {isLoading ?
          <Spinner />
          :
          (classrooms.map(c => (
            <Card bg={bg} key={c.id} size='sm'>
              <CardBody>
                <Heading size='xs' fontSize='md'>{c.name}</Heading>
                <Flex justifyContent='space-between' alignItems='center'>
                  <Flex gap='10px'>
                    <Text fontSize='xs' >Capacity: {c.capacity} </Text>
                    <Text fontSize='xs' > Has computers: {c.hasComputer ? 'Yes' : 'No'} </Text>
                  </Flex>
                  <DeleteIcon onClick={() => { setSelectedClassroomId(c.id); onOpenDelete() }} w={6} h={6} color="red.500" _hover={{ color: 'red.800', cursor: 'pointer' }} />
                </Flex>
              </CardBody>
            </Card>
          )))
        }
      </Stack>
      <CustomModal title='Create Booking' isOpen={isOpenCreate} onOpen={onOpenCreate} onClose={onCloseCreate} onSubmit={() => createClassroomRef.current?._submit()} >
        <ClassroomForm onSubmit={onCreate} ref={createClassroomRef} />
      </CustomModal>
      <CustomModal title='Delete Booking' isOpen={isOpenDelete} onOpen={onOpenDelete} onClose={() => { setSelectedClassroomId(''); onCloseDelete() }} onSubmit={() => deleteClassroomRef.current?._delete()}>
        {/* TODO: make a general delete component */}
        <DeleteBooking onDelete={onDelete} bookingId={selectedClassroomId} ref={deleteClassroomRef} />
      </CustomModal>
    </>
  )
}
export default Classrooms;
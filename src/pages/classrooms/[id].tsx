import { Flex, Heading, Spinner } from '@chakra-ui/react'
import { useRouter } from 'next/router';
import React from 'react'
import { Calendar } from '../../components/Calendar/Calendar'
import { api } from '../../utils/api';


const ClassroomShow = () => {
  const { query: { id } } = useRouter();
  const { data: classroom, isLoading, refetch } = api.classroom.getClassroomById.useQuery({ id })

  if (isLoading)
    return <Spinner />

  return (
    <Flex direction='column'>
      <Heading>{classroom?.name}</Heading>
      <Calendar />
    </Flex>
  )
}

export default ClassroomShow;

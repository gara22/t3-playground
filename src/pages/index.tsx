import { type NextPage } from "next";

import { api } from "../utils/api";
import FindClassroomForm from "../components/Classroom/FindClassroomForm";
import moment from "moment";
import { useState } from "react";
import { SimpleGrid, Card, Heading, CardBody, Button, Text, Spinner, Flex, ListItem, UnorderedList } from "@chakra-ui/react";
import Link from "next/link";

const Home: NextPage = () => {

  const [inputs, setInputs] = useState<{ from: Date; to: Date; hasComputer: boolean; enabled: boolean }>({ to: new Date(), from: new Date(), hasComputer: false, enabled: false })

  const { data: rooms = [], isLoading, isFetching } = api.classroom.getFreeClassrooms.useQuery({ from: inputs.from, to: inputs.to, hasComputer: inputs.hasComputer }, { enabled: inputs.enabled, refetchOnWindowFocus: false, onSuccess: () => console.log('success') })


  const onQuery = (data: { day: Date; time: number; hasComputer: boolean }) => {
    const { day, time, hasComputer } = data;
    //TODO: convert time to number in bookingform
    //TODO: investigate time zones. why do we need -2? 
    const from = moment(day).add(Number(time) - 2, 'hours').toDate();
    const to = moment(day).add(Number(time) - 1, 'hours').toDate();

    const bookingData = {
      from,
      to,
      hasComputer,
      enabled: true,
    }
    setInputs(bookingData);
  }


  return (
    <>
      <Flex as={'main'} direction='column' gap='30px'>
        <FindClassroomForm onSubmit={onQuery} />
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(300px, 1fr))'>
          {/* TODO: don't show spinner when not fetching/loading */}
          {(isFetching || isLoading) ? <Spinner /> :
            rooms.map(r => (
              //TODO add color for light mode too
              <Card bg='gray.600' key={r.id}>
                <CardBody>
                  <Heading size='md'>{r.name}</Heading>
                  <Text fontSize='xs'> {moment(inputs.from).format('YYYY/\MM/\DD HH:00')} -  {moment(inputs.to).format('HH:00')}</Text>
                  <UnorderedList fontSize='sm' paddingLeft='10px' paddingTop='10px'>
                    <ListItem>Capacity: {r.capacity}</ListItem>
                    <ListItem>Has computers:  {r.hasComputer ? 'Yes' : 'No'}</ListItem>
                  </UnorderedList>
                </CardBody>
                <Button>
                  <Link href={`/classrooms/${r.id}`}>
                    View here
                  </Link>
                </Button>
              </Card>

            ))
          }
        </SimpleGrid>
      </Flex>
    </>
  );
};

export default Home;
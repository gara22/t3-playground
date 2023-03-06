import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "../utils/api";
import Topbar from "../components/Topbar/Topbar";
import { log } from "console";
import { Input } from "@chakra-ui/react";
import FindClassroomForm from "../components/Classroom/FindClassroomForm";
import moment from "moment";
import { useState } from "react";

const Home: NextPage = () => {

  // const [inputs, setInputs] = useState<{ from: Date; to: Date; hasComputer: boolean }>({ to: new Date(), from: new Date(), hasComputer: false })

  //TODO: figure out how this works without usestate and shit
  // const { data: rooms = [], isLoading, refetch } = api.classroom.getFreeClassrooms.useQuery(inputs, { enabled: true })


  const onQuery = (data: { day: Date; time: number; hasComputer: boolean }) => {
    const { day, time, hasComputer } = data;
    console.log(time)
    //TODO: convert time to number in bookingform
    //TODO: investigate time zones. why do we need -1? 
    const from = moment(day).add(Number(time) - 1, 'hours').toDate();
    const to = moment(day).add(Number(time), 'hours').toDate();

    const bookingData = {
      from,
      to,
      hasComputer
    }
    // setInputs(bookingData);

    // console.log(inputs);

    // const res = api.classroom.getFreeClassrooms.useQuery(bookingData);

    // console.log(res)

    // createBooking(bookingData);
  }


  return (
    <>
      <main>
        <FindClassroomForm onSubmit={onQuery} />
      </main>
    </>
  );
};

export default Home;
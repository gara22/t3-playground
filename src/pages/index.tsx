import styles from "./index.module.css";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "../utils/api";
import Topbar from "../components/Topbar/Topbar";
import { log } from "console";
import { Input } from "@chakra-ui/react";
import FindClassroomForm from "../components/Classroom/FindClassroomForm";

const Home: NextPage = () => {

  return (
    <>
      <main>
        <FindClassroomForm />
      </main>
    </>
  );
};

export default Home;
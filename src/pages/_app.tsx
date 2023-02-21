import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider } from '@chakra-ui/react'

import { api } from "../utils/api";

import "../styles/globals.css";
import Topbar from "../components/Topbar/Topbar";
import { Page } from "../components/Page/Page";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <ChakraProvider>
      <SessionProvider session={session}>
        <Topbar />
        <Page>
          <Component {...pageProps} />
        </Page>
      </SessionProvider>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);

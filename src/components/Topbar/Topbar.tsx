import { ReactNode } from 'react';
import Link from 'next/link'
// import { Link as RouterLink } from "react-router-dom";

import {
  Box,
  Flex,
  Avatar,
  // Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { signIn, signOut, useSession } from "next-auth/react";

const NavLink = ({ children, to }: { children: ReactNode, to: string }) => (
  <Box
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.600'),
    }}>
    <Link
      href={to}
    >
      {children}
    </Link>
  </Box>
);

export default function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: sessionData } = useSession();

  return (

    <Box bg={useColorModeValue('gray.100', 'gray.700')} px={4} shadow="md" zIndex={2} >
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'} maxWidth='1024px' margin={'auto'}>
        <Flex gap={10}>
          <NavLink to='/'>
            home
          </NavLink>
          <NavLink to='/classrooms'>
            classrooms
          </NavLink>
          <NavLink to='/bookings'>
            bookings
          </NavLink>
          {/* <NavLink to='/admin'>
            admin
          </NavLink> */}

        </Flex>
        <Flex alignItems={'center'}>
          <Stack direction={'row'} spacing={7}>
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>

            {sessionData?.user ? <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar
                  size={'sm'}
                  src={sessionData?.user.image ? sessionData.user.image : 'https://avatars.dicebear.com/api/male/username.svg'}
                />
              </MenuButton>
              <MenuList alignItems={'center'}>
                <br />
                <Center>
                  <Avatar
                    size={'2xl'}
                    src={sessionData?.user.image ? sessionData.user.image : 'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </Center>
                <br />
                <Center>
                  <p>{sessionData.user?.name}</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>Your Servers</MenuItem>
                <MenuItem>Account Settings</MenuItem>
                <MenuItem onClick={() => void signOut()}>Logout</MenuItem>
              </MenuList>
            </Menu> : <Button onClick={() => void signIn()}>Log in</Button>}
          </Stack>
        </Flex>
      </Flex>
    </Box>

  );
}
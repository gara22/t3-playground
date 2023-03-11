import { Box, Flex, Grid, GridItem, GridItemProps, SimpleGrid } from '@chakra-ui/react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import { randomUUID } from 'crypto';
import React, { ReactNode } from 'react'
import { TIME_INTERVALS } from '../../utils/constants';

const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

type CellType = {
  time: number; day: string
}

const CELLS = TIME_INTERVALS.reduce<CellType[]>((acc, time) => {
  for (const day of DAYS) {
    const item = { time: time.time, day }
    acc.push(item)
  }
  return acc;
}, []);

console.log(CELLS)

export const Calendar = () => {
  return (
    <Grid gridTemplateColumns={`repeat(${DAYS.length + 1}, 1fr)`} gridTemplateRows={`repeat(${TIME_INTERVALS.length + 1} minmax(50px, 1fr))`}>
      <>
        <HeaderCell> </HeaderCell>
        {DAYS.map(day => <HeaderCell key={day}>{day}</HeaderCell>)}
        {TIME_INTERVALS.map((time, idx) => (<Cell bg='tomato' gridColumn={1} gridRow={idx + 2} key={time.time}>{time.view}</Cell>))}
        {CELLS.map(cell => (<Cell bg='teal' key={` ${cell.day} + ${cell.time}`}>{` ${cell.day} - ${cell.time}`}</Cell>))}
      </>
    </Grid>
  )
}

const Cell = ({ children, ...rest }: CellProps): ReactJSXElement => {
  return <GridItem height='120px' outlineColor={'gray.500'} outline='1px solid' {...rest}>
    <Flex height={'100%'} justifyContent='center' alignItems='center'>
      {children}
    </Flex>
  </GridItem>
}

const HeaderCell = ({ children }: { children: ReactNode }): ReactJSXElement => {
  return <Cell height='50px'>{children}</Cell>
}

interface CellProps extends GridItemProps {
  children: ReactNode
}
import { Booking, Classroom, User } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

//find a more elegant way for extending prisma types
export type BookingWithAllData = {
  booker: Pick<User, 'name'>,
  classRoom: Classroom
} & Booking

export const bookingRouter = createTRPCRouter({

  getBookings: protectedProcedure.query<BookingWithAllData[]>(({ ctx }) => {
    return ctx.prisma.booking.findMany({
      where: { bookerId: ctx.session.user.id },
      include: {
        booker: {
          select: {
            name: true,
          }
        }, classRoom: true
      }
    })
  }),

  deleteBooking: protectedProcedure
    .input(z.string())
    .mutation(({ input, ctx }) => {
      return ctx.prisma.booking.delete({
        where: { id: input }
      })
    }),

  createBooking: protectedProcedure
    .input(z.object({ description: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.booking.create({
        data: {
          from: new Date(),
          to: new Date(),
          bookerId: ctx.session.user.id,
          classRoomId: 'cldrz1ktg0000unn4cajswhbm',
          description: input.description,
        }
      })
    }),
});

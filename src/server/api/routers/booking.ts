import { Booking, Classroom, User } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

//find a more elegant way for extending prisma types
export type BookingWithAllData = {
  booker: Pick<User, 'name'>,
  classroom: Classroom
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
        }, classroom: true
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
    .input(z.object({ from: z.date(), to: z.date(), classroomId: z.string(), description: z.string() }))
    .mutation(({ input, ctx }) => {
      return ctx.prisma.booking.create({
        data: {
          from: input.from,
          to: input.to,
          bookerId: ctx.session.user.id,
          classroomId: input.classroomId,
          description: input.description,
        }
      })
    }),

  // isAvailableAt: protectedProcedure
  //   .input(z.object({ classroomId: z.string(), from: z.date(), to: z.date() }))
  //   .query(({input, ctx }) => {
  //     return ctx.prisma.booking.findMany()
  //   }),
});
//TODO: figure out how to export queries
// export const isAvailableAt = (from: Date, to: Date, classroomId: string, ctx) => {

// }
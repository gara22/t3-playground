import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const classRoomRouter = createTRPCRouter({

  getAllClassrooms: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.classroom.findMany()
  }),

  createClassroom: protectedProcedure
    .input(z.object({
      name: z.string(),
      capacity: z.number(),
      hasComputer: z.boolean(),
    }))
    .mutation(({ input: { name, capacity, hasComputer }, ctx }) => {
      return ctx.prisma.classroom.create({
        data: {
          name,
          capacity,
          hasComputer
        }
      })
    }),

  deleteClassroom: protectedProcedure
    .input(z.string())
    .mutation(({ input, ctx }) => {
      return ctx.prisma.classroom.delete({
        where: { id: input }
      })
    }),

  // getFreeClassrooms: publicProcedure
  //   .input(z.object({
  //     from: z.date(),
  //     to: z.date(),
  //     hasComputer: z.boolean(),
  //   }))
  // .query(({ input, ctx }) => {
  //   return ctx.prisma.classroom.findMany({
      
  //   })
  // }),
});

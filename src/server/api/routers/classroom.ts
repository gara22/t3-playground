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

  getFreeClassrooms: publicProcedure
    .input(z.object({
      from: z.date(),
      to: z.date(),
      hasComputer: z.boolean(),
    }))
    .query(async ({ input, ctx }) => {

      const classrooms = await ctx.prisma.classroom.findMany({
        where: {
          hasComputer: input.hasComputer,
        },
        include: {
          bookings: {
            where: {
              OR: [
                {
                  AND: [
                    {
                      from: {
                        gt: input.from
                      },

                    },
                    {
                      from: {
                        lt: input.to
                      }
                    }
                  ]
                },
                {
                  AND: [
                    {
                      to: {
                        gt: input.from
                      },

                    },
                    {
                      to: {
                        lt: input.to
                      }
                    }
                  ]
                },
                {
                  AND: [
                    {
                      from: {
                        lte: input.from
                      },

                    },
                    {
                      to: {
                        gte: input.to
                      }
                    }
                  ]
                }
              ]
            }
          }
        }
      })
      //TODO: maybe find a more efficient way to filter, but its okay for now.
      return classrooms.filter(r => r.bookings.length === 0)
    }),
});

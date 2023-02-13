import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const classRoomRouter = createTRPCRouter({

  getAllClassrooms: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.classroom.findMany()
  }),
});

import { Booking } from "@prisma/client";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const bookingRouter = createTRPCRouter({

  getBookings: protectedProcedure.query<Booking[]>(({ ctx }) => {
    return ctx.prisma.booking.findMany({
      where: { bookerId: ctx.session.user.id }
    })
  }),
});

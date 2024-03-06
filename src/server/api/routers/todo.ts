import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const todoRouter = createTRPCRouter({
  fetchToDos: protectedProcedure.query(async ({ ctx }) => {
    const userID = ctx.session.user.id;
    if (!userID) return;
    const todos = await ctx.db.todos.findMany({
      where: {
        userId: userID,
      },
    });
    return todos
  }),
  fetchSingleToDo: protectedProcedure.input(
    z.object({
      id: z.number()
    })
  ).query(async ({ ctx, input }) => {

  })
});

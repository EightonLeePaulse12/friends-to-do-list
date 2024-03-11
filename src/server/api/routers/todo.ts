"use server";

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
      include: {
        subnotes: true,
      },
    });
    return todos;
  }),

  fetchSingleToDo: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const todo = await ctx.db.todos.findUnique({
        where: {
          id: input.id,
        },
        include: {
          subnotes: {
            where: {
              todoId: input.id,
            },
          },
        },
      });
    }),

  makeToDo: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        userId: z.string(),
        name: z.string(),
        priority: z.enum(["Null", "Low", "Neutral", "High", "Critical"]),
        dueDate: z.date().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const createToDo = await ctx.db.todos.create({
        data: {
          userId: input.userId,
          name: input.name,
          priority: input.priority,
          dueDate: input.dueDate,
        },
      });
      return createToDo;
    }),

  createSubNotes: protectedProcedure
    .input(
      z.object({
        subnotes: z.array(z.object({ name: z.string() })),
        todoId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { todoId, subnotes } = input;

      if (!todoId || subnotes.length === 0 || subnotes.length < 0) {
        throw new Error(
          "Something went wrong, either there were no subnotes or an ID wasn't provided.",
        );
      }

      const createSubNote = await ctx.db.subnotes.createMany({
        data: subnotes.map((sub) => ({
          name: JSON.stringify(sub.name),
          todoId,
        })),
      });

      return createSubNote;
    }),

  editToDo: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        name: z.string(),
        priority: z.enum(["Null", "Low", "Neutral", "High", "Critical"]),
        dueDate: z.date().nullish(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const edit = await ctx.db.todos.update({
        data: {
          name: input.name,
          priority: input.priority,
          dueDate: input.dueDate,
        },
        where: {
          id: input.id,
        },
      });

      return edit;
    }),

  editSubnotes: protectedProcedure
    .input(
      z.object({
        subnotes: z.string(),
        todoId: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { todoId, subnotes } = input;
      if (!todoId || subnotes.length === 0 || subnotes.length < 0) {
        throw new Error(
          "Something went wrong, either there were no subnotes or an ID wasn't provided.",
        );
      }
      const edit = ctx.db.subnotes.update({
        where: {
          id: todoId,
        },
        data: {
          name: subnotes,
        },
      });

      return edit;
    }),

  deleteToDo: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      if (!id) throw new Error("Something went wrong, no todo ID provided");

      const deletion = await ctx.db.todos.delete({
        where: {
          id: id,
        },
      });
      return deletion;
    }),

  deleteSubNote: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      if (!id) throw new Error("Something went wrong, no ID was provided");

      const deletion = await ctx.db.subnotes.delete({
        where: {
          id: id,
        },
      });
      return deletion;
    }),
});

import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
  const { name, dueDate, priority } = body;

  try {
    const newDate = new Date(dueDate).toISOString()
    const add = await prisma.todo.create({
      data: {
        name,
        dueDate: newDate,
        priority,
      },
    });

    if (add) {
      return NextResponse.json({
        message: "To-do was added successfully",
        status: 201,
        data: add,
      });
    } else {
      return NextResponse.json({
        message: "Something went wrong",
        status: 400,
        data: add,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong with the request, check API",
      status: 500,
      error,
    });
  }
};

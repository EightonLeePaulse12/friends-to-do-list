import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request) => {
  const body = await req.json();
  const { id, name, dueDate, priority, isCompleted } = body;
  const newDate = new Date(dueDate).toISOString();
  const newId = parseInt(id, 10)
  try {
    const res = await prisma.todo.update({
      where: {
        id: newId,
      },
      data: {
        name,
        dueDate: newDate,
        priority,
        isCompleted,
      },
    });
    console.log(res)

    if (!id) {
      return NextResponse.json({
        message: "To-do not found",
        status: 404,
      });
    }

    if (!res) {
      return NextResponse.json({
        message: "Could not update your record",
        status: 401,
      });
    }

    return NextResponse.json({
      message: "Record updated successfully",
      status: 201,
      data: res,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went very wrong",
      status: 500,
      error,
    });
  }
};

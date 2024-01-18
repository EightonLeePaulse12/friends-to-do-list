import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (req: Request) => {
  const body = await req.json();
  const { id } = body;

  try {
    if (!id) {
      return NextResponse.json({
        message: "Record could not be deleted because it does not exist",
        status: 404,
      });
    }

    const res = await prisma.todo.delete({
      where: {
        id: id,
      },
    });

    if (!res) {
      return NextResponse.json({
        message: "Something went wrong",
        status: 401,
        data: res,
      });
    }

    if (res) {
      return NextResponse.json({
        message: "Record was deleted successfully",
        status: 201,
        data: res,
      });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something is not right",
      status: 500,
      error,
    });
  }
};

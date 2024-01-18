import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const data = await prisma.todo.findMany();

    if (!data) {
      return NextResponse.json({
        message: "Something went wrong || No data available",
        status: 401,
        data,
      });
    } else {
      return NextResponse.json({
        message: "Data successfully retrieved",
        status: 200,
        todos: data,
      });
    }
  } catch (e) {
    console.log(e);
    return NextResponse.json({
      message: "Fetching data failed || Bad request",
      status: 500,
      e,
    });
  }
};

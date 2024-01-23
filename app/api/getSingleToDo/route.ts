import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  try {
    const link = req.url;
    const iD = link.substring(link.lastIndexOf("=") + 1);

    const idAsNumb = parseInt(iD, 10);

    const data = await prisma.todo.findUnique({
      where: {
        id: idAsNumb,
      },
    });
    // console.log(data)

    if (!data) {
      return NextResponse.json({
        message: "To-do not found",
        status: 404,
      });
    }

    return NextResponse.json({
      todo: data,
      status: 200,
      message: "Fetched to-do successfully",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: error || "Internal server error",
      message: "Something went wrong",
    });
  }
};

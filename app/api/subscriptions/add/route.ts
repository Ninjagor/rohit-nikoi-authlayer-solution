import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
export async function POST(
  req: Request
) {
  try {
    const body = await req.json();

    const { email } = body;

    if (!email) {
      return new NextResponse("Email is required", { status: 400 })
    }

    const updatedUser = await prisma.user.update({
      where: {
        email: email
      },
      data: {
        role: "subscribed"
      }
    })

    return NextResponse.json({ "data": "success", "updatedUser": updatedUser }, { status: 200 })

  } catch(error) {
    console.log(`An error occured: ${error}`)
    return new NextResponse("An error occured", { status: 500 })
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { name, data, userId } = await req.json();

  const inventory = await prisma.inventory.create({
    data: {
      name,
      data,
      userId,
    },
  });

  return NextResponse.json(inventory);
}
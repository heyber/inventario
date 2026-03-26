import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const inventory = await prisma.inventoryFile.create({
    data: {
      name: body.name,
      description: body.description || "",
      data: body.data,
      userId: body.userId,
    },
  });

  return NextResponse.json(inventory);
}
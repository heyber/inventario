import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const updated = await prisma.inventoryFile.update({
    where: { id: body.id },
    data: {
      data: body.data,
      description: body.description,
    },
  });

  return NextResponse.json(updated);
}
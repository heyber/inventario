import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { id } = await req.json();

  const inventory = await prisma.inventory.findUnique({
    where: {
      id: Number(id), // 👈 MUY IMPORTANTE
    },
  });

  return NextResponse.json(inventory);
}
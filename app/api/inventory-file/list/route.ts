import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();

  const inventories = await prisma.inventoryFile.findMany({
    where: { userId: body.userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ inventories });
}
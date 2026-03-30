import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const inventory = await prisma.inventoryFile.create({
      data: {
        name: body.name,
        description: body.description || "",
        type: body.type,
        data: body.data,
        userId: body.userId,
      },
    });

    return NextResponse.json(inventory);
  } catch (error) {
    console.error("ERROR CREATE:", error);

    return NextResponse.json(
      { error: "Error creando inventario" },
      { status: 500 }
    );
  }
}
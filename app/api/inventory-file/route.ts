import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, data, userId, description } = await req.json();

    const inventory = await prisma.inventoryFile.create({
      data: {
        name,
        description: description || "",
        data,
        userId,
      },
    });

    return NextResponse.json(inventory);
  } catch (error) {
    console.error("ERROR:", error);
    return NextResponse.json(
      { error: "Error creando inventario" },
      { status: 500 }
    );
  }
}
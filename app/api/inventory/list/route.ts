import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", body);

    const inventory = await prisma.inventory.create({
      data: {
        name: body.name,
        data: body.data,
        userId: body.userId,
      },
    });

    return NextResponse.json(inventory);
  } catch (error) {
    console.error("ERROR CREANDO INVENTARIO:", error);
    return NextResponse.json(
      { error: "Error al crear inventario" },
      { status: 500 }
    );
  }
}
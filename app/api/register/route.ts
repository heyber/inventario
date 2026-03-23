import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("BODY:", body); // 👈 DEBUG

    const { name, email, password, city, company, phone } = body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        city,
        company,
        phone,
      },
    });

    return Response.json({
      message: "Usuario creado correctamente",
      user,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: "Error al crear usuario" },
      { status: 500 }
    );
  }
}
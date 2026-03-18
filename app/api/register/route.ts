import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.create({
      data: { email, password },
    });

    return Response.json({
      message: `Usuario creado: ${user.email} ✅`,
    });
  } catch (error) {
    return Response.json({
      message: "Error creando usuario ❌",
    });
  }
}
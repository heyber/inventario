import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    return Response.json({
      success: false,
      message: "Credenciales incorrectas ❌",
    });
  }

  return Response.json({
    success: true,
    user,
  });
}
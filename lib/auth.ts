import { cookies } from "next/headers";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session");

  if (!session) return null;

  const user = await prisma.user.findUnique({
    where: {
      id: session.value,
    },
  });

  return user;
}
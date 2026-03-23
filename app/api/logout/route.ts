import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  cookieStore.delete("session");

  return NextResponse.redirect(new URL("/login", "http://localhost:3001"));
}
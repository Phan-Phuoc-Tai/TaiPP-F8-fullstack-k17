import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const cookieStore = await cookies();
  const key = request.nextUrl.searchParams.get("key");
  return NextResponse.json({
    key: cookieStore.get(key!)?.value,
  });
};

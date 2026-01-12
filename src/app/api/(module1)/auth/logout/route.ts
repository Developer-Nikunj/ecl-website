"use server";

import { NextResponse, NextRequest } from "next/server";
import redis from "@/utils/redis/redis";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import { testConnection } from "@/database/db";
import { verifyAdmin } from "@/utils/authorizations/validateToken";

export async function POST(request: NextRequest) {
  await testConnection();

  const auth = await verifyAdmin(request,"");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }
  console.log("api check");
  const sessionId = request.cookies.get("sessionId")?.value;

  if(auth.user == null) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  await logsEntry({
    userId: auth.user.id.toString(),
    email: auth?.user?.email,
    role: auth?.user?.role,
    action: "LOGOUT_SUCCESS",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname.toString(),
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });
  if (sessionId) {
    await redis.del(`session:${sessionId}`);
    await redis.del(`refresh:${sessionId}`);
  }

  const res = NextResponse.json({ success: true });

  const isProd = process.env.NODE_ENV === "production";

  res.cookies.set("sessionId", "", {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  res.cookies.set("permissions", "", {
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });

  return res;

}

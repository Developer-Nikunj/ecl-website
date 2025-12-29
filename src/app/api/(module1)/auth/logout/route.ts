"use server";

import { NextResponse, NextRequest } from "next/server";
import redis from "@/utils/redis/redis";


export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get("sessionId")?.value;
  if (sessionId) {
    await redis.del(`session:${sessionId}`);
    await redis.del(`refresh:${sessionId}`);
  }

  const res = NextResponse.json({ success: true });
  res.cookies.delete("sessionId");
  return res;
}


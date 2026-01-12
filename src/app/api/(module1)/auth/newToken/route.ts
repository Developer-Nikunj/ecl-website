import { NextRequest, NextResponse } from "next/server";
import redis from "@/utils/redis/redis";
import { randomBytes } from "crypto";
import jwt from "jsonwebtoken";
import { userModel } from "@/models/user.model";

export async function POST(request: NextRequest) {
  console.log("backend auth/refresh 1");
  const sessionId = request.cookies.get("sessionId");
  console.log("backend auth/refresh sessionId", sessionId);
  if (!sessionId)
    return NextResponse.json(
      { message: "sessionId Not Found !!" },
      { status: 401 }
    );
  const sessionIdValue = sessionId.value;
  const storedRefresh = await redis.get(`refresh:${sessionIdValue}`);
  console.log("backend auth/refresh storedRefresh", storedRefresh);
  if (!storedRefresh)
    return NextResponse.json(
      { message: "storedRefresh Not Found !!" },
      { status: 405 }
    );

  const newRefresh = randomBytes(40).toString("hex");
  await redis.set(`refresh:${sessionId}`, newRefresh, "EX", 7 * 86400);

  const userIdStr = await redis.get(`session:${sessionIdValue}`);
  const userId = Number(userIdStr);

  const existuser = await userModel.findOne({
    where: {
      id: userId,
    },
    attributes: ["id", "name", "email", "role", "actions"],
  });
  if (!existuser) {
    return NextResponse.json(
      { message: "existuser Not Found !!" },
      { status: 500 }
    );
  }
  const accessToken = jwt.sign(
    {
      id: existuser.id,
      name: existuser.name,
      email: existuser.email,
      role: existuser.role,
    },
    process.env.ACCESS_JWT_SECRET!,
    {
      expiresIn: "20m",
    }
  );
  return NextResponse.json({ token: accessToken, status: 1,email: existuser.email, });
}

"use server";

import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "@/models/user.model";
import { randomUUID, randomBytes } from "crypto";
import redis from "@/utils/redis/redis";
import { logsEntry } from "@/utils/logsEntry/logsEntry";

export async function POST(request: NextRequest) {
  try {
    await testConnection();
    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json({
        status: 0,
        message: "Email & password are mandatory",
      });
    }

    const existuser = await userModel.findOne({
      where: {
        email: email,
      },
      attributes: [
        "id",
        "name",
        "email",
        "emailVerified",
        "password",
        "role",
        "actions",
      ],
    });

    if (!existuser) {
      return NextResponse.json({
        status: 0,
        message: "Please register first ",
      });
    }
    if (!existuser.emailVerified) {
      return NextResponse.json({
        status: 0,
        message: "Please Verify Email",
      });
    }
    const checkpassword = await bcrypt.compare(password, existuser.password);

    if (!checkpassword) {
      return NextResponse.json({
        status: 0,
        message: "Please Enter correct password",
      });
    }

    // create refresh token
    const refreshToken = randomBytes(40).toString("hex");

    // create access token
    const accessToken = jwt.sign(
      {
        id: existuser.id,
        name: existuser.name,
        email: existuser.email,
        role: existuser.role,
      },
      process.env.ACCESS_JWT_SECRET!,
      {
        expiresIn: "1m",
      }
    );

    const sessionId = randomUUID();

    await redis.set(`session:${sessionId}`, existuser.id, "EX", 7 * 86400);
    await redis.set(`refresh:${sessionId}`, refreshToken, "EX", 7 * 86400);

    const response = NextResponse.json({
      status: 1,
      token: accessToken,
      message: "Login successfully",
    });
    response.cookies.set({
      name: "sessionId",
      value: sessionId,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    await logsEntry({
      userId: existuser.id.toString(),
      email: existuser.email,
      action: "LOGIN_SUCCESS",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname.toString(),
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });
    return response;
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

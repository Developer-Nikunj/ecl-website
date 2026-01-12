import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { userModel } from "@/models/user.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import "@/models";
import bcrypt from "bcrypt";

/**
 * CREATE User
 */
export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request, "postUser");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }
    const { name, email, password, role } = await request.json();

    if (!email || !password) {
      return NextResponse.json({
        status: 0,
        message: "Email & Password are mandatory",
      });
    }
    const existEmail = await userModel.findOne({
      where: {
        email: email,
      },
    });
    if (existEmail) {
      return NextResponse.json({
        status: 0,
        message: "Email already Exists !!",
      });
    }
    if (auth.user == null) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      role,
      password: hashedPassword,
      emailVerified: true,
    });

    await logsEntry({
      userId: auth.user?.id.toString(),
      email: auth.user?.email,
      role: auth.user?.role,
      action: "User_CREATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 201,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "user created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}




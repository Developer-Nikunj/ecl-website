"use server";

import { NextRequest, NextResponse } from "next/server";
import { sequelize, testConnection } from "@/database/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "@/models/user.model";

const jwtSecret = process.env.JWT_SECRET || "default_secret";

export async function POST(request: NextRequest, response: NextResponse) {
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
      attributes: ["id", "name", "email", "emailVerified", "password","role"],
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
      return NextResponse.json({ status: 0, message: "Please Enter correct password" });
    }

    // create token
    const token = jwt.sign(
      {
        id: existuser.id,
        name: existuser.name,
        email: existuser.email,
        role: existuser.role,
      },
        jwtSecret,
      {
        expiresIn:"30d"
      }
    );

    const response = NextResponse.json({
      status: 1,
      message: "Login successfully",
    });
    response.cookies.set({
      name: "token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 30 * 24 * 60 * 60, // 30 days
    });
    return response;
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

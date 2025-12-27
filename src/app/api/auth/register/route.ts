"use server";

import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import bcrypt from "bcrypt";
import { userModel } from "@/models/user.model";
import otpGenerator from "otp-generator";
import { sendEmailToUser } from "@/utils/email/sendVerificationEmail";
import {logsEntry} from "@/utils/logsEntry/logsEntry"

export async function POST(request: NextRequest) {
  try {
    await testConnection();
    const {name, email, password, role } = await request.json();
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
        message: "Email already Exists, please login !!",
      });
    }
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });
    console.log("otp", otp);
    const hashedPassword = await bcrypt.hash(password, 10);
    const data0 = await userModel.create({
      email,
      password: hashedPassword,
      otp,
      role,
      name,
    });

    if (!data0) {
      return NextResponse.json({ status: 0, message: "Registration Failed" });
    }
    //send otp on email
    // sendEmailToUser(email, otp, "VerificationEmail");
    await logsEntry({
      userId: "",
      email: email,
      action: "REGISTER_SUCCESS",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname.toString(),
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });
    return NextResponse.json({
      status: 1,
      message: "OTP for Verification sent on email",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

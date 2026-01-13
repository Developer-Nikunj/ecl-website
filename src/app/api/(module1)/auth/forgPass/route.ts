"use server";

import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { userModel } from "@/models/user.model";
import { sendEmailToUser } from "@/utils/email/sendVerificationEmail";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import otpGenerator from "otp-generator";
import "@/models"; // 🔥 ensure associations are registered

// this function for the creating .... khud dekhle
export async function POST(request: NextRequest) {
  try {
    await testConnection();
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({
        status: 0,
        message: "Email is mandatory",
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

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
      digits: true,
    });
    console.log("otp", otp);

    sendEmailToUser(email, otp);

    await userModel.update(
        {otp:otp},{
      where:{
        email:email
      }}
    );

    await logsEntry({
      userId: existuser.id.toString(),
      email: existuser.email,
      role: existuser.role,
      action: "FORGETPASSWORD_OTP_CREATE_SUCCESS",
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


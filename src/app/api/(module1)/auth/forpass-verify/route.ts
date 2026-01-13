"use server";

import { NextRequest, NextResponse } from "next/server";
import { sequelize, testConnection } from "@/database/db";
import { userModel } from "@/models/user.model";
import { sendEmailToUser } from "@/utils/email/sendVerificationEmail";
import { logsEntry } from "@/utils/logsEntry/logsEntry";

export async function POST(request: NextRequest) {
  try {
    await testConnection();
    const { email, otp } = await request.json();
    if (!email || !otp) {
      return NextResponse.json({
        status: 0,
        message: "Email & otp are mandatory",
      });
    }
    const existuser = await userModel.findOne({
      where: {
        email: email,
      },
      attributes: ["id", "name", "email", "emailVerified", "otp"],
    });
    const existEmail = existuser?.dataValues;

    if (existEmail?.otp != otp) {
      return NextResponse.json({
        status: 0,
        message: "Enter correct Otp ",
      });
    }
    const [data0] = await userModel.update(
      { emailVerified: true, otp: "" },
      {
        where: {
          email: email,
        },
      }
    );

    if (!data0) {
      return NextResponse.json({
        status: 0,
        message: "forget Password failed",
      });
    }
    await logsEntry({
      userId: existEmail?.id.toString(),
      email: existEmail?.email,
      role: existEmail?.role,
      action: "FORGETPASSWORD_OTP_VERIFY_SUCCESS",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname.toString(),
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Please make New Password",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

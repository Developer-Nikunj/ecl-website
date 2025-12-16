"use server";

import { NextRequest, NextResponse } from "next/server";
import { sequelize, testConnection } from "@/database/db";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { QueryTypes } from "sequelize";
import { userModel } from "@/models/user.model";
import otpGenerator from "otp-generator";
import { sendEmailToUser } from "@/utils/email/sendVerificationEmail";

const jwtSecret = process.env.JWT_SECRET || "default_secret";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    await testConnection();
    const { email, otp } = await request.json();
    if (!email || !otp) {
      return NextResponse.json({
        status: 0,
        message: "Email & otp are mandatory",
      });
    }

    const existEmail = await userModel.findOne({
      where: {
        email: email,
      },
      attributes: ["id", "name", "email", "emailVerified", "otp"],
    });

    if (existEmail.otp != otp) {
      return NextResponse.json({
        status: 0,
        message: "Enter correct Otp ",
      });
    }
    const [data0] = await userModel.update(
      { email: email },
      { emailVerified: 1 }
    );

    if (data0.length == 0 || !data0) {
      return NextResponse.json({ status: 0, message: "Registration Failed" });
    }

    return NextResponse.json({
      status: 1,
      message: "Registration Complete",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

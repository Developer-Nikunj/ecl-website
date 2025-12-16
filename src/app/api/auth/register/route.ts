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

export async function POST(request: NextRequest, reponse: NextResponse) {
  try {
    await testConnection();
    const { email, password } = await request.json();
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
      specialChars: false,
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    const [data0] = await userModel.create({ email, hashedPassword, otp });

    if (data0.length == 0 || !data0) {
      return NextResponse.json({ status: 0, message: "Registration Failed" });
    }
    //send otp on email
    sendEmailToUser(email, otp,"VerificationEmail");
    return NextResponse.json({
      status: 1,
      message: "OTP for Verification sent on email",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

"use server";

import { NextRequest, NextResponse } from "next/server";
import { sequelize, testConnection } from "@/database/db";
import { userModel } from "@/models/user.model";
import { sendEmailToUser } from "@/utils/email/sendVerificationEmail";



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
    if (existEmail?.emailVerified){
      return NextResponse.json({
        status: 1,
        message: "Email already verified",
      });
    }
      if (existEmail?.otp != otp) {
        return NextResponse.json({
          status: 0,
          message: "Enter correct Otp ",
        });
      }
    const [data0] = await userModel.update({ emailVerified: true,otp:"" }, {where:{
      email:email
    }});

    if (!data0) {
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

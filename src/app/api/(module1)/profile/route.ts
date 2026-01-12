import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { userModel } from "@/models/user.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { saveImage } from "@/utils/uploads/saveImage";
import { Log } from "@/models/logs.model";
import z from "zod";

/* ---------------- GET ---------------- */

export async function GET(request: NextRequest) {
  try {
    await testConnection();
    const auth = await verifyAdmin(request, "");
    if (!auth.valid)
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );

    if (auth.user == null) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const data = await userModel.findOne({
      where: {
        id: auth.user.id,
      },
      attributes: {
        exclude: [
          "updatedAt",
          "createdAt",
          "password",
          "token",
          "otp",
          "emailVerified",
          "actions",
        ],
      },
    });

    const userActivity = await Log.findAll({
      where: {
        userId: auth.user.id.toString(),
      },
      attributes: [
        "action",
        "requestMethod",
        "endPoint",
        "createdAt",
        "status",
      ],
      order: [["createdAt", "DESC"]],
      limit: 10,
    });

    return NextResponse.json({
      status: 1,
      message: "Users Fetched successfully",
      data: data,
      userActivity: userActivity,
    });
  } catch (err) {
    console.log("err", err);
    return NextResponse.json({ status: 0, message: "Create failed" });
  }
}

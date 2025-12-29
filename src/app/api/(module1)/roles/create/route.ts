import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { roleModel } from "@/models/role.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";

export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request);
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const { name, description } = await request.json();
    if (!name) {
      return NextResponse.json({
        status: 0,
        message: "Name is mandatory",
      });
    }

    const existrole = await roleModel.findOne({
      where: {
        name: name,
      },
      attributes: ["id", "name", "description", "active"],
    });

    if (existrole) {
      return NextResponse.json({
        status: 0,
        message: `Role ${name} already exists`,
      });
    }

    const data = await roleModel.create({
      name,
      description,
    });

    if (!data) {
      return NextResponse.json({
        status: 0,
        message: `Role ${name} creation failed`,
      });
    }

    await logsEntry({
      userId: auth?.user?.id.toString(),
      email: auth?.user?.email,
      action: "ROLE_CREATED_SUCCESS",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname.toString(),
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    const response = NextResponse.json({
      status: 1,
      message: "Role created successfully",
    });
    return response;
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

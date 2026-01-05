import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { roleModel } from "@/models/role.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import { Op } from "sequelize";

export async function PUT(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request, "putrole");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const { roleId, name, description, status } = await request.json();

    if (!roleId) {
      return NextResponse.json(
        { status: 0, message: "Role ID is required" },
        { status: 400 }
      );
    }
    if (!name) {
      return NextResponse.json(
        { status: 0, message: "Name is mandatory" },
        { status: 400 }
      );
    }

    // Check if role exists
    const existRole = await roleModel.findOne({ where: { id: roleId } });
    if (!existRole) {
      return NextResponse.json(
        { status: 0, message: `Role with id ${roleId} not found` },
        { status: 404 }
      );
    }

    // Optional: check if new name already exists on a different role
    const duplicateRole = await roleModel.findOne({
      where: {
        name,
        id: { [Op.ne]: roleId },
      },
    });

    if (duplicateRole) {
      return NextResponse.json(
        { status: 0, message: `Role ${name} already exists` },
        { status: 400 }
      );
    }

    // Update role
    await roleModel.update(
      { name, description, active: status },
      { where: { id: roleId } }
    );

    if (auth.user == null) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    await logsEntry({
      userId: auth.user.id.toString(),
      email: auth.user.email,
      role: auth.user.role,
      action: "ROLE_UPDATED_SUCCESS",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname.toString(),
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Role updated successfully",
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { status: 0, message: "Internal server Error" },
      { status: 500 }
    );
  }
}

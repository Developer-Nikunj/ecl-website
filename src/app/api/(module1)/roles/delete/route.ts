import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { roleModel } from "@/models/role.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";

export async function DELETE(
  request: NextRequest,
) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request,"deleterole");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const { roleId } = await request.json();
    if (!roleId) {
      return NextResponse.json(
        { status: 0, message: "Invalid role id" },
        { status: 400 }
      );
    }

    const role = await roleModel.findByPk(roleId);
    if (!role) {
      return NextResponse.json(
        { status: 0, message: "Role not found" },
        { status: 404 }
      );
    }

    await role.destroy();

    await logsEntry({
      userId: auth.user.id.toString(),
      email: auth.user.email,
      action: "ROLE_DELETED_SUCCESS",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Role deleted successfully",
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { status: 0, message: "Internal server error" },
      { status: 500 }
    );
  }
}

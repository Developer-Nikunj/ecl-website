import { NextRequest, NextResponse } from "next/server";
import { menuModel } from "@/models/menu.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const auth = await verifyAdmin(request,"deletemenu");
    if (!auth.valid) {
      return NextResponse.json(
        { status: 0, message: auth.message },
        { status: auth.status }
      );
    }

    const menu = await menuModel.destroy({
      where: { slug },
    });

    if (!menu) {
      return NextResponse.json({
        status: 0,
        message: "Menus not Deleted",
      });
    }

    await logsEntry({
      userId: auth?.user?.id.toString(),
      email: auth?.user?.email,
      role: auth?.user?.role,
      action: "MENU_DELETED_SUCCESS",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname.toString(),
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Menus delete successfully",
    });
  } catch (error) {
    console.error("DELETE MENU BY SLUG ERROR:", error);
    return NextResponse.json(
      { status: 0, message: "Internal server error" },
      { status: 500 }
    );
  }
}

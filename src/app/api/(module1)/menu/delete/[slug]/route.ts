import { NextRequest, NextResponse } from "next/server";
import { menuModel } from "@/models/menu.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";


export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const auth = await verifyAdmin(request);
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

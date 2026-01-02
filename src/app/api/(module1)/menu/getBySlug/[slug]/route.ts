import { NextRequest, NextResponse } from "next/server";
import { menuModel } from "@/models/menu.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { fn, literal } from "sequelize";

export async function GET(
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

    const menu = await menuModel.findAll({
      where: { slug },
      attributes: [
        "slug",
        [
          fn(
            "JSON_AGG",
            literal(`json_build_object('id', id, 'menuName', "menuName")`)
          ),
          "menus",
        ],
      ],
      group: ["slug"],
      raw: true,
    });

    if (menu.length === 0) {
      return NextResponse.json({
        status: 0,
        message: "Menu not found",
        data: null,
      });
    }

    return NextResponse.json({
      status: 1,
      message: "Menu fetched successfully",
      data: menu[0],
    });
  } catch (error) {
    console.error("GET MENU BY SLUG ERROR:", error);
    return NextResponse.json(
      { status: 0, message: "Internal server error" },
      { status: 500 }
    );
  }
}


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

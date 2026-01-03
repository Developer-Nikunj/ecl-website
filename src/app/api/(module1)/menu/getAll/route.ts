import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { menuModel } from "@/models/menu.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { fn, col, literal } from "sequelize";

export async function GET(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request,"getmenu");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const menus = await menuModel.findAll({
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
      order: [["slug", "ASC"]],
      raw: true,
    });

    return NextResponse.json({
      status: 1,
      data: menus,
    });
  } catch (error) {
    console.error("GET MENU ERROR:", error);
    return NextResponse.json(
      { status: 0, message: "Internal server error" },
      { status: 500 }
    );
  }
}

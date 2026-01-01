import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { menuModel } from "@/models/menu.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { fn, literal } from "sequelize";

interface Params {
  params: {
    slug: string;
  };
}

export async function GET(request: NextRequest, { params }: Params) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request);
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const { slug } = params;

    const menus = await menuModel.findAll({
      where: { slug },
      attributes: [
        "slug",
        [
          fn(
            "JSON_AGG",
            literal(
              `json_build_object('id', id, 'menuName', "menuName")`
            )
          ),
          "menus",
        ],
      ],
      group: ["slug"],
      raw: true,
    });

    return NextResponse.json({
      status: 1,
      data: menus.length ? menus[0] : null,
    });
  } catch (error) {
    console.error("GET MENU BY SLUG ERROR:", error);
    return NextResponse.json(
      { status: 0, message: "Internal server error" },
      { status: 500 }
    );
  }
}

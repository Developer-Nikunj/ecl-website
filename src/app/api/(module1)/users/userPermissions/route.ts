import { NextRequest, NextResponse } from "next/server";
import "@/models"; // 🔥 ensure associations are registered
import { menuModel } from "@/models/menu.model";
import { permissionModel } from "@/models/permission.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { testConnection } from "@/database/db";

export async function GET(request: NextRequest) {
  await testConnection();

  const auth = await verifyAdmin(request,"getpermission");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  const userId = Number(request.nextUrl.searchParams.get("userId"));

  if (!userId) {
    return NextResponse.json(
      { status: 0, message: "userId is required" },
      { status: 400 }
    );
  }

  const permissions = await permissionModel.findAll({
    where: { userId },
    include: [
      {
        model: menuModel,
        as: "menu", // ✅ MUST MATCH association alias
        attributes: ["id", "slug", "menuName", "status"],
        required: true,
      },
    ],
  });

  const grouped = permissions.reduce((acc: any[], perm: any) => {
    const menu = perm.menu;
    if (!menu) return acc;

    let group = acc.find((g) => g.slug === menu.slug);

    if (!group) {
      group = {
        slug: menu.slug,
        menus: [],
      };
      acc.push(group);
    }

    group.menus.push({
      id: menu.id,
      menuName: menu.menuName,
    });

    return acc;
  }, []);

  return NextResponse.json({
    status: 1,
    message: "User menus fetched successfully",
    // data: permissions,
    data: grouped,
  });
}

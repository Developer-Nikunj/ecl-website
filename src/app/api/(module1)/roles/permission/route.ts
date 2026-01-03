import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { permissionModel } from "@/models/permission.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import z from "zod";
import { Op } from "sequelize";
import { logsEntry } from "@/utils/logsEntry/logsEntry";

const validateInput = z.object({
  userId: z.array(z.number()),
  menuId: z.array(z.number()),
});

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

    const body = await request.json();
    const validateData = validateInput.parse(body);

    /** 1️⃣ Get existing permissions */
    const existingPermissions = await permissionModel.findAll({
      where: {
        userId: { [Op.in]: validateData.userId },
        menuId: { [Op.in]: validateData.menuId },
      },
      attributes: ["userId", "menuId"],
      raw: true,
    });

    /** 2️⃣ Convert existing to Set for fast lookup */
    const existingSet = new Set(
      existingPermissions.map((p) => `${p.userId}-${p.menuId}`)
    );

    /** 3️⃣ Prepare only new permissions */
    const permissionsToCreate = [];

    for (const user of validateData.userId) {
      for (const menu of validateData.menuId) {
        const key = `${user}-${menu}`;
        if (!existingSet.has(key)) {
          permissionsToCreate.push({
            userId: user,
            menuId: menu,
          });
        }
      }
    }

    /** 4️⃣ Bulk insert only new ones */
    if (permissionsToCreate.length > 0) {
      await permissionModel.bulkCreate(permissionsToCreate);
    }
    await logsEntry({
      userId: auth?.user?.id.toString(),
      email: auth?.user?.email,
      role: auth?.user?.role,
      action:
        permissionsToCreate.length > 0
          ? "PERMISSION_GRANT_SUCCESS"
          : "PERMISSION_GRANT_FAILED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname.toString(),
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });
    return NextResponse.json({
      status: 1,
      message:
        permissionsToCreate.length > 0
          ? "Permissions added successfully"
          : "All permissions already exist",
    });
  } catch (error) {
    console.error("Permission error:", error);
    return NextResponse.json(
      { status: 0, message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request);
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const body = await request.json();
    const { userId, menuId } = validateInput.parse(body);

    const editUserId = userId[0]; // 👈 single user

    /** 1️⃣ Get all existing permissions for user */
    const existingPermissions = await permissionModel.findAll({
      where: { userId: editUserId },
      attributes: ["menuId"],
      raw: true,
    });

    const existingMenuIds = existingPermissions.map((p) => p.menuId);

    /** 2️⃣ Find menus to CREATE */
    const menusToCreate = menuId.filter(
      (menu) => !existingMenuIds.includes(menu)
    );

    /** 3️⃣ Find menus to DELETE */
    const menusToDelete = existingMenuIds.filter(
      (menu) => !menuId.includes(menu)
    );

    /** 4️⃣ Bulk CREATE */
    if (menusToCreate.length > 0) {
      await permissionModel.bulkCreate(
        menusToCreate.map((menu) => ({
          userId: editUserId,
          menuId: menu,
        }))
      );
    }

    /** 5️⃣ Bulk DELETE */
    if (menusToDelete.length > 0) {
      await permissionModel.destroy({
        where: {
          userId: editUserId,
          menuId: { [Op.in]: menusToDelete },
        },
      });
    }
    await logsEntry({
      userId: auth?.user?.id.toString(),
      email: auth?.user?.email,
      role: auth?.user?.role,
      action: "PERMISSION_GRANT_EDIT_SUCCESS",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname.toString(),
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });
    return NextResponse.json({
      status: 1,
      message: "Permissions updated successfully",
      created: menusToCreate.length,
      removed: menusToDelete.length,
    });
  } catch (error) {
    console.error("Permission edit error:", error);
    return NextResponse.json(
      { status: 0, message: "Internal server error" },
      { status: 500 }
    );
  }
}

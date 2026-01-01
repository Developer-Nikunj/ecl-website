import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { permissionModel } from "@/models/permission.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import z from "zod";
import { Op } from "sequelize";

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

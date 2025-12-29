import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { permissionModel } from "@/models/permission.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import z from "zod";

const validateInput = z.object({
  userId: z.array(z.number()), // user IDs
  menuId: z.array(z.number()), // menu IDs
  permission: z.boolean(),    
});
// to gave permission
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
    const validateData: z.infer<typeof validateInput> =
      validateInput.parse(body);

    // Prepare array for bulk insert
    const permissionsToCreate = [];

    for (const user of validateData.userId) {
      for (const menu of validateData.menuId) {
        permissionsToCreate.push({
          userId: user,
          menuId: menu,
          permission: validateData.permission,
        });
      }
    }

    if (permissionsToCreate.length > 0) {
      await permissionModel.bulkCreate(permissionsToCreate);
    }

    return NextResponse.json({
      status: 1,
      message: "Actions added to users successfully",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

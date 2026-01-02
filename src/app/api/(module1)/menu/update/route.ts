import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { menuModel } from "@/models/menu.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import z from "zod";

const validateInput = z.object({
  slug: z.string().transform((v) => v.replace(/\s+/g, "").toLowerCase()),
  menus: z.array(
    z.object({
      id: z.number().optional(),    
      menuName: z.string(),
    })
  ),
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
    const { slug, menus } = validateInput.parse(body);

    // 1️⃣ Get existing menus for this slug
    const existingMenus = await menuModel.findAll({
      where: { slug },
      attributes: ["id", "menuName"],
    });

    const existingNames = existingMenus.map((m) => m.menuName);
    const incomingNames = menus.map((m) => m.menuName);

    // 2️⃣ CREATE missing menus
    const toCreate = incomingNames.filter(
      (name) => !existingNames.includes(name)
    );

    if (toCreate.length) {
      await menuModel.bulkCreate(
        toCreate.map((menuName) => ({
          slug,
          menuName,
        }))
      );
    }

    // 3️⃣ DELETE removed menus
    const toDelete = existingNames.filter(
      (name) => !incomingNames.includes(name)
    );

    if (toDelete.length) {
      await menuModel.destroy({
        where: {
          slug,
          menuName: toDelete,
        },
      });
    }

    return NextResponse.json({
      status: 1,
      message: "Menu updated successfully",
    });
  } catch (error) {
    console.error("UPDATE MENU ERROR:", error);
    return NextResponse.json(
      { status: 0, message: "Internal server error" },
      { status: 500 }
    );
  }
}

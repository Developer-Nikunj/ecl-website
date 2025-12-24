import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { menuModel } from "@/models/menu.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import z, { string } from "zod";

const validateInput = z.object({
  slug: z.string().transform((val) => val.replace(/\s+/g, "").toLowerCase()),
  submenus: z.array(string()),
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
    const validateData: z.infer<typeof validateInput> =
      validateInput.parse(body);

    if (validateData.submenus.includes("post")) {
      await menuModel.create({
        slug: validateData.slug,
        menuName: `post${validateData.slug}`,
      });
    }

    if (validateData.submenus.includes("get")) {
      await menuModel.create({
        slug: validateData.slug,
        menuName: `get${validateData.slug}`,
      });
    }

    if (validateData.submenus.includes("put")) {
      await menuModel.create({
        slug: validateData.slug,
        menuName: `put${validateData.slug}`,
      });
    }

    if (validateData.submenus.includes("delete")) {
      await menuModel.create({
        slug: validateData.slug,
        menuName: `delete${validateData.slug}`,
      });
    }

    return NextResponse.json({
      status: 1,
      message: "Menus added successfully",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

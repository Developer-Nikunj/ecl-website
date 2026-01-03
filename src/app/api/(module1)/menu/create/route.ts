import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { menuModel } from "@/models/menu.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import z, { string } from "zod";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import { permissionModel } from "@/models/permission.model";
import "@/models"; // 🔥 ensure associations are registered

const validateInput = z.object({
  slug: z.string().transform((val) => val.replace(/\s+/g, "").toLowerCase()),
  submenus: z.array(string()),
});

export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request,"postmenu");

    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const body = await request.json();
    const validateData: z.infer<typeof validateInput> =
      validateInput.parse(body);

    const alreadyExist = await menuModel.findOne({
      where: {
        slug: validateData.slug,
      },
      attributes: ["id"],
    });

    if (alreadyExist) {
      return NextResponse.json({
        status: 0,
        message: "Menus already Exist",
      });
    }

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

    await logsEntry({
      userId: auth?.user?.id.toString(),
      email: auth?.user?.email,
      role: auth?.user?.role,
      action: "MENU_CREATED_SUCCESS",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname.toString(),
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Menus added successfully",
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

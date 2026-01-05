import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { bannerModel } from "@/models/banner.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { saveImage } from "@/utils/uploads/saveImage";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import "@/models";

/**
 * CREATE Banner
 */
export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request, "postbanner");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const formData = await request.formData();

    const image = formData.get("img") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const active = formData.get("active") === "true";

    if (!image || !name) {
      return NextResponse.json(
        { status: 0, message: "Image and name are required" },
        { status: 400 }
      );
    }

    const imagePath = await saveImage(image, "banner");

    const banner = await bannerModel.create({
      img: imagePath,
      name,
      description,
      active,
    });

    await logsEntry({
      userId: auth.user?.id.toString(),
      email: auth.user?.email,
      role: auth.user?.role,
      action: "BANNER_CREATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 201,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Banner created successfully",
      data: banner,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * GET ALL Banners
 */
export async function GET() {
  await testConnection();

  const banners = await bannerModel.findAll({
    order: [["createdAt", "DESC"]],
  });

  return NextResponse.json({ status: 1, data: banners });
}

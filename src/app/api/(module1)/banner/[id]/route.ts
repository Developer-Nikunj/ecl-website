import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { bannerModel } from "@/models/banner.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { saveImage } from "@/utils/uploads/saveImage";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import fs from "fs";
import path from "path";

function deleteImage(filePath: string | null) {
  if (!filePath) return;

  const absolutePath = path.join(process.cwd(), "public", filePath);

  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
}

/**
 * GET Banner by ID
 */
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await testConnection();
  const { id } = await context.params;
  const banner = await bannerModel.findByPk(Number(id), {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  if (!banner) {
    return NextResponse.json(
      { status: 0, message: "Banner not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ status: 1, data: banner });
}

/**
 * UPDATE Banner
 */
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  await testConnection();

  const { id } = await context.params;

  const auth = await verifyAdmin(request, "putbanner");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  const banner = await bannerModel.findByPk(Number(id));
  if (!banner) {
    return NextResponse.json(
      { status: 0, message: "Banner not found" },
      { status: 404 }
    );
  }

  const formData = await request.formData();
  const image = formData.get("img");

  let imgPath = banner.img;

  if (image instanceof File && image.size > 0) {
    // 🔥 delete old image FIRST
    deleteImage(banner.img);

    // 🔥 save new image
    imgPath = await saveImage(image, "banner");
  }

  await banner.update({
    img: imgPath,
    name: formData.get("name"),
    description: formData.get("description"),
    active: formData.get("active") === "true" || formData.get("active") === "1",
  });
  if (auth.user == null) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  await logsEntry({
    userId: auth.user?.id.toString(),
    email: auth.user?.email,
    role: auth.user?.role,
    action: "BANNER_UPDATED",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname,
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  return NextResponse.json({
    status: 1,
    message: "Banner updated successfully",
  });
}

/**
 * DELETE Banner
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await testConnection();
  const { id } = await context.params;
  const auth = await verifyAdmin(request, "deletebanner");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  const banner = await bannerModel.findByPk(Number(id));
  if (!banner) {
    return NextResponse.json(
      { status: 0, message: "Banner not found" },
      { status: 404 }
    );
  }

  await banner.destroy();

  if (auth.user == null) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  await logsEntry({
    userId: auth.user?.id.toString(),
    email: auth.user?.email,
    role: auth.user?.role,
    action: "BANNER_DELETED",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname,
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  return NextResponse.json({
    status: 1,
    message: "Banner deleted successfully",
  });
}

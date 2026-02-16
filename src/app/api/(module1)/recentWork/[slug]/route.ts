"use server";

import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { RecentWorksModel } from "@/models/recentWorks.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { saveImage } from "@/utils/uploads/saveImage";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import fs from "fs";
import path from "path";

/* ---------------- IMAGE DELETE HELPER ---------------- */
function deleteImage(filePath: string | null) {
  if (!filePath) return;

  const absolutePath = path.join(process.cwd(), "public", filePath);
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
}

/* ---------------- GET RECENT WORK BY SLUG ---------------- */
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  await testConnection();
  const { slug } = await context.params;

  const work = await RecentWorksModel.findOne({
    where: { slug },
    attributes: { exclude: ["updatedAt"] },
  });

  if (!work) {
    return NextResponse.json(
      { status: 0, message: "Recent Work not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ status: 1, data: work });
}

/* ---------------- UPDATE RECENT WORK ---------------- */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  await testConnection();
  const { slug } = await context.params;

  const auth = await verifyAdmin(request, "updateRecentWork");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status },
    );
  }

  const work = await RecentWorksModel.findOne({ where: { slug } });
  if (!work) {
    return NextResponse.json(
      { status: 0, message: "Recent Work not found" },
      { status: 404 },
    );
  }

  const formData = await request.formData();
  const image = formData.get("image") as File | null;

  let imgPath = work.image;

  if (image && image.size > 0) {
    deleteImage(work.image);
    imgPath = await saveImage(image, "recentWorks");
  }

  const title = (formData.get("title") as string) || work.title;
  const newSlug = title
    ? title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    : work.slug;

  await work.update({
    title,
    slug: newSlug,
    description: formData.get("description") as string,
    icon: formData.get("icon") as string,
    categories: JSON.parse((formData.get("categories") as string) || "[]"),
    image: imgPath,
    active: formData.get("active") === "true" || formData.get("active") === "1",
  });

  await logsEntry({
    userId: auth.user!.id.toString(),
    email: auth.user!.email,
    role: auth.user!.role,
    action: "RECENT_WORK_UPDATED",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname,
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  return NextResponse.json({
    status: 1,
    message: "Recent Work updated successfully",
  });
}

/* ---------------- DELETE RECENT WORK ---------------- */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  await testConnection();
  const { slug } = await context.params;

  const auth = await verifyAdmin(request, "deleteRecentWork");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status },
    );
  }

  const work = await RecentWorksModel.findOne({ where: { slug } });
  if (!work) {
    return NextResponse.json(
      { status: 0, message: "Recent Work not found" },
      { status: 404 },
    );
  }

  deleteImage(work.image);
  await work.destroy();

  await logsEntry({
    userId: auth.user!.id.toString(),
    email: auth.user!.email,
    role: auth.user!.role,
    action: "RECENT_WORK_DELETED",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname,
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  return NextResponse.json({
    status: 1,
    message: "Recent Work deleted successfully",
  });
}

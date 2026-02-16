import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { servingIndustryModel } from "@/models/servingIndustry.model";
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

/* ---------------- GET INDUSTRY BY ID ---------------- */
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    await testConnection();

    const { id } = await context.params;

    const industry = await servingIndustryModel.findByPk(Number(id), {
      attributes: { exclude: ["updatedAt"] },
    });

    if (!industry) {
      return NextResponse.json(
        { status: 0, message: "Industry not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      status: 1,
      data: industry,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  await testConnection();

  const { id } = await context.params;
  const auth = await verifyAdmin(request, "");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status },
    );
  }

  const industry = await servingIndustryModel.findByPk(Number(id));

  if (!industry) {
    return NextResponse.json(
      { status: 0, message: "Industry not found" },
      { status: 404 },
    );
  }

  const formData = await request.formData();
  // formData.forEach((i)=>console.log("i",i))
  const name = formData.get("name") as string;
  const activeValue = formData.get("active") ? true :false;
  const image = formData.get("image");

  let imgPath = industry.get("img") as string | null;

  // 🔥 Replace image if new uploaded
  if (image instanceof File && image.size > 0) {
    deleteImage(imgPath);
    imgPath = await saveImage(image, "industry");
  }

  await industry.update({
    name,
    img: imgPath,
    active:activeValue
  });

  await logsEntry({
    userId: auth.user!.id.toString(),
    email: auth.user!.email,
    role: auth.user!.role,
    action: "INDUSTRY_UPDATED",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname,
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  return NextResponse.json({
    status: 1,
    message: "Industry updated successfully",
  });
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  await testConnection();

  const { id } = await context.params;

  const auth = await verifyAdmin(request, "deleteIndustry");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status },
    );
  }

  const industry = await servingIndustryModel.findByPk(Number(id));

  if (!industry) {
    return NextResponse.json(
      { status: 0, message: "Industry not found" },
      { status: 404 },
    );
  }

  // 🔥 Delete image from disk
  deleteImage(industry.get("img") as string | null);

  await industry.destroy();

  await logsEntry({
    userId: auth.user!.id.toString(),
    email: auth.user!.email,
    role: auth.user!.role,
    action: "INDUSTRY_DELETED",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname,
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  return NextResponse.json({
    status: 1,
    message: "Industry deleted successfully",
  });
}
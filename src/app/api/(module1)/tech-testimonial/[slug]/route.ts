"use server";

import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { TechTestimonialModel } from "@/models/techSolTestimonial.model";
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


/* ---------------- GET TECH TESTIMONIAL BY SLUG ---------------- */
export async function GET_BY_SLUG(
  _req: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    await testConnection();
    const { slug } = await context.params;

    const testimonial = await TechTestimonialModel.findOne({ where: { slug } });

    if (!testimonial) {
      return NextResponse.json(
        { status: 0, message: "Tech Testimonial not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ status: 1, data: testimonial });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/* ---------------- UPDATE TECH TESTIMONIAL ---------------- */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    await testConnection();
    const { slug } = await context.params;
    const auth = await verifyAdmin(request, "updateTechTestimonial");
    if (!auth.valid)
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );

    const testimonial = await TechTestimonialModel.findOne({ where: { slug } });
    if (!testimonial)
      return NextResponse.json(
        { status: 0, message: "Tech Testimonial not found" },
        { status: 404 },
      );

    const formData = await request.formData();
    const iconFile = formData.get("icon") as File | null;
    const imageFile = formData.get("image") as File | null;

    let iconPath = testimonial.icon;
    let imagePath = testimonial.image;

    if (iconFile && iconFile.size > 0)
      iconPath = await saveImage(iconFile, "techTestimonials");
    if (imageFile && imageFile.size > 0) {
      deleteImage(testimonial.image);
      imagePath = await saveImage(imageFile, "techTestimonials");
    }

    const title = (formData.get("title") as string) || testimonial.title;
    const newSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    await testimonial.update({
      title,
      designation:
        (formData.get("designation") as string) || testimonial.designation,
      description:
        (formData.get("description") as string) || testimonial.description,
      rating: parseFloat(
        (formData.get("rating") as string) || testimonial.rating.toString(),
      ),
      categories: JSON.parse(
        (formData.get("categories") as string) ||
          JSON.stringify(testimonial.categories),
      ),
      icon: iconPath,
      image: imagePath,
      slug: newSlug,
      active:
        formData.get("active") === "true" || formData.get("active") === "1",
    });

    await logsEntry({
      userId: auth.user!.id.toString(),
      email: auth.user!.email,
      role: auth.user!.role,
      action: "TECH_TESTIMONIAL_UPDATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Tech Testimonial updated successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/* ---------------- DELETE TECH TESTIMONIAL ---------------- */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    await testConnection();
    const { slug } = await context.params;

    const auth = await verifyAdmin(request, "deleteTechTestimonial");
    if (!auth.valid)
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );

    const testimonial = await TechTestimonialModel.findOne({ where: { slug } });
    if (!testimonial)
      return NextResponse.json(
        { status: 0, message: "Tech Testimonial not found" },
        { status: 404 },
      );

    deleteImage(testimonial.icon);
    deleteImage(testimonial.image);
    await testimonial.destroy();

    await logsEntry({
      userId: auth.user!.id.toString(),
      email: auth.user!.email,
      role: auth.user!.role,
      action: "TECH_TESTIMONIAL_DELETED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Tech Testimonial deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

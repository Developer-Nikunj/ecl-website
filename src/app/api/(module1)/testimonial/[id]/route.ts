import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { testimonialModel } from "@/models/testimonial";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import { saveImage } from "@/utils/uploads/saveImage";
import z from "zod";

/**
 * GET Testimonial by ID
 */
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await testConnection();
  const { id } = await context.params;
  const testimonial = await testimonialModel.findByPk(Number(id), {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  if (!testimonial) {
    return NextResponse.json(
      { status: 0, message: "testimonial not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ status: 1, data: testimonial });
}

/**
 * UPDATE testimonial
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await testConnection();
  const { id } = await context.params;
  const auth = await verifyAdmin(request, "puttestimonial");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  const testimonial = await testimonialModel.findByPk(Number(id));
  if (!testimonial) {
    return NextResponse.json(
      { status: 0, message: "testimonial not found" },
      { status: 400 }
    );
  }

  const formData = await request.formData();
  const image = formData.get("img") as File | null;

  let imgPath = testimonial.img;

  if (image) {
    imgPath = await saveImage(image, "testimonial");
  }

  await testimonial.update({
    img: imgPath,
    name: formData.get("name"),
    description: formData.get("description"),
    active: formData.get("active") === "true",
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
    action: "TESTIMONIAL_UPDATED",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname,
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  return NextResponse.json({
    status: 1,
    message: "testimonial updated successfully",
    // data: testimonial,
  });
}

/**
 * DELETE testimonial
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await testConnection();
  const { id } = await context.params;
  const auth = await verifyAdmin(request, "deletetestimonial");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  const testimonial = await testimonialModel.findByPk(Number(id));
  if (!testimonial) {
    return NextResponse.json(
      { status: 0, message: "testimonial not found" },
      { status: 404 }
    );
  }

  await testimonial.destroy();

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
    action: "testimonial_DELETED",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname,
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  return NextResponse.json({
    status: 1,
    message: "testimonial deleted successfully",
  });
}

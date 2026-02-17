"use server";

import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { TechTestimonialModel } from "@/models/techSolTestimonial.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { saveImage } from "@/utils/uploads/saveImage";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import fs from "fs";
import path from "path";


/* ---------------- CREATE TECH TESTIMONIAL ---------------- */
export async function POST(request: NextRequest) {
  try {
    await testConnection();
    const auth = await verifyAdmin(request, "createTechTestimonial");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );
    }

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const designation = formData.get("designation") as string;
    const description = formData.get("description") as string;
    const rating = parseFloat((formData.get("rating") as string) || "0");
    const categories = JSON.parse(
      (formData.get("categories") as string) || "[]",
    );

    const iconFile = formData.get("icon") as File | null;
    const imageFile = formData.get("image") as File | null;

    if (!title || !designation || !iconFile || !imageFile) {
      return NextResponse.json(
        { message: "Title, designation, icon and image are required" },
        { status: 400 },
      );
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const iconPath = await saveImage(iconFile, "techTestimonials/icons");
    const imagePath = await saveImage(imageFile, "techTestimonials/images");

    const testimonial = await TechTestimonialModel.create({
      title,
      designation,
      slug,
      description,
      rating,
      categories,
      icon: iconPath,
      image: imagePath,
    });

    await logsEntry({
      userId: auth.user!.id.toString(),
      email: auth.user!.email,
      role: auth.user!.role,
      action: "TECH_TESTIMONIAL_CREATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 201,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Tech Testimonial created successfully",
      data: testimonial,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

/* ---------------- GET ALL TECH TESTIMONIALS ---------------- */
export async function GET(request: NextRequest) {
  try {
    await testConnection();
    const { searchParams } = new URL(request.url);
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;
    const active = searchParams.get("active");

    const where: any = {};
    if (active) where.active = active === "true";

    const { rows, count } = await TechTestimonialModel.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return NextResponse.json({
      status: 1,
      data: rows,
      meta: { limit, offset, total: count },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}



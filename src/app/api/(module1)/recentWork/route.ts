"use server";

import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { RecentWorksModel } from "@/models/recentWorks.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import { saveImage } from "@/utils/uploads/saveImage";
import "@/models";

/**
 * CREATE RECENT WORK
 */
export async function POST(request: NextRequest) {
  try {
    // ✅ Test DB connection
    await testConnection();

    // ✅ Verify admin authorization
    const auth = await verifyAdmin(request, "createRecentWork");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );
    }

    // ✅ Parse form data
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const categories = formData.get("categories") as string; // expect JSON stringified array
    const iconFile = formData.get("icon") as File | null;
    const imageFile = formData.get("image") as File | null;

    if (!title || !description || !categories) {
      return NextResponse.json(
        { message: "Title, description, and categories are required" },
        { status: 400 },
      );
    }

    // ✅ Upload icon and image if provided
    let iconPath: string | null = null;
    let imagePath: string | null = null;

    if (iconFile && iconFile.size > 0) {
      iconPath = await saveImage(iconFile, "recent-works/icons");
    }

    if (imageFile && imageFile.size > 0) {
      imagePath = await saveImage(imageFile, "recent-works/images");
    }

    // ✅ Parse categories array
    let categoriesArray: string[] = [];
    try {
      categoriesArray = JSON.parse(categories);
    } catch (err) {
      return NextResponse.json(
        { message: "Categories must be a valid JSON array" },
        { status: 400 },
      );
    }

    // ✅ Create RecentWork entry
    const recentWork = await RecentWorksModel.create({
      title,
      description,
      categories: categoriesArray,
      icon: iconPath,
      image: imagePath,
      active: true,
    });

    // ✅ Log action
    await logsEntry({
      userId: auth.user!.id.toString(),
      email: auth.user!.email,
      role: auth.user!.role,
      action: "RECENT_WORK_CREATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 201,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Recent Work created successfully",
      data: recentWork,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

import { Op } from "sequelize";

export async function GET(req: NextRequest) {
  try {
    await testConnection();

    const { searchParams } = new URL(req.url);

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const status = searchParams.get("status"); // active | inactive
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;

    const where: any = {};

    // 🔹 Date filter
    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else if (startDate) {
      where.createdAt = { [Op.gte]: new Date(startDate) };
    } else if (endDate) {
      where.createdAt = { [Op.lte]: new Date(endDate) };
    }

    // 🔹 Status filter
    if (status) {
      where.active = status === "active" ? true : false;
    }

    // 🔹 Fetch RecentWorks
    const { rows, count } = await RecentWorksModel.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return NextResponse.json({
      status: 1,
      data: rows,
      meta: {
        limit,
        offset,
        total: count,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
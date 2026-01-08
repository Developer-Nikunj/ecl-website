import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { bannerModel } from "@/models/banner.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { saveImage } from "@/utils/uploads/saveImage";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import "@/models";
import { Op } from "sequelize";

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
      // data: banner,
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

export async function GET(req: NextRequest) {
  await testConnection();

  const { searchParams } = new URL(req.url);

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const limit = Number(searchParams.get("limit")) || 10;
  const offset = Number(searchParams.get("offset")) || 0;

  const where: any = {};

  // Date filter
  if (startDate && endDate) {
    where.createdAt = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  } else if (startDate) {
    where.createdAt = {
      [Op.gte]: new Date(startDate),
    };
  } else if (endDate) {
    where.createdAt = {
      [Op.lte]: new Date(endDate),
    };
  }

  const banners = await bannerModel.findAll({
    where,
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  return NextResponse.json({
    status: 1,
    data: banners,
    meta: {
      limit,
      offset,
      count: banners.length,
    },
  });
}


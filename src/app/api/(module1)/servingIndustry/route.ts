import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { servingIndustryModel } from "@/models/servingIndustry.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import { saveImage } from "@/utils/uploads/saveImage";
import "@/models";

/**
 * CREATE SERVING INDUSTRY
 */
export async function POST(request: NextRequest) {
  try {
    await testConnection();

    // 🔐 Verify Admin Permission
    const auth = await verifyAdmin(request, "");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );
    }

    const formData = await request.formData();

    // 🔹 Extract fields
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const active = formData.get("active") === "true";

    const image = formData.get("image") as File | null;

    if (!name) {
      return NextResponse.json(
        { message: "Industry name is required" },
        { status: 400 },
      );
    }

    // 🧠 Prevent duplicate name
    const exists = await servingIndustryModel.findOne({
      where: { name },
    });

    if (exists) {
      return NextResponse.json(
        { message: "Industry already exists" },
        { status: 400 },
      );
    }

    // 🖼️ Upload image if provided
    let imagePath: string | null = null;
    if (image && image.size > 0) {
      imagePath = await saveImage(image, "serving-industry");
    }

    // ✅ Create record
    const industry = await servingIndustryModel.create({
      name,
      description,
      img: imagePath,
      active,
    });

    // 🧾 Logs Entry
    await logsEntry({
      userId: auth.user!.id.toString(),
      email: auth.user!.email,
      role: auth.user!.role,
      action: "SERVING_INDUSTRY_CREATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 201,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Serving Industry created successfully",
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

import { Op } from "sequelize";
import "@/models";

/**
 * GET ALL SERVING INDUSTRIES
 */
export async function GET(req: NextRequest) {
  try {
    await testConnection();

    const { searchParams } = new URL(req.url);

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const active = searchParams.get("active"); // true | false
    const search = searchParams.get("search"); // name search

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

    // 🔹 Active filter
    if (active !== null) {
      where.active = active === "true";
    }

    // 🔹 Search by name
    if (search) {
      where.name = {
        [Op.iLike]: `%${search}%`, // PostgreSQL
        // For MySQL use: [Op.like]
      };
    }

    const { rows, count } = await servingIndustryModel.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
      attributes:["id","name","img","active"]
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

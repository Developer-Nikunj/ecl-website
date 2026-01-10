import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { Service } from "@/models/seo.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { seoSchema } from "@/utils/validators/seoValidator";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import { Op } from "sequelize";
import "@/models";

/**
 * CREATE Service
 */
export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request, "createSeo");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const body = await request.json();
    const data = seoSchema.parse(body);

    const service = await Service.create(data);

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
      action: "SEO_CREATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 201,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Seo created successfully",
      data: service,
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
 * GET ALL Services (with search & pagination)
 */
export async function GET(request: NextRequest) {
  try {
    await testConnection();

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const whereCondition: any = {
      title: { [Op.like]: `%${search}%` },
    };

    // ✅ Date filter
    if (startDate && endDate) {
      whereCondition.createdAt = {
        [Op.between]: [
          new Date(`${startDate}T00:00:00.000Z`),
          new Date(`${endDate}T23:59:59.999Z`),
        ],
      };
    } else if (startDate) {
      whereCondition.createdAt = {
        [Op.gte]: new Date(`${startDate}T00:00:00.000Z`),
      };
    } else if (endDate) {
      whereCondition.createdAt = {
        [Op.lte]: new Date(`${endDate}T23:59:59.999Z`),
      };
    }

    const services = await Service.findAndCountAll({
      where: whereCondition,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    return NextResponse.json({
      status: 1,
      message: "Seos fetched successfully",
      data: services.rows,
      total: services.count,
      limit: limit,
      offset: offset,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


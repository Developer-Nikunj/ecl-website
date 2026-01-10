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

    const auth = await verifyAdmin(request, "createService");
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

    const services = await Service.findAndCountAll({
      where: {
        title: { [Op.like]: `%${search}%` },
      },
      limit,
      offset,
      order: [["createdAt", "DESC"]],
    });

    return NextResponse.json({
      status: 1,
      message: "Seos fetched successfully",
      data: services.rows,
      total: services.count,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

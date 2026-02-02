import { NextResponse, NextRequest } from "next/server";
import { testConnection } from "@/database/db";
import { ServiceCategory } from "@/models/serviceCategory.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import { Op } from "sequelize";

// ----------------- CREATE SERVICE CATEGORY----------

export async function POST(request: NextRequest) {
  try {
    await testConnection();
    const auth = await verifyAdmin(request, "");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );
    }
    const { name, description, active } = await request.json();

    if (!name) {
      return NextResponse.json(
        { status: 0, message: "Name is required!!" },
        { status: 400 },
      );
    }

    const newCategory = await ServiceCategory.create({
      name,
      description,
      active: active || true,
      deleted: false,
    });

    if (!newCategory) {
      return NextResponse.json(
        { status: 0, message: "Service Category creation failed" },
        { status: 400 },
      );
    }

    if (auth.user == null) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );
    }

    await logsEntry({
      userId: auth.user.id.toString(),
      email: auth.user.email,
      role: auth.user.role,
      action: "SERVICE_CATEGORY_CREATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname.toString(),
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      message: "Service Category Created successfully!!!",
    });
  } catch (error: any) {
    console.log("error", error.message);
    return NextResponse.json({
      status: 0,
      message: "Service Category Creation Failed",
    });
  }
}

// ------------------GET ALL SERVICE CATEGORY---------------

export async function GET(request: NextRequest) {
  try {
    await testConnection();

    const { searchParams } = new URL(request.url);

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;

    const where: any = { deleted: false };

    if (startDate && endDate) {
      where.createdAt = {
        [op.between]: [new Date(startDate), new Date(endDate)],
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

    const serviceCategories = await ServiceCategory.findAll({
      where,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
      attributes:["id","name","description","active"]
    });

    if (!serviceCategories) {
      return NextResponse.json(
        { status: 0, message: "Fetching Service Categories Failed!!!" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        status: 1,
        message: "Service Categories Fetched Successfully",
        data: serviceCategories,
      },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { status: 0, message: error.message },
      { status: 500 },
    );
  }
}

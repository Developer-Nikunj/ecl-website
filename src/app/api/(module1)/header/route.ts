// src/app/api/admin/header/route.ts
import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { headerModel } from "@/models/header.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { headerCreateSchema } from "@/utils/validators/headerValidator";
import { logsEntry } from "@/utils/logsEntry/logsEntry";

export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request, "postheader");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const body = headerCreateSchema.parse(await request.json());

    const exist = await headerModel.findOne({ where: { name: body.name } });
    if (exist) {
      return NextResponse.json({ status: 0, message: "Header already exists" });
    }

    const header = await headerModel.create(body);

    await logsEntry({
      userId: auth.user!.id.toString(),
      email: auth.user!.email,
      role: auth.user!.role,
      action: "HEADER_CREATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({ status: 1, data: header });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 0, message: "Internal Server Error" });
  }
}


import { Op } from "sequelize";

export async function GET(request: NextRequest) {
  try {
    await testConnection();

    const { searchParams } = new URL(request.url);

    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

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

    const headers = await headerModel.findAll({
      where,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    const total = await headerModel.count({ where });

    return NextResponse.json({
      status: 1,
      data: headers,
      meta: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


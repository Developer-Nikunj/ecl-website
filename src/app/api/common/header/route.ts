// src/app/api/admin/header/route.ts
import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { headerModel } from "@/models/header.model";



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
    } else {
        where.active=true;
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


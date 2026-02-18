"use server";

import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { RecentWorksModel } from "@/models/recentWorks.model";
import "@/models";
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
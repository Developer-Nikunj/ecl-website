import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { servingIndustryModel } from "@/models/servingIndustry.model";
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
      attributes:["id","name","img",]
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

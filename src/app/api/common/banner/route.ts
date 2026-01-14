import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { bannerModel } from "@/models/banner.model";
import "@/models";
import { Op } from "sequelize";



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

  if (startDate && endDate) {
    where.createdAt = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  } else if (startDate) {
    where.createdAt = { [Op.gte]: new Date(startDate) };
  } else if (endDate) {
    where.createdAt = { [Op.lte]: new Date(endDate) };
  } else {
    where.active = true;
  }

  const { rows, count } = await bannerModel.findAndCountAll({
    where,
    order: [["createdAt", "DESC"]],
    limit,
    offset,
    attributes:['id','img','name','description','active']
  });

  return NextResponse.json({
    status: 1,
    data: rows,
    meta: {
      limit,
      offset,
      total: count, // 🔥 REAL total from DB
    },
  });
}



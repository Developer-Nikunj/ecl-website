import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { testimonialModel } from "@/models/testimonial";
import z from "zod";
import { Op } from "sequelize";




/* ---------------- GET ALL ---------------- */

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
  } else {
    where.active = true;
  }

  const testimonials = await testimonialModel.findAll({
    where,
    order: [["createdAt", "DESC"]],
    limit,
    offset,
  });

  return NextResponse.json({
    status: 1,
    data: testimonials,
    meta: {
      limit,
      offset,
      count: testimonials.length,
    },
  });
}


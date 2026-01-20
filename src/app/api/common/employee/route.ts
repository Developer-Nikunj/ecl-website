import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { employeeModel } from "@/models/employee.model";
// import "@models";
import { Op, where } from "sequelize";

export async function GET(req: NextRequest) {
  await testConnection();

  const { searchParams } = new URL(req.url);

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const limit = Number(searchParams.get("limit")) || 6;
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
    where.Status = true;
  }
  const { rows, count } = await employeeModel.findAndCountAll({
    where,
    order: [["createdAt", "DESC"]],
    limit,
    offset,
    attributes: {
      exclude: ["id", "employeeEmail", "createdAt", "updatedAt", "Status"],
    },
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
}

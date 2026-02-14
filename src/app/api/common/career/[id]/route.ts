import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { JobModel } from "@/models/career.model";
import "@/models";
import { Op } from "sequelize";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: number }> },
) {
  await testConnection();

  const { id } = await context.params;
  const where: any = {
    id: id,
  };

  const data = await JobModel.findOne({
    where,
    attributes: {
      exclude: ["updatedAt"],
    },
  });

  return NextResponse.json({
    status: 1,
    data: data,
  });
}

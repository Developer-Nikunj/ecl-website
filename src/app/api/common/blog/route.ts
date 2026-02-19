import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { blogCategoryModel } from "@/models/blogCategory.model";
import { Blog } from "@/models/blog.model";
import { Op } from "sequelize";
import "@/models";
/**
 * GET ALL Blog Category
 */

export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const { searchParams } = new URL(request.url);

    const limit = Number(searchParams.get("limit")) || 16;
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
      where.active = true;
    }

    const footers = await blogCategoryModel.findAll({
      where,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
      attributes: ["id","name"],
    });

    const total = await blogCategoryModel.count({ where });

    return NextResponse.json({
      status: 1,
      data: footers,
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
export async function GET(request: NextRequest) {
  try {
    await testConnection();

    const { searchParams } = new URL(request.url);

    const limit = Number(searchParams.get("limit")) || 15;
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
      where.active = true;
      where.status = "published"
    }

    const footers = await Blog.findAll({
      where,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
      attributes:{
        exclude:["updatedAt","views","status","active"],
      },
    });

    const total = await Blog.count({ where });

    return NextResponse.json({
      status: 1,
      data: footers,
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

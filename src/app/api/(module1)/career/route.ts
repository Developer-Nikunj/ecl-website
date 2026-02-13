import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { JobModel } from "@/models/career.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import "@/models";
import { Op } from "sequelize";

/**
 * CREATE Job
 */
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

    const { title, type, category, salary, location, description } =
      await request.json();

    // Basic validation
    if (!title || !type || !category || !location) {
      return NextResponse.json(
        { status: 0, message: "Required fields are missing" },
        { status: 400 },
      );
    }

    const job = await JobModel.create({
      title,
      type,
      category,
      salary,
      location,
      description,
      active: true,
    });

    if (auth.user == null) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );
    }

    await logsEntry({
      userId: auth.user?.id.toString(),
      email: auth.user?.email,
      role: auth.user?.role,
      action: "JOB_CREATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 201,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Job created successfully",
      data:job,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}


export async function GET(req: NextRequest) {
  await testConnection();

  const { searchParams } = new URL(req.url);

  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");
  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const active = searchParams.get("active");
  const search = searchParams.get("search");

  const limit = Number(searchParams.get("limit")) || 10;
  const offset = Number(searchParams.get("offset")) || 0;

  const where: any = {};

  // 📅 Date filter
  if (startDate && endDate) {
    where.createdAt = {
      [Op.between]: [new Date(startDate), new Date(endDate)],
    };
  } else if (startDate) {
    where.createdAt = { [Op.gte]: new Date(startDate) };
  } else if (endDate) {
    where.createdAt = { [Op.lte]: new Date(endDate) };
  }

  // 📂 Category filter
  if (category) {
    where.category = category;
  }

  // 💼 Type filter
  if (type) {
    where.type = type;
  }

  // 🟢 Active filter
  if (active !== null) {
    where.active = active === "true";
  }

  // 🔎 Search by title
  if (search) {
    where.title = {
      [Op.like]: `%${search}%`,
    };
  }

  const { rows, count } = await JobModel.findAndCountAll({
    where,
    order: [["createdAt", "DESC"]],
    limit,
    offset,
    attributes:{
      exclude:["createdAt","updatedAt","description"]
    }
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

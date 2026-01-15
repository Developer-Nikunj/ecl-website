// app/api/contactForm/route.ts
import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { contactFormModel } from "@/models/contactForm.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";

export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const { name, email, phone, message, noteByAdmin, status } =
      await request.json();

    if (!name || !email) {
      return NextResponse.json({
        status: 0,
        message: "Name and Email are mandatory",
      });
    }

    const newEntry = await contactFormModel.create({
      name,
      email,
      phone,
      message,
      noteByAdmin,
      status,
    });

    return NextResponse.json({
      status: 1,
      message: "Contact form entry created successfully",
      data: newEntry,
    });
  } catch (error) {
    console.error("POST /contactForm error:", error);
    return NextResponse.json({ status: 0, message: "Internal server error" });
  }
}


import { Op } from "sequelize";

export async function GET(request: NextRequest) {
  try {
    await testConnection();

    // 👉 Read query params
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = (page - 1) * limit;

    const startDate = searchParams.get("startDate"); // yyyy-mm-dd
    const endDate = searchParams.get("endDate"); // yyyy-mm-dd

    // 👉 Date filter condition
    const whereCondition: any = {};

    if (startDate && endDate) {
      whereCondition.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    }

    // 👉 Fetch with pagination + filter
    const { rows, count } = await contactFormModel.findAndCountAll({
      where: whereCondition,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
    });

    return NextResponse.json({
      status: 1,
      data: rows,
      pagination: {
        totalRecords: count,
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        limit,
      },
    });
  } catch (error) {
    console.error("GET /contactForm error:", error);
    return NextResponse.json({
      status: 0,
      message: "Internal server error",
    });
  }
}


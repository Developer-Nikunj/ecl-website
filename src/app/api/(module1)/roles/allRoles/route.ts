import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { roleModel } from "@/models/role.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import { Op } from "sequelize";

export async function GET(request: NextRequest) {
  try {
    await testConnection();
    
    const auth = await verifyAdmin(request);
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }
    console.log("get all roles");
    const { searchParams } = request.nextUrl;

    const limit = Math.min(Number(searchParams.get("limit")) || 10, 100);
    const offset = Number(searchParams.get("offset")) || 0;

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: any = {};

    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);


    if (startDate && endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);

      where.createdAt = {
        [Op.between]: [new Date(startDate), end],
      };
    } else if (startDate) {
      where.createdAt = {
        [Op.gte]: new Date(startDate),
      };
    } else if (endDate) {
      where.createdAt = {
        [Op.lte]: new Date(endDate),
      };
    }

    const { rows, count } = await roleModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [["createdAt", "DESC"]],
      attributes: ["id", "name", "description", ["active", "status"]],
    });

    await logsEntry({
      userId: auth.user.id.toString(),
      email: auth.user.email,
      action: "ROLE_FETCHED_SUCCESS",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Roles fetched successfully",
      data: rows,
      meta: {
        total: count,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { status: 0, message: "Internal server Error" },
      { status: 500 }
    );
  }
}

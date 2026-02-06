
import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { ServiceCategory } from "@/models/serviceCategory.model";
import {CompanyService} from "@/models/CompanyService.model"
import { Op } from "sequelize";


// get service category
export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const { searchParams } = new URL(request.url);

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;

    const where: any = { deleted: false, active :true};

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
    }

    const companyServices = await ServiceCategory.findAll({
      where,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
      attributes: ["id", "name", "active"],
    });

    return NextResponse.json({
      status: 1,
      data: companyServices,
      meta: {
        limit,
        offset,
        count: companyServices.length,
      },
    });
  } catch (error: any) {
    console.log("error", error.message);
    return NextResponse.json({});
  }
}


// get service

export async function GET(request: NextRequest) {
  try {
    await testConnection();

    const { searchParams } = new URL(request.url);

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;

    const where: any = { deleted: false };

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
    }

    const companyServices = await CompanyService.findAll({
      where,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
      attributes: [
        "id",
        "name",
        "description",
        "image",
        "details",
        "otherDetails",
        "active"
      ],
    });

    return NextResponse.json({
      status: 1,
      data: companyServices,
      meta: {
        limit,
        offset,
        count: companyServices.length,
      },
    });
  } catch (error: any) {
    console.log("error", error.message);
    return NextResponse.json({});
  }
}
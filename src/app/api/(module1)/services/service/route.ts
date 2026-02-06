import { NextResponse, NextRequest } from "next/server";
import { testConnection } from "@/database/db";
import { CompanyService } from "@/models/CompanyService.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import { saveImage } from "@/utils/uploads/saveImage";
import { Op } from "sequelize";

//-----------------------------CREATE COMPANY SERVICE-------------------------

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
    const formData = await request.formData();

    const image = formData.get("image") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const active = formData.get("active") ;
    const details = formData.get("details") as string;
    const otherDetail = formData.get("category") as string;
    if (!image || !name) {
      return NextResponse.json(
        { status: 0, message: "Image and name are required" },
        { status: 400 },
      );
    }
    console.log("active", active);
    const imagePath = await saveImage(image, "company_services");

    const services = await CompanyService.create({
      image: imagePath,
      name,
      description,
      active:active=='true' ? true:false,
      details,
      otherDetail,
    });

    if (!services) {
      return NextResponse.json(
        { status: 0, message: "Services creation failed!!!" },
        { status: 400 },
      );
    }

    if (auth.user == null) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );
    }

    await logsEntry({
      userId: auth.user.id.toString(),
      email: auth.user.email,
      role: auth.user.role,
      action: "COMPANY_SERVICES_CREATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname.toString(),
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Services Created Successfully",
    });
  } catch (error: any) {
    console.log("error", error.message);
    return NextResponse.json(
      { status: 0, message: error.message },
      { status: 500 },
    );
  }
}

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

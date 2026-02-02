import { NextResponse, NextRequest } from "next/server";
import { testConnection } from "@/database/db";
import { CompanyService } from "@/models/CompanyService.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import { saveImage } from "@/utils/uploads/saveImage";
import { Op } from "sequelize";

import fs from "fs";
import path from "path";

function deleteImage(filePath: string | null) {
  if (!filePath) return;

  const absolutePath = path.join(process.cwd(), "public", filePath);

  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
}

// ----------------update company services----------------

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ serviceId: string }> },
) {
  try {
    await testConnection();
    const { serviceId } = await context.params;
    const auth = await verifyAdmin(request, "");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );
    }

    const service = await CompanyService.findOne({
      where: {
        id: serviceId,
      },
    });

    if (!service) {
      return NextResponse.json({ message: "Services Not Found!!!" });
    }
    console.log("service", service);
    const formData = await request.formData();

    const image = formData.get("img") as File;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const detail = formData.get("detail") as string;
    const otherDetail = formData.get("otherDetail") as string;
    const active = formData.get("active") === "true";

    let imgPath = service.image;

    if (image instanceof File && image.size > 0) {
      deleteImage(service.image);

      imgPath = await saveImage(image, "company_services");
    }
    const updatedService = await service.update({
      name: name,
      description: description,
      image: imgPath,
      detail: detail,
      otherDetail: otherDetail,
    });

    if (!updatedService) {
      return NextResponse.json(
        { status: 0, message: "Service updation Failed" },
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
      action: "SERVICES_UPDATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname.toString(),
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Service updated successfully",
    });
  } catch (error: any) {
    console.log("error", error.message);
     return NextResponse.json({
       status: 0,
       message: error.message,
     });
  }
}

// -----------------delete company service----------------------

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ serviceId: string }> },
) {
  try {
    await testConnection();
    const {serviceId} = await context.params;

    const auth = await verifyAdmin(request, "");

    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );
    }

    const service = await CompanyService.findOne({
      where: {
        id: serviceId,
      },
    });

    if (!service) {
      return NextResponse.json({ message: "Services Not Found!!!" });
    }
    await service.update({
      deleted: true,
    });

    return NextResponse.json(
      { message: "Deleted successfully", status: 1 },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, status: 0 },
      { status: 500 },
    );
  }
}

// -------------------get company service

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ serviceId: string }> },
) {
  try {
    await testConnection();
    const { serviceId } = await context.params;

    const auth = await verifyAdmin(request, "");

    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );
    }

    const service = await CompanyService.findOne({
      where: {
        id: serviceId,
      },
      attributes: [
        "id",
        "name",
        "description",
        "details",
        "image",
        "otherDetails",
        "active",
      ],
    });

    if (!service) {
      return NextResponse.json({ message: "Services Not Found!!!" });
    }

    return NextResponse.json(
      { message: "Fetched successfully", status: 1, data: service },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, status: 0 },
      { status: 500 },
    );
  }
}

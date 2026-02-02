import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { ServiceCategory } from "@/models/serviceCategory.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";

// ----------UPDATE SERVICE CATEGORY--------------

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ categoryId: string }> },
) {
  try {
    await testConnection();
    const { categoryId } = await context.params;
    const auth = await verifyAdmin(request, "");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );
    }

    const serviceCat = await ServiceCategory.findOne({
      where: {
        id: Number(categoryId),
      },
    });
    if (!serviceCat) {
      return NextResponse.json(
        { status: 0, message: "Service Category Not Found!!" },
        { status: 400 },
      );
    }

    const { name, description, active } = await request.json();
    const updatedServiceCat = await serviceCat.update({
      name: name,
      description: description,
      active: active,
    });

    if (!updatedServiceCat) {
      return NextResponse.json(
        { status: 0, message: "Service category Update failed" },
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
      userId: auth.user?.id.toString(),
      email: auth.user?.email,
      role: auth.user?.role,
      action: "SERVICE_CATEGORY_UPDATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });
    return NextResponse.json(
      { status: 1, message: "Service Category Updated successfully" },
      { status: 200 },
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, status: 0 },
      { status: 500 },
    );
  }
}

// ------------------DELETE SERVICE CATEGORY------------

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ categoryId: string }> },
) {
  try {
    await testConnection();
    const { categoryId } = await context.params;
    const auth = await verifyAdmin(request, "");

    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );
    }

    const serviceCategory = await ServiceCategory.findOne({
      where: {
        id: Number(categoryId),
      },
    });

    if (!serviceCategory) {
      return NextResponse.json(
        { status: 0, message: "Service Category Not Found!!!" },
        { status: 400 },
      );
    }

    await serviceCategory.update({
      deleted: true,
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
      action: "SERVICE_CATEGORY_DELETED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Service Category Deleted Successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message, status: 0 },
      { status: 500 },
    );
  }
}

// --------------------GET SERVICE CATEGORY--------------

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ categoryId: string }> },
) {
  try {
    await testConnection();
    const { categoryId } = await context.params;

    const auth = await verifyAdmin(request, "");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status },
      );
    }

    const serviceCategory = await ServiceCategory.findOne({
      where: {
        id: Number(categoryId),
      },
      attributes: ["id", "name", "description", "active"],
    });

    if (!serviceCategory) {
      return NextResponse.json({
        status: 0,
        message: "Service Category Fetching Failed!!",
      });
    }

    return NextResponse.json(
      {
        status: 1,
        message: "Service Category Fetched",
        data: serviceCategory,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log("error", error.message);
    return NextResponse.json(
      {
        status: 0,
        message: error.message,
      },
      { status: 500 },
    );
  }
}

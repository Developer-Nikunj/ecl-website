import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { Service } from "@/models/seo.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { seoSchema } from "@/utils/validators/seoValidator";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import "@/models";

/**
 * GET SINGLE Seo
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await testConnection();

    const { id } = await context.params;


    const service = await Service.findByPk(id);
    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 1, data: service });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * UPDATE Service
 */
import { Op } from "sequelize";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await testConnection();

    const { id } = await context.params;

    const auth = await verifyAdmin(request, "updateSeo");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const body = await request.json();
    const data = seoSchema.partial().parse(body);

    const service = await Service.findByPk(id);
    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 400 }
      );
    }

    // ✅ SLUG UNIQUENESS CHECK (THE MISSING PIECE)
    if (data.slug) {
      const slugExists = await Service.findOne({
        where: {
          slug: data.slug,
          id: { [Op.ne]: id }, // exclude current record
        },
      });

      if (slugExists) {
        return NextResponse.json(
          { message: "Slug already exists" },
          { status: 409 }
        );
      }
    }

    await service.update(data);

    return NextResponse.json({
      status: 1,
      message: "Service updated successfully",
      data: service,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


/**
 * DELETE Service
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await testConnection();

    const { id } = await context.params;

    const auth = await verifyAdmin(request, "deleteSeo");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const service = await Service.findByPk(id);
    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 404 }
      );
    }

    await service.destroy();

    if (auth.user == null) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    await logsEntry({
      userId: auth.user?.id.toString(),
      email: auth.user?.email,
      role: auth.user?.role,
      action: "SERVICE_DELETED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Service deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { Service } from "@/models/seo.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { seoSchema } from "@/utils/validators/seoValidator";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import "@/models";

import { saveImage } from "@/utils/uploads/saveImage";

import fs from "fs";
import path from "path";

function deleteImage(filePath: string | null) {
  if (!filePath) return;

  const absolutePath = path.join(process.cwd(), "public", filePath);

  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
}

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


    const service = await Service.findByPk(id);
    if (!service) {
      return NextResponse.json(
        { message: "Service not found" },
        { status: 400 }
      );
    }

    const formData = await request.formData();    
    const ogImageFile = formData.get("ogImage") as File | null;
    let ogImagePath = service?.ogImage;
    


    if (ogImageFile && ogImageFile.size > 0) {
      ogImagePath = await saveImage(ogImageFile, "seo");
      deleteImage(service.ogImage);
    }

    const statusRaw = formData.get("status");

    const status = statusRaw === null ? 1 : statusRaw === "true" ? 1 : 0;


    const payload = {
      slug: formData.get("slug"),
      pageUrl: formData.get("pageUrl"),
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      status: status,

      metaTitle: formData.get("metaTitle"),
      metaDescription: formData.get("metaDescription"),
      metaKeywords: formData.get("metaKeywords"),
      robots: formData.get("robots"),
      canonicalUrl: formData.get("canonicalUrl"),

      ogTitle: formData.get("ogTitle"),
      ogDescription: formData.get("ogDescription"),
      ogImage: ogImagePath,

      schema:
        formData.get("schema") ?? JSON.parse(formData.get("schema") as string),
    };
    // console.log("started-------------------------------------", payload);

    const data = seoSchema.partial().parse(payload);

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
        { status: 400 }
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

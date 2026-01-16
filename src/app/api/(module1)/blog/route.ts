import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { Blog } from "@/models/blog.model";
import { blogCategoryModel } from "@/models/blogCategory.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import { saveImage } from "@/utils/uploads/saveImage";
import "@/models";

/**
 * CREATE BLOG
 */
export async function POST(request: NextRequest) {
  try {
    await testConnection();
    const auth = await verifyAdmin(request, "createBlog");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const formData = await request.formData();

    // 🔹 Extract fields
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const excerpt = formData.get("excerpt") as string;
    const status = (formData.get("status") as string) || "draft";
    const categoryId = Number(formData.get("categoryId"));

    const image = formData.get("image") as File | null;
    console.log(image);

    if (!title || !content || !categoryId) {
      return NextResponse.json(
        { message: "Title, content and category are required" },
        { status: 400 }
      );
    }

    const slug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    let imagePath: string | null = null;
    if (image && image.size > 0) {
      imagePath = await saveImage(image, "blog");
    }

    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt,
      img: imagePath,
      status,
      categoryId,
    });

    await logsEntry({
      userId: auth.user!.id.toString(),
      email: auth.user!.email,
      role: auth.user!.role,
      action: "BLOG_CREATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 201,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

import { Op } from "sequelize";

/**
 * GET ALL BLOGS
 */
export async function GET(req: NextRequest) {
  try {
    await testConnection();

    const { searchParams } = new URL(req.url);

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    const status = searchParams.get("status"); // draft | published
    const categoryId = searchParams.get("categoryId");

    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;

    const where: any = {};

    // 🔹 Date filter
    if (startDate && endDate) {
      where.createdAt = {
        [Op.between]: [new Date(startDate), new Date(endDate)],
      };
    } else if (startDate) {
      where.createdAt = { [Op.gte]: new Date(startDate) };
    } else if (endDate) {
      where.createdAt = { [Op.lte]: new Date(endDate) };
    }

    // 🔹 Status filter
    if (status) {
      where.status = status;
    }

    // 🔹 Category filter
    if (categoryId) {
      where.categoryId = categoryId;
    }

    const { rows, count } = await Blog.findAndCountAll({
      where,
      order: [["createdAt", "DESC"]],
      limit,
      offset,
      include: {
        model: blogCategoryModel,
        as: "category",
        attributes: ["id", "name"],
      },
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
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

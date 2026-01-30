import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { blogCategoryModel } from "@/models/blogCategory.model";
import { Blog } from "@/models/blog.model";
import "@/models";

export async function GET(
  request: NextRequest,

  context: { params: Promise<{ slug: string }> },
) {
  try {
    await testConnection();
    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json({
        message: "Slug is Required!!!",
        status: false,
      });
    }

    const oneBlog = await Blog.findOne({
      where: {
        slug: slug,
      },
    });

    if (!oneBlog) {
      return NextResponse.json({
        message: "Blog Not Found!!",
        status: false,
      });
    }

    return NextResponse.json({
      message: "Blog Successfully Found!!!",
      status: true,
      data: oneBlog,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { blogCategoryModel } from "@/models/blogCategory.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";




/**
 * GET Blog category by ID
 */
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await testConnection();
  const { id } = await context.params;
  const banner = await blogCategoryModel.findByPk(Number(id), {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  if (!banner) {
    return NextResponse.json(
      { status: 0, message: "Blog Category not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ status: 1, data: banner });
}

/**
 * UPDATE Blog Category
 */
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  await testConnection();

  const { id } = await context.params;

  const auth = await verifyAdmin(request, "putblogcategory");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  
  
  const {name,description,active} = await request.json();
  
  await blogCategoryModel.update({name,description,active},{where:{id:id}});

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
    action: "BLOG_CATEGORY_UPDATED",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname,
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  return NextResponse.json({
    status: 1,
    message: "BLOG_CATEGORY updated successfully",
  });
}


export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await testConnection();
  const { id } = await context.params;
  const auth = await verifyAdmin(request, "deleteblogcategory");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  const banner = await blogCategoryModel.findByPk(Number(id));
  if (!banner) {
    return NextResponse.json(
      { status: 0, message: "blogCategory not found" },
      { status: 400 }
    );
  }

  await banner.destroy();

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
    action: "BLOG_CATEGORY_DELETED",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname,
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  return NextResponse.json({
    status: 1,
    message: "BLOG_CATEGORY deleted successfully",
  });
}

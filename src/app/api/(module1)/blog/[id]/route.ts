import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { Blog } from "@/models/blog.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { saveImage } from "@/utils/uploads/saveImage";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import fs from "fs";
import path from "path";

/* ---------------- IMAGE DELETE HELPER ---------------- */
function deleteImage(filePath: string | null) {
  if (!filePath) return;

  const absolutePath = path.join(process.cwd(), "public", filePath);
  if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
  }
}

/* ---------------- GET BLOG BY ID ---------------- */
export async function GET(
  _req: NextRequest,
  context: { params:Promise< { id: string }> }
) {
  await testConnection();
  const { id } = await context.params;
  const blog = await Blog.findByPk(Number(id), {
    attributes: { exclude: ["updatedAt"] },
  });

  if (!blog) {
    return NextResponse.json(
      { status: 0, message: "Blog not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ status: 1, data: blog });
}

/* ---------------- UPDATE BLOG ---------------- */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await testConnection();
const { id } = await context.params;
  const auth = await verifyAdmin(request, "putblog");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  const blog = await Blog.findByPk(Number(id));
  if (!blog) {
    return NextResponse.json(
      { status: 0, message: "Blog not found" },
      { status: 404 }
    );
  }

  const formData = await request.formData();
  const image = formData.get("image");

  console.log("image");

  let imgPath = blog.img;

  // 🔥 Replace image if new one uploaded
  if (image instanceof File && image.size > 0) {
    deleteImage(blog.img);
    imgPath = await saveImage(image, "blog");
  }

  const title = formData.get("title") as string;
  const slug = title
    ? title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    : blog.slug;

  await blog.update({
    img: imgPath,
    title,
    slug,
    content: formData.get("content"),
    excerpt: formData.get("excerpt"),
    status: formData.get("status"),
    active: formData.get("active") === "true" || formData.get("active") === "1",
    categoryId: Number(formData.get("categoryId")),
  });

  await logsEntry({
    userId: auth.user!.id.toString(),
    email: auth.user!.email,
    role: auth.user!.role,
    action: "BLOG_UPDATED",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname,
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  return NextResponse.json({
    status: 1,
    message: "Blog updated successfully",
  });
}
/* ---------------- DELETE BLOG ---------------- */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await testConnection();

  const { id } = await context.params;
  const auth = await verifyAdmin(request, "deleteblog");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  const blog = await Blog.findByPk(Number(id));
  if (!blog) {
    return NextResponse.json(
      { status: 0, message: "Blog not found" },
      { status: 404 }
    );
  }

  // 🔥 delete image from disk
  deleteImage(blog.img);

  await blog.destroy();

  await logsEntry({
    userId: auth.user!.id.toString(),
    email: auth.user!.email,
    role: auth.user!.role,
    action: "BLOG_DELETED",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname,
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  return NextResponse.json({
    status: 1,
    message: "Blog deleted successfully",
  });
}

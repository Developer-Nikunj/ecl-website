import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { Service } from "@/models/seo.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import { z } from "zod";

const seoSchema = z.object({
  id: z.number(),

  pageUrl: z
    .string()
    .min(1, "Page URL is required")
    .regex(/^\/.*/, "pageUrl must start with /")
    .optional(),

  title: z
    .string()
    .min(5, "Title is too short")
    .max(255, "Title too long")
    .optional(),

  description: z.string().min(10, "Description is too short").optional(),

  keywords: z.string().optional(),

  robots: z.enum(["index, follow", "noindex, nofollow"]).optional(),

  canonicalUrl: z.string().url("Invalid canonical URL").optional(),

  ogTitle: z.string().optional(),

  ogDescription: z.string().optional(),

  ogImage: z.string().url("Invalid OG image URL").optional(),

  schema: z.record(z.string(), z.any()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request, "updateSeo");

    if (!auth.valid) {
      return NextResponse.json({ message: auth.message }, { status: 401 });
    }
    const body = await request.json();
    const validatedData = seoSchema.parse(body);

    const updatedSeo = await Service.update(validatedData, {
      where: {
        id: validatedData.id,
      },
    });

    if (auth.user == null) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    await logsEntry({
      userId: auth.user.id.toString(),
      email: auth.user.email,
      role: auth.user.role,
      action: "SEO_UPDATED_SUCCESS",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname.toString(),
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    const response = NextResponse.json({
      status: 1,
      message: "Seo updated successfully",
      data: updatedSeo,
    });
    return response;
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

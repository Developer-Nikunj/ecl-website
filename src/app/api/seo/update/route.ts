import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { seoModel } from "@/models/seo.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { z } from "zod";

const seoSchema = z.object({
    id:z.number(),

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

  schema: z.record(z.any()).optional(),
});

export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin();

    if (!auth.valid) {
      return NextResponse.json({ message: auth.message }, { status: 401 });
    }
    const body = await request.json();
    const validatedData = seoSchema.parse(body);

    const updatedSeo = await seoModel.update(validatedData,{
        where:{
            id:validatedData.id,
        }
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

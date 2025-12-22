import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { seoModel } from "@/models/seo.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { z } from "zod";

const seoSchema = z.object({
  pageUrl: z
    .string()
    .min(1, "Page URL is required")
    .regex(/^\/.*/, "pageUrl must start with /")
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

    const createdSeo = await seoModel.findOne({
      where: {
        pageUrl: validatedData.pageUrl,
      },
    });    

    const response = NextResponse.json({
      status: 1,
      message: "Seo fetched successfully",
      data:createdSeo,
    });
    return response;
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

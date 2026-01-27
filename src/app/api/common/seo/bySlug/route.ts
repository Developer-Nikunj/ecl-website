import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { Service } from "@/models/seo.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { z } from "zod";

const seoSchema = z.object({
  slug: z
    .string()
    .min(1, "Page URL is required")
});

export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request,"getSeo");

    if (!auth.valid) {
      return NextResponse.json({ message: auth.message }, { status: 400});
    }
    const body = await request.json();
    const validatedData = seoSchema.parse(body);

    const fetchedSeo = await Service.findOne({
      where: {
        slug: validatedData.slug,
      },
      attributes:{
        exclude:["createdAt",'updatedAt'],
      }
    });    

    const response = NextResponse.json({
      status: 1,
      message: "Seo fetched successfully",
      data: fetchedSeo,
    });
    return response;
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

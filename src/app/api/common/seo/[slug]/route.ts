import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { Service } from "@/models/seo.model";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ slug: string }> },
) {
  try {
    await testConnection();

    const { slug } = await context.params;

    if (!slug) {
      return NextResponse.json({ message: "Slug is required", status: false });
    }

    const fetchedSeo = await Service.findOne({
      where: {
        slug: slug,
      },
      
    });

    if (!fetchedSeo) {
      NextResponse.json({
        message: "Fetching seo detail failed!",
        status: false,
      });
    }

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

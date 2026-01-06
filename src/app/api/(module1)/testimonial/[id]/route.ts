import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { testimonialModel } from "@/models/testimonial";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import z from "zod";


export async function GET(req: NextRequest) {
  try {
    await testConnection();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // ✅ GET BY ID
    if (id) {
      const testimonial = await testimonialModel.findByPk(Number(id));

      if (!testimonial) {
        return NextResponse.json({
          status: 0,
          message: "Testimonial not found",
        });
      }

      return NextResponse.json({
        status: 1,
        data: testimonial,
      });
    }

  } catch (error) {
    return NextResponse.json({
      status: 0,
      message: "Fetch failed",
    });
  }
}

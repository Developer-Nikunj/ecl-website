import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { Footer } from "@/models/footer.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { footerSchema } from "@/utils/validators/footerValidator";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import "@/models";

/**
 * CREATE Footer
 */
export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request, "postfooter");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const body = await request.json();
    const data = footerSchema.parse(body);

    const footer = await Footer.create({
      name: data.name,
      active: data.active ?? true,
    });

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
      action: "FOOTER_CREATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 201,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Footer created successfully",
      data: footer,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * GET ALL Footers
 */

export async function GET(request: NextRequest) {
  try {
    await testConnection();

    const { searchParams } = new URL(request.url);

    const limit = Number(searchParams.get("limit")) || 10;
    const offset = Number(searchParams.get("offset")) || 0;

    const footers = await Footer.findAll({
      order: [["createdAt", "DESC"]],
      limit,
      offset,
      attributes: ["id", "name", "active"],
    });

    const total = await Footer.count();

    return NextResponse.json({
      status: 1,
      data: footers,
      meta: {
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}


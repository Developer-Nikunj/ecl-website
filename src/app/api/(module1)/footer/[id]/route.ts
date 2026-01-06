import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { Footer } from "@/models/footer.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { footerSchema } from "@/utils/validators/footerValidator";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import "@/models";

/**
 * GET Footer by ID
 */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await testConnection();
    const { id } = await context.params;

    const footer = await Footer.findByPk(Number(id),{attributes:["id","name","active"]});


    if (!footer) {
      return NextResponse.json(
        { status: 0, message: "Footer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ status: 1, data: footer });
  } catch {
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * UPDATE Footer
 */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await testConnection();
    const { id } = await context.params;
    const auth = await verifyAdmin(request, "putfooter");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const body = await request.json();
    const data = footerSchema.parse(body);

    const footer = await Footer.findByPk(Number(id));
    if (!footer) {
      return NextResponse.json(
        { status: 0, message: "Footer not found" },
        { status: 404 }
      );
    }

    await footer.update(data);

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
      action: "FOOTER_UPDATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Footer updated successfully",
      data: footer,
    });
  } catch {
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * DELETE Footer
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await testConnection();
    const { id } = await context.params;
    const auth = await verifyAdmin(request, "deletefooter");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const footer = await Footer.findByPk(Number(id));
    if (!footer) {
      return NextResponse.json(
        { status: 0, message: "Footer not found" },
        { status: 404 }
      );
    }

    await footer.destroy();

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
      action: "FOOTER_DELETED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Footer deleted successfully",
    });
  } catch {
    return NextResponse.json(
      { status: 0, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

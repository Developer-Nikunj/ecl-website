import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { headerModel } from "@/models/header.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import z from "zod";
import { logsEntry } from "@/utils/logsEntry/logsEntry";

/* ---------------- VALIDATION ---------------- */

const updateSchema = z.object({
  name: z.string().min(1).optional(),
  active: z.boolean().optional(),
});

/* ---------------- GET BY ID ---------------- */
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await testConnection();
    const { id } = await context.params;
    const header = await headerModel.findByPk(Number(id), {
      attributes: ["id", "name", "active"],
    });
    if (!header) {
      return NextResponse.json({
        status: 0,
        message: "Header not found",
      });
    }

    return NextResponse.json({
      status: 1,
      data: header,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 0,
      message: "Internal Server Error",
    });
  }
}

/* ---------------- UPDATE ---------------- */
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await testConnection();
    const { id } = await context.params;
    const auth = await verifyAdmin(request, "putheader");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const body = updateSchema.parse(await request.json());

    const header = await headerModel.findByPk(Number(id));
    if (!header) {
      return NextResponse.json({
        status: 0,
        message: "Header not found",
      });
    }

    await header.update(body);

    await logsEntry({
      userId: auth.user!.id.toString(),
      email: auth.user!.email,
      role: auth.user!.role,
      action: "HEADER_UPDATED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Header updated successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 0,
      message: "Internal Server Error",
    });
  }
}

/* ---------------- DELETE ---------------- */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await testConnection();
const { id } = await context.params;
    const auth = await verifyAdmin(request, "deleteheader");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const header = await headerModel.findByPk(Number(id));
    if (!header) {
      return NextResponse.json({
        status: 0,
        message: "Header not found",
      });
    }

    await header.destroy();

    await logsEntry({
      userId: auth.user!.id.toString(),
      email: auth.user!.email,
      role: auth.user!.role,
      action: "HEADER_DELETED",
      ipAddress: request.headers.get("x-forwarded-for") || "unknown",
      requestMethod: request.method,
      endPoint: request.nextUrl.pathname,
      status: 200,
      userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
      status: 1,
      message: "Header deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      status: 0,
      message: "Internal Server Error",
    });
  }
}

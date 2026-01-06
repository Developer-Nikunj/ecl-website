import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { testimonialModel } from "@/models/testimonial";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import z from "zod";

/* ---------------- VALIDATION ---------------- */

const createSchema = z.object({
  img: z.string(),
  name: z.string(),
  description: z.string(),
  active: z.boolean().optional(),
});

const updateSchema = z.object({
  id: z.number(),
  img: z.string().optional(),
  name: z.string().optional(),
  description: z.string().optional(),
  active: z.boolean().optional(),
});

/* ---------------- CREATE ---------------- */

export async function POST(req: NextRequest) {
  try {
    await testConnection();
    const auth = await verifyAdmin(req, "posttestimonial");
    if (!auth.valid)
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );

    const body = createSchema.parse(await req.json());

    const data = await testimonialModel.create(body);

    await logsEntry({
      userId: auth.user?.id.toString(),
      email: auth.user?.email,
      role: auth.user?.role,
      action: "TESTIMONIAL_CREATED",
      requestMethod: req.method,
      endPoint: req.nextUrl.pathname,
      status: 200,
    });

    return NextResponse.json({ status: 1, data });
  } catch (e) {
    return NextResponse.json({ status: 0, message: "Create failed" });
  }
}

/* ---------------- GET ALL ---------------- */

export async function GET() {
  try {
    await testConnection();
    const data = await testimonialModel.findAll({
      order: [["id", "DESC"]],
    });

    return NextResponse.json({ status: 1, data });
  } catch {
    return NextResponse.json({ status: 0, message: "Fetch failed" });
  }
}

/* ---------------- UPDATE ---------------- */

export async function PUT(req: NextRequest) {
  try {
    await testConnection();
    const auth = await verifyAdmin(req, "puttestimonial");
    if (!auth.valid)
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );

    const body = updateSchema.parse(await req.json());

    const testimonial = await testimonialModel.findByPk(body.id);
    if (!testimonial)
      return NextResponse.json({ status: 0, message: "Not found" });

    await testimonial.update(body);

    return NextResponse.json({ status: 1, message: "Updated successfully" });
  } catch {
    return NextResponse.json({ status: 0, message: "Update failed" });
  }
}

/* ---------------- DELETE ---------------- */

export async function DELETE(req: NextRequest) {
  try {
    await testConnection();
    const auth = await verifyAdmin(req, "deletetestimonial");
    if (!auth.valid)
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );

    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));

    if (!id) return NextResponse.json({ status: 0, message: "ID required" });

    const testimonial = await testimonialModel.findByPk(id);
    if (!testimonial)
      return NextResponse.json({ status: 0, message: "Not found" });

    await testimonial.destroy();

    return NextResponse.json({ status: 1, message: "Deleted successfully" });
  } catch {
    return NextResponse.json({ status: 0, message: "Delete failed" });
  }
}

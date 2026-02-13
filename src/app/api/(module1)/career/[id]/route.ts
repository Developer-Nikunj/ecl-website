import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { JobModel } from "@/models/career.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import "@/models";

/**
 * GET Job by ID
 */
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  await testConnection();

  const { id } = await context.params;

  const job = await JobModel.findByPk(Number(id), {
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });

  if (!job) {
    return NextResponse.json(
      { status: 0, message: "Job not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({ status: 1, data: job });
}


/**
 * UPDATE Job
 */
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  await testConnection();

  const { id } = await context.params;

  const auth = await verifyAdmin(request, "");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  const {
    title,
    type,
    category,
    salary,
    location,
    description,
    active,
  } = await request.json();

  await JobModel.update(
    {
      title,
      type,
      category,
      salary,
      location,
      description,
      active,
    },
    { where: { id:id } },
    
  );
  const job = await JobModel.findOne({where:{id}});

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
    action: "JOB_UPDATED",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname,
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  return NextResponse.json({
    status: 1,
    message: "JOB updated successfully",
    data:job
  });
}


/**
 * DELETE Job
 */
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await testConnection();

  const { id } = await context.params;

  const auth = await verifyAdmin(request, "");
  if (!auth.valid) {
    return NextResponse.json(
      { message: auth.message },
      { status: auth.status }
    );
  }

  const job = await JobModel.findByPk(Number(id));

  if (!job) {
    return NextResponse.json(
      { status: 0, message: "Job not found" },
      { status: 400 }
    );
  }

  await job.destroy();

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
    action: "JOB_DELETED",
    ipAddress: request.headers.get("x-forwarded-for") || "unknown",
    requestMethod: request.method,
    endPoint: request.nextUrl.pathname,
    status: 200,
    userAgent: request.headers.get("user-agent") || "unknown",
  });

  return NextResponse.json({
    status: 1,
    message: "JOB deleted successfully",
  });
}

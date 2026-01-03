import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { roleModel } from "@/models/role.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request,"getrole");
    if (!auth.valid) {
      return NextResponse.json({ message: auth.message }, { status: 400 });
    }

    const { id } = await context.params; 
    if (!id) {
      return NextResponse.json(
        { status: 0, message: "Role id is required" },
        { status: 400 }
      );
    }

    const data = await roleModel.findOne({
      where: { id: parseInt(id, 10) }, // convert string → number
      attributes:['id','name','description',['active','status']]
    });

    if (!data) {
      return NextResponse.json(
        { status: 0, message: `Role with id ${id} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: 1,
      message: "Role fetched successfully",
      data,
    });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { status: 0, message: "Internal server error" },
      { status: 500 }
    );
  }
}

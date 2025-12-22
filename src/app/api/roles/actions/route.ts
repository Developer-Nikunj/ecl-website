import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { roleModel } from "@/models/role.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";

export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin();

    if (!auth.valid) {
      return NextResponse.json({ message: auth.message }, { status: 401 });
    }
    
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

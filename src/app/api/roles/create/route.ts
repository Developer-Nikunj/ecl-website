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

    const { name,description } = await request.json();
    if (!name) {
      return NextResponse.json({
        status: 0,
        message: "Name is mandatory",
      });
    }

    const existrole = await roleModel.findOne({
      where: {
        name: name,
      },
      attributes: [
        "id",
        "name",
        "description",
        "active"
      ],
    });

    if (existrole) {
      return NextResponse.json({
        status: 0,
        message: `Role ${name} already exists`,
      });
    }

    const data = await roleModel.create({
        name,description
    })

    if (!data) {
      return NextResponse.json({
        status: 0,
        message: `Role ${name} creation failed`,
      });
    }


    const response = NextResponse.json({
      status: 1,
      message: "Role created successfully",
    });
    return response;
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

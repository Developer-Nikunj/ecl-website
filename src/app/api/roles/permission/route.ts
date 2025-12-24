import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { permissionModel } from "@/models/permission.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import z from "zod";

const validateInput = z.object({
  userId: z.number(), // userId
  menu: z.number(), // userId
  permission: z.boolean(),
});


export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request);

    if (!auth.valid) {
      return NextResponse.json({ message: auth.message }, { status: auth.status });
    }

    const body = await request.json();
    const validateData = validateInput.parse(body);

    

    const addActionToUser = await permissionModel.create(validateData);

    if(!addActionToUser){
      return NextResponse.json({status:0,message:"adding action to user failed"});
    }

    return NextResponse.json({status:1,message:'actions added to user successfully'}) ;
    
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

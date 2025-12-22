import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { roleModel } from "@/models/role.model";
import {userModel} from "@/models/user.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import z from "zod";

const validateInput = z.object({
  id:z.number(), // userId
  actions : z.array(z.string()),
})


// add actions that a role can do , like if it a operator, cant access role , add in user model
export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin();

    if (!auth.valid) {
      return NextResponse.json({ message: auth.message }, { status: 401 });
    }

    const body = await request.json();
    const validateData = validateInput.parse(body);

    const addActionToUser = await userModel.update(validateData,{
      where:{
        id:validateData.id,
      }
    })

    if(!addActionToUser){
      return NextResponse.json({status:0,message:"adding action to user failed"});
    }

    return NextResponse.json({status:1,message:'actions added to user successfully'}) ;
    
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ status: 0, message: "Internal server Error" });
  }
}

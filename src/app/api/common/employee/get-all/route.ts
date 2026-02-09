import { NextResponse,NextRequest } from "next/server";
import { testConnection } from "@/database/db";
import { employeeModel } from "@/models/employee.model";


export async function GET(request:NextResponse){
    try {
        await testConnection();

        const data = await employeeModel.findAll({
            where:{
                Status:true,
            },
            attributes:{
                exclude:["active","createdAt","updatedAt"]
            }
        });

        if(!data){
            return NextResponse.json({message:"Data Not Found for Employees",status:0},{status:400});
        }

        return NextResponse.json({message:"Data fetched successfully",status:1,data:data},{status:200});
    } catch (error:any) {
        console.log("error",error.message);
        return NextResponse.json({message:"Internal Server Error",status:0},{status:500});
    }
}
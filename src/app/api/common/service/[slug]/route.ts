import { NextRequest, NextResponse } from 'next/server';
import { CompanyService } from '@/models/CompanyService.model';
import { testConnection } from "@/database/db";


export async function GET(request:NextRequest,context:{params:Promise<{slug:string}>}){
    try {
        const slug = await context.params;
        console.log("slug", slug);
        await testConnection();

        const data = await CompanyService.findOne({
          where: {
            slug: slug.slug,
          },
          attributes: {
            exclude: ["deleted","createdAt","updatedAt"],
          },
        });
        // console.log("data",data);
        if(!data){
            return NextResponse.json({status:0,message:`NO Data found for this slug ${slug}`});
        }

        return NextResponse.json({status:1,message:"Data found successfully",data:data});
    } catch (error:any) {
        console.log("error",error.message)
        return NextResponse.json({
          status: 0,
          message: "Data Not found",
        },{status:500});
    }
}
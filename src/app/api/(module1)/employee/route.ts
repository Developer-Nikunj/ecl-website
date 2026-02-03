import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { employeeModel } from "@/models/employee.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { saveImage } from "@/utils/uploads/saveImage";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
// import "@models";
import { Op, where } from "sequelize";
import EmployeeTable from "@/components/admin/Employee/EmployeeTable";


export async function POST(request: NextRequest) {
    try {
        await testConnection();

        const auth = await verifyAdmin(request, "");

        if (!auth.valid) {
            return NextResponse.json(
                { message: auth.message },
                { status: auth.status }

            );
        }
    
    const formData = await request.formData();

     const employeeName = formData.get("employeeName");
     const employeeEmail = formData.get("employeeEmail");
     const Designation = formData.get("Designation");
     const Experience = formData.get("experience");
     const Rating = formData.get("Rating");
     const employeeImg = formData.get("employeeImg") as File;
     const Status = formData.get("status") ? true :false;

      if (!employeeName || !employeeEmail) {
        return NextResponse.json(
            { status: 0, message: "EmplyeeName and EmployeeEmail are required"},
            { status: 400 }
        );
    }
        const imagePath = await saveImage(employeeImg, "employee");

        const employee = await employeeModel.create({
            employeeName,
            employeeEmail,
            Designation,
            Experience,
            Rating,
            employeeImg: imagePath,
            Status,

        });
        
        
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
            action: "EMPLOYEE_CREATED",
            ipAddress: request.headers.get("x-forwarded-for") || "unknown",
            requestMethod: request.method,
            endPoint: request.nextUrl.pathname,
            status: 201,
            userAgent: request.headers.get("user-agent") || "unknown",
        });

        return NextResponse.json({
            status: 1,
            message: "Employee created successfully",
            data: employee,

        });

     } catch (error) {
        console.error(error);
        return NextResponse.json(
            {status: 0, message: "Internal Server Error"},
            { status: 500 }

        );
     }
    }


    
    export async function GET(req: NextRequest) {
        console.log("Fetching employees...");
         await testConnection();

         const { searchParams } = new URL(req.url);

        const startDate = searchParams.get("startDate");
         const endDate = searchParams.get("endDate");
         const limit = Number(searchParams.get("limit")) || 10;
         const offset = Number(searchParams.get("offset"))|| 0;

        const where: any = {};

         if (startDate && endDate) {
         where.createdAt = {
                 [Op.between]: [new Date(startDate), new Date(endDate)],
            };
         } else if (startDate) {
             where.createdAt = { [Op.gte]: new Date(startDate) };

         }else if (endDate) {
            where.createdAt = { [Op.lte]: new Date(endDate) };
         }
         const { rows, count} = await employeeModel.findAndCountAll({
            where,
            order: [["createdAt", "DESC"]],
            limit,
            offset,
        });

        return NextResponse.json({
            status: 1,
             data: rows,
             meta: {
                 limit,
                 offset,
                 total: count,
             },
        });
    }

    
import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { employeeModel } from "@/models/employee.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";
import { saveImage } from "@/utils/uploads/saveImage";
import { logsEntry } from "@/utils/logsEntry/logsEntry";
import fs from "fs";
import path from "path";
import { request } from "https";

function deleteImage(filePath: string | null) {

    if (!filePath) return;
    const absolutePath = path.join(process.cwd(), "public", filePath);

if (fs.existsSync(absolutePath)) {
    fs.unlinkSync(absolutePath);
}
}

export async function GET(
    _req: NextRequest,  
    context: { params: Promise<{ id: string }> }
) {
    await testConnection();
    const { id } =  await context.params;
    const employee = await employeeModel.findByPk(Number(id), { });

    if (!employee) {
        return NextResponse.json({ error: "Employee not found" }, { status: 404 });
    }
    return NextResponse.json({ status: 1, data: employee });
}

export async function PUT(
    request: NextRequest,
    context: { params: { id: string } }
) {
    await testConnection();
    const { id } = await context.params;
    const auth = await verifyAdmin(request, "putemployee");
    if (!auth.valid) {
        return NextResponse.json(
            { message: auth.message },
            { status: auth.status }
        );
    }
    
    const employee = await employeeModel.findByPk(Number(id));
    if (!employee) {
        return NextResponse.json({ error: "Employee not found" }, 
            { status: 404 }
        );
    }
    const formData = await request.formData();
    const imageFile = formData.get("employeeImg") as File;
    let imagePath = employee.img;
    if (image instanceof File && imageFile.size > 0) {
        deleteImage(employee.img);
        imagePath = await saveImage(imageFile, "employee");

    }

    await employee.update({
        employeeName: formData.get("employeeNmae"),
        employeeEmail: formData.get("employeeEmail"),
        Designation: formData.get("Designation"),
        Experience: formData.get("Experience"),
        Rating: formData.get("Rating"),
        employeeImg: imagePath,
        Status: formData.get("Status") === "true",
    });

    if (auth.user == null) {
        return NextResponse.json(
            { message: auth.message },
            { status: auth.status }
        );
    }

    await logsEntry ({
        userId: auth.user?.id.toString(),
        email: auth.user?.email,
        role: auth.user?.role,
        action: "EMPLOYEE_UPDATED",
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        requestMethod: request.method,
        endPoint: request.nextUrl.pathname,
        status: 200,
        userAgent: request.headers.get("user-agent") || "unknown",

     
    });

    return NextResponse.json({
        status: 1,
        message: "Employee updated successfully",
    });
}


export async function DELETE(
    request: NextRequest,
    context: { params: Promise<{ id: string }> }
){
    await testConnection();
    const { id } = await context.params;
    const auth = await verifyAdmin (request, "deleteemployee");
    if (!auth.valid) {
        return NextResponse.json(
            { message: auth.message },
            { status: auth.status }

        );
}
    const employee = await employeeModel.findByPk(Number(id));
    if (!employee) {
        return NextResponse.json(
            { status: 0, message: "Employee not found" },
            { status: 404 }
        );
    }

    await employee.destroy();

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
        action: "EMPLOYEE_DELETED",
        ipAddress: request.headers.get("x-forwarded-for") || "unknown",
        requestMethod: request.method,
        endPoint: request.nextUrl.pathname,
        status: 200,
        userAgent: request.headers.get("user-agent") || "unknown",
    });

    return NextResponse.json({
        status: 1,
        message: "Employee deleted successfully",
    });
    }
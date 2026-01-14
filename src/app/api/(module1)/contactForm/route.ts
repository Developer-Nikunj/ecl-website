// app/api/contactForm/route.ts
import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { contactFormModel } from "@/models/contactForm.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";

export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const { name, email, phone, message, noteByAdmin, status } =
      await request.json();

    if (!name || !email) {
      return NextResponse.json({
        status: 0,
        message: "Name and Email are mandatory",
      });
    }

    const newEntry = await contactFormModel.create({
      name,
      email,
      phone,
      message,
      noteByAdmin,
      status,
    });

    return NextResponse.json({
      status: 1,
      message: "Contact form entry created successfully",
      data: newEntry,
    });
  } catch (error) {
    console.error("POST /contactForm error:", error);
    return NextResponse.json({ status: 0, message: "Internal server error" });
  }
}


export async function GET(request: NextRequest) {
  try {
    await testConnection();

    const entries = await contactFormModel.findAll({
      order: [["createdAt", "DESC"]],
    });

    return NextResponse.json({
      status: 1,
      data: entries,
    });
  } catch (error) {
    console.error("GET /contactForm error:", error);
    return NextResponse.json({ status: 0, message: "Internal server error" });
  }
}

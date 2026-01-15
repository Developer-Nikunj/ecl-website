
import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { contactFormModel } from "@/models/contactForm.model";

export async function POST(request: NextRequest) {
  try {
    await testConnection();

    const { name, email, phone, message} =
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
      noteByAdmin:"",
      status:'Pending',
    });

    return NextResponse.json({
      status: 1,
      message: "Contact form entry created successfully",
      // data: newEntry,
    });
  } catch (error) {
    console.error("POST /contactForm error:", error);
    return NextResponse.json({ status: 0, message: "Internal server error" });
  }
}
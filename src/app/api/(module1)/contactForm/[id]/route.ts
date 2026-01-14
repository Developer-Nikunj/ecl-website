import { NextRequest, NextResponse } from "next/server";
import { testConnection } from "@/database/db";
import { contactFormModel } from "@/models/contactForm.model";
import { verifyAdmin } from "@/utils/authorizations/validateToken";


export async function PUT(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request, "contactFormUpdate");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const { id, name, email, phone, message, noteByAdmin, status } =
      await request.json();

    if (!id) {
      return NextResponse.json({ status: 0, message: "ID is required" });
    }

    const entry = await contactFormModel.findByPk(id);
    if (!entry) {
      return NextResponse.json({ status: 0, message: "Entry not found" });
    }

    await entry.update({ name, email, phone, message, noteByAdmin, status });

    return NextResponse.json({
      status: 1,
      message: "Contact form entry updated successfully",
      data: entry,
    });
  } catch (error) {
    console.error("PUT /contactForm error:", error);
    return NextResponse.json({ status: 0, message: "Internal server error" });
  }
}


export async function DELETE(request: NextRequest) {
  try {
    await testConnection();

    const auth = await verifyAdmin(request, "contactFormDelete");
    if (!auth.valid) {
      return NextResponse.json(
        { message: auth.message },
        { status: auth.status }
      );
    }

    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ status: 0, message: "ID is required" });
    }

    const entry = await contactFormModel.findByPk(id);
    if (!entry) {
      return NextResponse.json({ status: 0, message: "Entry not found" });
    }

    await entry.destroy();

    return NextResponse.json({
      status: 1,
      message: "Contact form entry deleted successfully",
    });
  } catch (error) {
    console.error("DELETE /contactForm error:", error);
    return NextResponse.json({ status: 0, message: "Internal server error" });
  }
}

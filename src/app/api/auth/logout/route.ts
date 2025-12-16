"use server";

import { NextResponse } from "next/server";

export async function POST() {
  try {
    const response = NextResponse.json({
      status: 1,
      message: "Logout successfully",
    });

    // Clear the token cookie
    response.cookies.set({
      name: "token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0, // Immediately expire the cookie
    });

    return response;
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json({ status: 0, message: "Internal server error" });
  }
}

// Optional: GET method for logout if needed
export async function GET() {
  try {
    const response = NextResponse.json({
      status: 1,
      message: "Logout successfully",
    });

    response.cookies.set({
      name: "token",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("Logout Error:", error);
    return NextResponse.json({ status: 0, message: "Internal server error" });
  }
}

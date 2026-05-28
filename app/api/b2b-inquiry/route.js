import { NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["name", "company", "email", "volume"];
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === "") {
        return NextResponse.json(
          { success: false, message: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    // If requesting sample, shipping address is required
    if (body.requestSample && (!body.shippingAddress || body.shippingAddress.trim() === "")) {
      return NextResponse.json(
        { success: false, message: "Shipping address is required when requesting a sample" },
        { status: 400 }
      );
    }

    // Save the inquiry to Firestore
    await db.collection("inquiries").add({
      name: body.name,
      company: body.company,
      email: body.email,
      volume: body.volume,
      message: body.message || "",
      requestSample: body.requestSample || false,
      shippingAddress: body.requestSample ? body.shippingAddress : null,
      createdAt: new Date().toISOString(),
      status: "new", // Default status for admin dashboard
    });

    return NextResponse.json(
      {
        success: true,
        message: "Inquiry received successfully. Our team will contact you within 24-48 hours.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("B2B Inquiry Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

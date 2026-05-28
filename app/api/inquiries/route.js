import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["name", "company", "email", "message"];
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

    // Save the unified inquiry to Firestore (collection: inquiries)
    const db = getDb();
    await db.collection("inquiries").add({
      name: body.name,
      company: body.company,
      email: body.email,
      subject: body.subject || "General Inquiry",
      message: body.message,
      requestSample: body.requestSample || false,
      shippingAddress: body.requestSample ? body.shippingAddress : null,
      // Quotation-specific fields (optional, from product detail pages)
      productName: body.productName || null,
      productSku: body.productSku || null,
      approxOrderQuantity: body.approxOrderQuantity || null,
      createdAt: new Date().toISOString(),
      status: "new", // Default status for admin dashboard
    });

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been successfully submitted.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unified Inquiry Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

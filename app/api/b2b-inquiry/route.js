import { NextResponse } from "next/server";

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

    // Log the inquiry (placeholder for future admin dashboard integration)
    console.log("═══════════════════════════════════════");
    console.log("NEW B2B INQUIRY RECEIVED");
    console.log("═══════════════════════════════════════");
    console.log("Name:", body.name);
    console.log("Company:", body.company);
    console.log("Email:", body.email);
    console.log("Volume:", body.volume);
    console.log("Message:", body.message || "—");
    console.log("Sample Requested:", body.requestSample ? "Yes" : "No");
    if (body.requestSample) {
      console.log("Shipping Address:", body.shippingAddress);
    }
    console.log("Timestamp:", new Date().toISOString());
    console.log("═══════════════════════════════════════\n");

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

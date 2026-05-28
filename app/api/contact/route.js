import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ["name", "email", "subject", "message"];
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

    // Save the general inquiry to Firestore
    const db = getDb();
    await db.collection("contact_messages").add({
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      createdAt: new Date().toISOString(),
      status: "new",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message sent successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("General Contact Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}

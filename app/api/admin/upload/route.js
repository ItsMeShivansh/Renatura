import { NextResponse } from "next/server";
import { getStorage } from "@/lib/firebase-admin";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }
    
    const storage = getStorage();
    const bucket = storage.bucket();
    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Clean filename and create a path in 'products' directory
    const fileName = `products/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
    const blob = bucket.file(fileName);
    
    // Save buffer to storage
    await blob.save(buffer, {
      contentType: file.type,
      metadata: {
        cacheControl: "public, max-age=31536000",
      }
    });
    
    // Generate a long-lived signed URL valid until 2076
    const [signedUrl] = await blob.getSignedUrl({
      action: "read",
      expires: "01-01-2076",
    });
    
    return NextResponse.json({ url: signedUrl }, { status: 200 });
  } catch (error) {
    console.error("Upload API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { coreStandards as initialStandards, merchantCredentials as initialCredentials } from "@/data/certifications";

export async function GET() {
  try {
    const db = getDb();
    
    // Standards
    const standardsSnap = await db.collection("standards").get();
    let standards = standardsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (standards.length === 0) {
      const batch = db.batch();
      initialStandards.forEach(std => {
        const ref = db.collection("standards").doc(String(std.id));
        batch.set(ref, {
          code: std.code,
          description: std.description,
        });
      });
      await batch.commit();
      const newSnap = await db.collection("standards").get();
      standards = newSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    standards.sort((a, b) => Number(a.id) - Number(b.id));

    // Credentials
    const credentialsSnap = await db.collection("credentials").get();
    let credentials = credentialsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if (credentials.length === 0) {
      const batch = db.batch();
      initialCredentials.forEach(cred => {
        const ref = db.collection("credentials").doc(String(cred.id));
        batch.set(ref, {
          title: cred.title,
          description: cred.description,
        });
      });
      await batch.commit();
      const newSnap = await db.collection("credentials").get();
      credentials = newSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    credentials.sort((a, b) => Number(a.id) - Number(b.id));

    return NextResponse.json({ standards, credentials }, { status: 200 });
  } catch (error) {
    console.error("Certifications GET Error:", error);
    return NextResponse.json({ standards: initialStandards, credentials: initialCredentials }, { status: 200 });
  }
}

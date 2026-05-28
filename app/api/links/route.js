import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";

const initialLinks = [
  { id: 1, title: "Amazon Storefront", url: "https://amazon.in" },
  { id: 2, title: "Flipkart Storefront", url: "https://flipkart.com" },
];

export async function GET() {
  try {
    const db = getDb();
    const snap = await db.collection("links").get();
    let links = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    if (links.length === 0) {
      const batch = db.batch();
      initialLinks.forEach(link => {
        const ref = db.collection("links").doc(String(link.id));
        batch.set(ref, {
          title: link.title,
          url: link.url,
        });
      });
      await batch.commit();
      
      const newSnap = await db.collection("links").get();
      links = newSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    
    links.sort((a, b) => Number(a.id) - Number(b.id));
    return NextResponse.json(links, { status: 200 });
  } catch (error) {
    console.error("Links GET Error:", error);
    return NextResponse.json(initialLinks, { status: 200 });
  }
}

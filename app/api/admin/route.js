import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { products as initialProducts } from "@/data/products";
import { coreStandards as initialStandards, merchantCredentials as initialCredentials } from "@/data/certifications";

const initialLinks = [
  { id: 1, title: "Amazon Storefront", url: "https://amazon.in" },
  { id: 2, title: "Flipkart Storefront", url: "https://flipkart.com" },
];

export async function GET(request) {
  try {
    const db = getDb();
    
    // 1. Load products
    const productsSnap = await db.collection("products").get();
    let products = productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    if (products.length === 0) {
      const batch = db.batch();
      initialProducts.forEach(product => {
        const ref = db.collection("products").doc(String(product.id));
        batch.set(ref, {
          name: product.name,
          category: product.category,
          dimensions: product.dimensions,
          material: product.material,
          moq: product.moq,
          price: product.price,
          certification: product.certification,
          buyUrl: product.buyUrl,
          image: product.image,
        });
      });
      await batch.commit();
      
      const newSnap = await db.collection("products").get();
      products = newSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    // Sort products by original ID if it's numeric
    products.sort((a, b) => Number(a.id) - Number(b.id));

    // 2. Load standards
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

    // 3. Load credentials
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

    // 4. Load links
    const linksSnap = await db.collection("links").get();
    let links = linksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
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

    return NextResponse.json({ products, standards, credentials, links }, { status: 200 });
  } catch (error) {
    console.error("Admin GET Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const db = getDb();
    const { type, data } = await request.json();
    if (!type || !data) {
      return NextResponse.json({ error: "Missing type or data" }, { status: 400 });
    }
    
    const cleanData = { ...data };
    delete cleanData.id; // Let Firestore generate the ID or we can set it

    const docRef = await db.collection(type).add(cleanData);
    return NextResponse.json({ id: docRef.id, ...cleanData }, { status: 201 });
  } catch (error) {
    console.error("Admin POST Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const db = getDb();
    const { type, id, data } = await request.json();
    if (!type || !id || !data) {
      return NextResponse.json({ error: "Missing type, id or data" }, { status: 400 });
    }
    
    const cleanData = { ...data };
    delete cleanData.id;
    
    await db.collection(type).doc(String(id)).set(cleanData, { merge: true });
    return NextResponse.json({ id, ...cleanData }, { status: 200 });
  } catch (error) {
    console.error("Admin PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const id = searchParams.get("id");
    
    if (!type || !id) {
      return NextResponse.json({ error: "Missing type or id" }, { status: 400 });
    }
    
    await db.collection(type).doc(String(id)).delete();
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Admin DELETE Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

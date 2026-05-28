import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase-admin";
import { products as initialProducts } from "@/data/products";

export async function GET() {
  try {
    const db = getDb();
    const snap = await db.collection("products").get();
    let products = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
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
    
    // Sort products
    products.sort((a, b) => Number(a.id) - Number(b.id));
    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Products GET Error:", error);
    // If Firebase credentials are not found or it fails, fallback gracefully to initial static products
    return NextResponse.json(initialProducts, { status: 200 });
  }
}

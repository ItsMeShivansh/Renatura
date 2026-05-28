import { NextResponse } from 'next/server';
import { getProducts } from '@/lib/google-sheets';
import { getDb } from '@/lib/firebase-admin';

export async function GET() {
  try {
    // 1. Fetch products from Google Sheets
    const products = await getProducts();
    
    // 2. Fetch images from Firestore product_images collection
    let imagesMap = {};
    try {
      const db = getDb();
      const imagesSnap = await db.collection('product_images').get();
      imagesSnap.docs.forEach(doc => {
        imagesMap[doc.id] = doc.data().images || [];
      });
    } catch (imgError) {
      console.error('Failed to load product images from Firestore:', imgError.message);
    }
    
    // 3. Merge images into products
    const enrichedProducts = products.map(product => {
      const { _rowIndex, ...cleanProduct } = product;
      return {
        ...cleanProduct,
        images: imagesMap[product.id] || [],
      };
    });
    
    return NextResponse.json(enrichedProducts, { status: 200 });
  } catch (error) {
    console.error('Products GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

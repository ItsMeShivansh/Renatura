import { NextResponse } from 'next/server';
import { getProductBySku } from '@/lib/google-sheets';
import { getDb } from '@/lib/firebase-admin';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    
    // 1. Fetch product from Google Sheets by SKU
    const product = await getProductBySku(id);
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    
    // 2. Fetch images from Firestore
    let images = [];
    try {
      const db = getDb();
      const imageDoc = await db.collection('product_images').doc(id).get();
      if (imageDoc.exists) {
        images = imageDoc.data().images || [];
      }
    } catch (imgError) {
      console.error('Failed to load product images:', imgError.message);
    }
    
    // 3. Return enriched product (without internal _rowIndex)
    const { _rowIndex, ...cleanProduct } = product;
    return NextResponse.json({ ...cleanProduct, images }, { status: 200 });
  } catch (error) {
    console.error('Product GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

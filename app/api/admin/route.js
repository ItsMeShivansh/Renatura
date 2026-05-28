import { NextResponse } from 'next/server';
import { getDb } from '@/lib/firebase-admin';
import { getProducts, addProduct, updateProduct, deleteProduct } from '@/lib/google-sheets';
import { coreStandards as initialStandards, merchantCredentials as initialCredentials } from '@/data/certifications';

const initialLinks = [
  { id: 1, title: 'Amazon Storefront', url: 'https://amazon.in' },
  { id: 2, title: 'Flipkart Storefront', url: 'https://flipkart.com' },
];

export async function GET(request) {
  try {
    const db = getDb();
    
    // 1. Load products from Google Sheets
    let products = [];
    try {
      const sheetProducts = await getProducts();
      
      // Fetch images from Firestore
      const imagesSnap = await db.collection('product_images').get();
      const imagesMap = {};
      imagesSnap.docs.forEach(doc => {
        imagesMap[doc.id] = doc.data().images || [];
      });
      
      products = sheetProducts.map(p => ({
        ...p,
        images: imagesMap[p.id] || [],
      }));
    } catch (sheetError) {
      console.error('Google Sheets loading error:', sheetError.message);
      products = [];
    }

    // 2. Load standards from Firestore
    const standardsSnap = await db.collection('standards').get();
    let standards = standardsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    if (standards.length === 0) {
      const batch = db.batch();
      initialStandards.forEach(std => {
        const ref = db.collection('standards').doc(String(std.id));
        batch.set(ref, { code: std.code, description: std.description });
      });
      await batch.commit();
      const newSnap = await db.collection('standards').get();
      standards = newSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    standards.sort((a, b) => Number(a.id) - Number(b.id));

    // 3. Load credentials from Firestore
    const credentialsSnap = await db.collection('credentials').get();
    let credentials = credentialsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    if (credentials.length === 0) {
      const batch = db.batch();
      initialCredentials.forEach(cred => {
        const ref = db.collection('credentials').doc(String(cred.id));
        batch.set(ref, { title: cred.title, description: cred.description });
      });
      await batch.commit();
      const newSnap = await db.collection('credentials').get();
      credentials = newSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    credentials.sort((a, b) => Number(a.id) - Number(b.id));

    // 4. Load links from Firestore
    const linksSnap = await db.collection('links').get();
    let links = linksSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    if (links.length === 0) {
      const batch = db.batch();
      initialLinks.forEach(link => {
        const ref = db.collection('links').doc(String(link.id));
        batch.set(ref, { title: link.title, url: link.url });
      });
      await batch.commit();
      const newSnap = await db.collection('links').get();
      links = newSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
    links.sort((a, b) => Number(a.id) - Number(b.id));

    return NextResponse.json({ products, standards, credentials, links }, { status: 200 });
  } catch (error) {
    console.error('Admin GET Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const db = getDb();
    const { type, data } = await request.json();
    if (!type || !data) {
      return NextResponse.json({ error: 'Missing type or data' }, { status: 400 });
    }
    
    if (type === 'products') {
      // Save text data to Google Sheets
      const { images, ...sheetData } = data;
      await addProduct(sheetData);
      
      // Save images to Firestore if provided
      if (images && images.length > 0 && sheetData.id) {
        await db.collection('product_images').doc(sheetData.id).set({ images });
      }
      
      return NextResponse.json({ ...sheetData, images: images || [] }, { status: 201 });
    } else {
      // Standards, credentials, links — use Firestore
      const cleanData = { ...data };
      delete cleanData.id;
      const docRef = await db.collection(type).add(cleanData);
      return NextResponse.json({ id: docRef.id, ...cleanData }, { status: 201 });
    }
  } catch (error) {
    console.error('Admin POST Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const db = getDb();
    const { type, id, data } = await request.json();
    if (!type || !id || !data) {
      return NextResponse.json({ error: 'Missing type, id or data' }, { status: 400 });
    }
    
    if (type === 'products') {
      // data._rowIndex tells us which row to update in the sheet
      const { images, _rowIndex, ...sheetData } = data;
      
      if (_rowIndex) {
        await updateProduct(_rowIndex, sheetData);
      }
      
      // Update images in Firestore
      if (images && sheetData.id) {
        await db.collection('product_images').doc(sheetData.id).set({ images });
      }
      
      return NextResponse.json({ ...sheetData, images: images || [] }, { status: 200 });
    } else {
      // Standards, credentials, links — use Firestore
      const cleanData = { ...data };
      delete cleanData.id;
      await db.collection(type).doc(String(id)).set(cleanData, { merge: true });
      return NextResponse.json({ id, ...cleanData }, { status: 200 });
    }
  } catch (error) {
    console.error('Admin PUT Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const db = getDb();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    const rowIndex = searchParams.get('rowIndex');
    
    if (!type || !id) {
      return NextResponse.json({ error: 'Missing type or id' }, { status: 400 });
    }
    
    if (type === 'products') {
      // Delete row from Google Sheets
      if (rowIndex) {
        await deleteProduct(Number(rowIndex));
      }
      
      // Delete images from Firestore
      try {
        await db.collection('product_images').doc(id).delete();
      } catch (e) {
        // Image doc may not exist, that's ok
      }
      
      return NextResponse.json({ success: true }, { status: 200 });
    } else {
      // Standards, credentials, links — use Firestore
      await db.collection(type).doc(String(id)).delete();
      return NextResponse.json({ success: true }, { status: 200 });
    }
  } catch (error) {
    console.error('Admin DELETE Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

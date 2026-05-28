import { google } from 'googleapis';

const SHEET_NAME = 'Sheet5';

// Column mapping: A=SKU, B=Product Name, C=Category, D=Brand, E=Material, 
// F=Pack Qty, G=Sleeves Per Box, H=Pcs Per Sleeve, I=Product Weight (Gms),
// J=Diameter (mm), K=Length (mm), L=Width (mm), M=Height (mm), N=Thickness (mm),
// O=Usage / B2B Application, P=Key Features & B2B Keywords

function getAuth() {
  if (!process.env.GOOGLE_SHEET_ID) {
    throw new Error('Missing GOOGLE_SHEET_ID environment variable.');
  }
  return new google.auth.JWT({
    email: process.env.FIREBASE_CLIENT_EMAIL,
    key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

function getSheetsClient() {
  const auth = getAuth();
  return google.sheets({ version: 'v4', auth });
}

// Parse a row array into a product object
function rowToProduct(row, rowIndex) {
  return {
    id: row[0] || '',          // A: SKU / Product Code
    name: row[1] || '',         // B: Product Name
    category: row[2] || '',     // C: Category
    brand: row[3] || '',        // D: Brand
    material: row[4] || '',     // E: Material
    packQty: row[5] ? Number(row[5]) : null,      // F: Pack Qty (Pcs/Box)
    sleevesPerBox: row[6] ? Number(row[6]) : null, // G: Sleeves Per Box
    pcsPerSleeve: row[7] ? Number(row[7]) : null,  // H: Pcs Per Sleeve
    weight: row[8] ? Number(row[8]) : null,         // I: Product Weight (Gms)
    diameter: row[9] ? Number(row[9]) : null,       // J: Diameter (mm) - optional
    length: row[10] ? Number(row[10]) : null,       // K: Length (mm) - optional
    width: row[11] ? Number(row[11]) : null,        // L: Width (mm) - optional
    height: row[12] ? Number(row[12]) : null,       // M: Height (mm)
    thickness: row[13] ? Number(row[13]) : null,    // N: Thickness (mm)
    usage: row[14] || '',       // O: Usage / B2B Application
    keywords: row[15] || '',    // P: Key Features & B2B Keywords
    bestseller: row[16] === 'TRUE' || row[16] === 'true', // Q: Bestseller
    _rowIndex: rowIndex,        // Internal: 1-indexed row in sheet (for updates)
  };
}

// Convert a product object back to a row array for writing
function productToRow(product) {
  return [
    product.id || '',
    product.name || '',
    product.category || '',
    product.brand || '',
    product.material || '',
    product.packQty ?? '',
    product.sleevesPerBox ?? '',
    product.pcsPerSleeve ?? '',
    product.weight ?? '',
    product.diameter ?? '',
    product.length ?? '',
    product.width ?? '',
    product.height ?? '',
    product.thickness ?? '',
    product.usage || '',
    product.keywords || '',
    product.bestseller ? 'TRUE' : 'FALSE',
  ];
}

// Get all products from the sheet
export async function getProducts() {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_NAME}!A2:Q`,  // Skip header row
  });
  
  const rows = response.data.values || [];
  return rows.map((row, index) => rowToProduct(row, index + 2)); // +2 because row 1 is header, 0-indexed becomes 1-indexed
}

// Get a single product by SKU
export async function getProductBySku(sku) {
  const products = await getProducts();
  return products.find(p => p.id === sku) || null;
}

// Append a new product row
export async function addProduct(product) {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  
  const row = productToRow(product);
  
  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_NAME}!A:Q`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [row],
    },
  });
  
  return product;
}

// Update an existing product row (rowIndex is 1-based sheet row number)
export async function updateProduct(rowIndex, product) {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  
  const row = productToRow(product);
  
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${SHEET_NAME}!A${rowIndex}:Q${rowIndex}`,
    valueInputOption: 'RAW',
    requestBody: {
      values: [row],
    },
  });
  
  return product;
}

// Delete a product row by clearing it (or shifting rows up)
export async function deleteProduct(rowIndex) {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;
  
  // Get the sheet ID (gid) for the Sheet5 tab
  const spreadsheet = await sheets.spreadsheets.get({ spreadsheetId });
  const sheet = spreadsheet.data.sheets.find(s => s.properties.title === SHEET_NAME);
  
  if (!sheet) {
    throw new Error(`Sheet "${SHEET_NAME}" not found`);
  }
  
  // Delete the row (shifts rows up)
  await sheets.spreadsheets.batchUpdate({
    spreadsheetId,
    requestBody: {
      requests: [{
        deleteDimension: {
          range: {
            sheetId: sheet.properties.sheetId,
            dimension: 'ROWS',
            startIndex: rowIndex - 1, // 0-indexed
            endIndex: rowIndex,        // exclusive
          },
        },
      }],
    },
  });
}

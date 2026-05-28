import admin from "firebase-admin";

export function getDb() {
  if (!admin.apps.length) {
    try {
      if (!process.env.FIREBASE_PROJECT_ID) {
        throw new Error("Missing FIREBASE_PROJECT_ID environment variable.");
      }
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: process.env.FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          privateKey: process.env.FIREBASE_PRIVATE_KEY
            ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n")
            : undefined,
        }),
      });
    } catch (error) {
      console.error("Firebase admin initialization error:", error.message);
      throw error;
    }
  }
  return admin.firestore();
}

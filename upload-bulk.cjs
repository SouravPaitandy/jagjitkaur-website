const admin = require("firebase-admin");
const products = require("./data/products.cjs"); // your array

const serviceAccount = require("./firebase-service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function upload() {
  try {
    console.log(`🚀 Starting bulk upload of ${products.length} products...`);
    
    const batch = db.batch();

    products.forEach((product, index) => {
      const docRef = db.collection("products").doc(product.id);
      batch.set(docRef, product);
      console.log(`📦 Prepared product ${index + 1}/${products.length}: ${product.name}`);
    });

    await batch.commit();
    console.log("✅ Bulk upload complete!");
    console.log(`📊 Successfully uploaded ${products.length} products to Firestore`);
    
    // Exit the process
    process.exit(0);
  } catch (error) {
    console.error("❌ Upload failed:", error);
    process.exit(1);
  }
}

upload();
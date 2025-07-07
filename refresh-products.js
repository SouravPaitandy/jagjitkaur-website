const admin = require("firebase-admin");
const products = require("./data/products.cjs");

const serviceAccount = require("./firebase-service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function refreshProducts() {
  try {
    console.log("🔄 Starting fresh product upload...");
    
    // Step 1: Delete existing products
    console.log("🗑️  Deleting existing products...");
    const snapshot = await db.collection("products").get();
    
    if (!snapshot.empty) {
      const deleteBatch = db.batch();
      snapshot.docs.forEach((doc) => {
        deleteBatch.delete(doc.ref);
      });
      await deleteBatch.commit();
      console.log(`✅ Deleted ${snapshot.size} existing products`);
    } else {
      console.log("📭 No existing products to delete");
    }

    // Step 2: Upload new products
    console.log("📦 Uploading new products...");
    const uploadBatch = db.batch();

    products.forEach((product, index) => {
      const docRef = db.collection("products").doc(product.id);
      uploadBatch.set(docRef, product);
      console.log(`📦 Prepared product ${index + 1}/${products.length}: ${product.name}`);
    });

    await uploadBatch.commit();
    console.log("✅ Fresh upload complete!");
    console.log(`📊 Successfully uploaded ${products.length} new products to Firestore`);
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Refresh failed:", error);
    process.exit(1);
  }
}

refreshProducts();
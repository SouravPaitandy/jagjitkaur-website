const admin = require("firebase-admin");

const serviceAccount = require("./firebase-service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function deleteAllProducts() {
  try {
    console.log("🗑️  Starting bulk deletion of products...");
    
    // Get all documents in the products collection
    const snapshot = await db.collection("products").get();
    
    if (snapshot.empty) {
      console.log("📭 No products found to delete.");
      return;
    }

    console.log(`🔍 Found ${snapshot.size} products to delete...`);
    
    // Create a batch for deletion
    const batch = db.batch();
    
    snapshot.docs.forEach((doc, index) => {
      batch.delete(doc.ref);
      console.log(`🗑️  Prepared for deletion ${index + 1}/${snapshot.size}: ${doc.id}`);
    });

    // Commit the batch
    await batch.commit();
    console.log("✅ Bulk deletion complete!");
    console.log(`🗑️  Successfully deleted ${snapshot.size} products from Firestore`);
    
    // Exit the process
    process.exit(0);
  } catch (error) {
    console.error("❌ Deletion failed:", error);
    process.exit(1);
  }
}

deleteAllProducts();
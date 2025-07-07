const admin = require("firebase-admin");

const serviceAccount = require("./firebase-service.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function debugProducts() {
  try {
    console.log("🔍 Checking products in Firestore...");
    
    const snapshot = await db.collection("products").get();
    
    if (snapshot.empty) {
      console.log("❌ No products found in Firestore!");
      return;
    }

    console.log(`📦 Found ${snapshot.size} products:`);
    
    snapshot.forEach((doc) => {
      const data = doc.data();
      const slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, "")
        .replace(/\s+/g, "-")
        .trim();
      
      console.log(`
Product: ${data.name}
  - Slug: ${slug}
  - Category: ${data.category}
  - Has components: ${!!data.components}
  - Has setIncludes: ${!!data.setIncludes}
  - Document ID: ${doc.id}
      `);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
}

debugProducts();
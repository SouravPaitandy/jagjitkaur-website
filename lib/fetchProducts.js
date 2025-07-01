import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

export async function fetchProductsFromFirestore() {
  try {
    // Order by createdAt to show newest first
    const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    
    const products = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      products.push({
        ...data,
        firestoreId: doc.id, // Store Firestore document ID for updates
        // Convert Firestore timestamps to readable dates
        createdAt: data.createdAt?.toDate?.() || new Date(),
        updatedAt: data.updatedAt?.toDate?.() || new Date(),
      });
    });
    
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}
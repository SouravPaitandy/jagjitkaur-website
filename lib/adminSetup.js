import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Ensure admin document exists for current user
export async function ensureAdminDocument(user) {
  if (!user) return false;

  try {
    const adminDocRef = doc(db, "admins", user.uid);
    const adminDoc = await getDoc(adminDocRef);

    if (!adminDoc.exists()) {
      // Create admin document if it doesn't exist
      await setDoc(adminDocRef, {
        email: user.email,
        name: user.displayName || user.email.split('@')[0],
        role: "admin",
        createdBy: "system",
        createdAt: new Date().toISOString(),
        uid: user.uid,
        isActive: true,
        passwordChangedAt: null
      });
      console.log("Admin document created for:", user.email);
    }
    return true;
  } catch (error) {
    console.error("Error ensuring admin document:", error);
    return false;
  }
}
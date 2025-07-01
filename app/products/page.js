
import { fetchProductsFromFirestore } from "@/lib/fetchProducts";
import ProductsComp from "@/components/ProductsComp.js";

export default async function ProductsPage() {

  const products = await fetchProductsFromFirestore();
  console.log("Fetched products from Firestore:", products);
  if (!products || products.length === 0) {
    console.log("No products found in Firestore.");
    
    return <div className="text-center p-8">No products available at the moment.</div>;
  }
  // If you want to use the local products data instead of fetching from Firestore, uncomment the line below

  return <ProductsComp products={products}/>;
}
import { Suspense } from "react";
import { fetchProductsFromFirestore } from "@/lib/fetchProducts";
import ProductsComp from "@/components/ProductsComp.js";

// Loading component for Suspense fallback
function ProductsLoading() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-stone-300 border-t-stone-700 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-stone-600 dark:text-stone-400 text-lg font-medium">
          Loading our exquisite collection...
        </p>
      </div>
    </div>
  );
}

export default async function ProductsPage() {
  const products = await fetchProductsFromFirestore();
  console.log("Fetched products from Firestore:", products);
  
  if (!products || products.length === 0) {
    console.log("No products found in Firestore.");
    return (
      <div className="text-center p-8">
        No products available at the moment.
      </div>
    );
  }

  return (
    <Suspense fallback={<ProductsLoading />}>
      <ProductsComp products={products} />
    </Suspense>
  );
}
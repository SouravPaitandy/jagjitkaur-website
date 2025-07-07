import { Suspense } from "react";
import { fetchProductsFromFirestore } from "@/lib/fetchProducts";
import ProductsComp from "@/components/ProductsComp.js";
import { Loading } from "@/components/Loading";

// Generate dynamic metadata based on URL parameters
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const category = params.category || null;
  
  if (category) {
    const categoryTitles = {
      'sharara-sets': 'Sharara Sets | Jagjit Kaur - 3 Piece Sharara Collections',
      'palazzo-sets': 'Palazzo Sets | Jagjit Kaur - Contemporary Palazzo Collections',
      'anarkali-sets': 'Anarkali Sets | Jagjit Kaur - Designer Anarkali Collections',
      'gharara-sets': 'Gharara Sets | Jagjit Kaur - Traditional Gharara Collections',
      'kurti-sets': 'Kurti Sets | Jagjit Kaur - Modern Kurti Collections',
      'co-ord-sets': 'Co-ord Sets | Jagjit Kaur - Matching Co-ordinate Sets'
    };
    
    const categoryDescriptions = {
      'sharara-sets': 'Explore our exquisite 3-piece sharara sets featuring kurta, sharara, and dupatta combinations.',
      'palazzo-sets': 'Discover comfortable palazzo sets with kurta and dupatta for contemporary style.',
      'anarkali-sets': 'Browse our elegant anarkali sets with churidar and embroidered dupatta for special occasions.',
      'gharara-sets': 'Find traditional gharara sets perfect for weddings and festive celebrations.',
      'kurti-sets': 'Shop modern kurti sets with palazzo/pant and dupatta combinations.',
      'co-ord-sets': 'Complete your wardrobe with our matching co-ordinate sets.'
    };

    return {
      title: categoryTitles[category] || "Collections | Jagjit Kaur - Traditional Indian Fashion Sets",
      description: categoryDescriptions[category] || "Browse our complete collection of handcrafted traditional Indian wear sets.",
      keywords: [category, "3 piece sets", "traditional wear", "Indian fashion", "Jagjit Kaur"],
    };
  }

  return {
    title: "Collections | Jagjit Kaur - Traditional Indian Fashion Sets",
    description: "Browse our complete collection of handcrafted traditional Indian wear sets including sharara, palazzo, and anarkali sets.",
    keywords: ["traditional fashion sets", "3 piece sets", "Indian clothing", "Jagjit Kaur"],
  };
}

// Loading component for Suspense fallback
function ProductsLoading() {
  return (
    <Loading/>
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
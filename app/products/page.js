import { Suspense } from "react";
import { fetchProductsFromFirestore } from "@/lib/fetchProducts";
import ProductsComp from "@/components/ProductsComp.js";

// Generate dynamic metadata based on URL parameters
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  const category = params.category || null;
  
  if (category) {
    const categoryTitles = {
      'sarees': 'Sarees Collection | Jagjit Kaur - Handcrafted Traditional Sarees',
      'lehengas': 'Lehengas Collection | Jagjit Kaur - Designer Bridal Lehengas',
      'kurtas': 'Kurtas Collection | Jagjit Kaur - Contemporary Traditional Kurtas',
      'suits': 'Suits Collection | Jagjit Kaur - Elegant Traditional Suits',
      'dupattas': 'Dupattas Collection | Jagjit Kaur - Exquisite Handwoven Dupattas'
    };
    
    const categoryDescriptions = {
      'sarees': 'Explore our exquisite collection of handcrafted sarees featuring traditional weaving techniques and premium fabrics.',
      'lehengas': 'Discover stunning bridal and party lehengas with intricate embroidery and luxurious fabrics.',
      'kurtas': 'Browse our contemporary kurta collection blending traditional craftsmanship with modern elegance.',
      'suits': 'Find elegant traditional suits perfect for special occasions and festive celebrations.',
      'dupattas': 'Complete your outfit with our beautiful handwoven dupattas featuring traditional motifs.'
    };

    return {
      title: categoryTitles[category] || "Collections | Jagjit Kaur - Traditional Indian Fashion",
      description: categoryDescriptions[category] || "Browse our complete collection of handcrafted traditional Indian wear.",
      keywords: [category, "handcrafted", "traditional", "Indian fashion", "Jagjit Kaur"],
    };
  }

  return {
    title: "Collections | Jagjit Kaur - Traditional Indian Fashion Collection",
    description: "Browse our complete collection of handcrafted sarees, lehengas, kurtas and traditional Indian wear.",
    keywords: ["traditional fashion", "handcrafted wear", "Indian clothing", "Jagjit Kaur"],
  };
}

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
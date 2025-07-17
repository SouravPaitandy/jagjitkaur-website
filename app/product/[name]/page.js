import Image from "next/image";
import Link from "next/link";
import { fetchProductsFromFirestore } from "@/lib/fetchProducts";
import WhatsAppButton from "@/components/WhatsAppButton";
import AddToBagButton from "@/components/AddToBagButton";
import Footer from "@/components/Footer";
import ImageGallery from "@/components/ImageGallery";
import {
  FiHeart,
  FiShare2,
  FiTruck,
  FiRotateCcw,
  FiShield,
} from "react-icons/fi";
import { ProductDetailSkeleton } from "@/components/Loading";
import WishlistButton from "@/components/WishlistButton";

// Helper function to create URL-safe slug from product name
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim();
}

// Generate dynamic metadata based on the product
export async function generateMetadata({ params }) {
  const { name } = await params;
  const products = await fetchProductsFromFirestore();
  const product = products.find((p) => createSlug(p.name) === name);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The product you're looking for could not be found.",
    };
  }

  // Get main image or first image
  const mainImage =
    product.images?.find((img) => img.isMain)?.url ||
    product.images?.[0]?.url ||
    product.image;

  return {
    title: `${product.name}`,
    description: `${product.description} - Premium ${product.fabric} ${product.category} with ${product.work} from ${product.origin}. Authentic handcrafted Indian fashion by Jagjit Kaur.`,
    keywords: [
      product.name,
      product.category,
      product.fabric,
      product.work,
      product.origin,
      "handcrafted",
      "traditional",
      "Indian fashion",
      "Jagjit Kaur",
    ],
    openGraph: {
      title: `${product.name} | Jagjit Kaur`,
      description: product.description,
      images: [
        {
          url: mainImage,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: "website",
    },
  };
}

// Add this function before the ProductDetail component
function formatDate(dateString) {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch (error) {
    return "";
  }
}

export default async function ProductDetail({ params }) {
  const { name } = await params;

  let products = [];
  let product = null;

  try {
    products = await fetchProductsFromFirestore();
    product = products.find((p) => createSlug(p.name) === name);
  } catch (error) {
    console.error("❌ Error fetching product data:", error);
  }

  // If products are loading, show skeleton
  if (!products || products.length === 0) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return (
      <>
        <main className="min-h-screen bg-white dark:bg-stone-900 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6 animate-fade-in-up">
            <h1 className="text-2xl font-light text-stone-800 dark:text-stone-200 mb-4">
              Product Not Found
            </h1>
            <p className="text-stone-600 dark:text-stone-400 mb-8">
              The piece you're looking for seems to have found a new home.
            </p>
            <Link
              href="/products"
              className="inline-block px-8 py-3 border border-stone-800 dark:border-stone-200 text-stone-800 dark:text-stone-200 hover:bg-stone-800 dark:hover:bg-stone-200 hover:text-white dark:hover:text-stone-900 transition-all duration-300 text-sm tracking-wide hover:scale-105 active:scale-95"
            >
              EXPLORE COLLECTION
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Get product images - support both old and new format
  const productImages =
    product.images && product.images.length > 0
      ? product.images
      : product.image
      ? [{ url: product.image, isMain: true }]
      : [];

  // Get related products (excluding current product)
  const relatedProducts = products
    .filter(
      (p) =>
        p.firestoreId !== product.firestoreId && p.category === product.category
    )
    .slice(0, 4);

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-stone-900">
        {/* Minimalist Breadcrumb with fade-in animation */}
        <div className="border-b border-stone-200 dark:border-stone-700 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-xs tracking-wide text-stone-500 dark:text-stone-400">
              <Link
                href="/"
                className="hover:text-stone-800 dark:hover:text-stone-200 transition-colors duration-300"
              >
                HOME
              </Link>
              <span className="animate-pulse">/</span>
              <Link
                href="/products"
                className="hover:text-stone-800 dark:hover:text-stone-200 transition-colors duration-300"
              >
                {product.category.toUpperCase()}
              </Link>
              <span className="animate-pulse">/</span>
              <span className="text-stone-800 dark:text-stone-200">
                {product.name.toUpperCase()}
              </span>
            </nav>
          </div>
        </div>

        {/* Product Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Image Gallery Section - Left with slide-in animation */}
            <div className="space-y-6 animate-slide-in">
              <ImageGallery images={productImages} productName={product.name} />
            </div>

            {/* Product Info - Right with slide-up animation */}
            <div className="space-y-8 animate-slide-up">
              {/* ...existing product info code... */}
              {/* Product Title & SKU */}
              <div className="space-y-4 animate-fade-in-up">
                <h1 className="font-fira-sans text-2xl sm:text-3xl md:text-4xl font-semibold text-stone-900 dark:text-stone-100 tracking-wide leading-tight">
                  {product.name}
                </h1>

                {product.firestoreId && (
                  <p className="text-xs tracking-widest text-stone-500 dark:text-stone-400">
                    SKU: {product.firestoreId.slice(-8).toUpperCase()}
                  </p>
                )}

                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 text-xs tracking-wide border border-green-200 dark:border-green-700 animate-bounce-in">
                    IN STOCK
                  </span>
                </div>
              </div>

              {/* Price with slide-in animation */}
              <div className="space-y-2 animate-fade-in-up delay-200">
                <div className="flex flex-row sm:items-baseline gap-2 small:gap-0 space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="text-2xl font-semibold text-stone-900 dark:text-stone-100">
                    ₹{product.price}
                  </span>
                  {product.originalPrice &&
                    product.originalPrice !== product.price && (
                      <span className="text-lg text-stone-500 dark:text-stone-400 line-through">
                        ₹{product.originalPrice}
                      </span>
                    )}
                </div>
                <div className="mt-4 sm:hidden">
                  <WhatsAppButton
                    productName={product.name}
                    product={product}
                  />
                </div>
                <p className="text-xs text-stone-600 dark:text-stone-400 tracking-wide">
                  PRICES ARE INCLUSIVE OF GST
                </p>
              </div>

              {/* Product Details with staggered animation */}
              <div className="space-y-6 animate-fade-in-up delay-300">
                {product.description && (
                  <div className="space-y-3">
                    <h3 className="font-fira-sans text-sm font-medium text-stone-900 dark:text-stone-100 tracking-wide">
                      DESCRIPTION
                    </h3>
                    <p className="text-stone-700 dark:text-stone-300 leading-relaxed text-sm sm:text-base">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Components Section */}
                {product.components &&
                  Object.keys(product.components).length > 0 && (
                    <div className="space-y-3">
                      <h3 className="font-fira-sans text-sm font-medium text-stone-900 dark:text-stone-100 tracking-wide">
                        INCLUDES
                      </h3>
                      <div className="space-y-2">
                        {Object.entries(product.components).map(
                          ([name, description], index) => (
                            <div
                              key={index}
                              className="flex flex-col sm:flex-row animate-fade-in-up"
                              style={{
                                animationDelay: `${index * 50}ms`,
                                animationFillMode: "both",
                              }}
                            >
                              <span className="sm:w-20 text-stone-600 dark:text-stone-400 text-sm capitalize font-medium">
                                {name}:
                              </span>
                              <span className="text-stone-700 dark:text-stone-300 text-sm">
                                {description}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Product Specifications */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 text-sm">
                  {[
                    { key: "fabric", label: "Fabric" },
                    { key: "work", label: "Work" },
                    { key: "origin", label: "Origin" },
                    { key: "length", label: "Length" },
                  ].map(
                    (spec, index) =>
                      product[spec.key] && (
                        <div
                          key={spec.key}
                          className="flex justify-between sm:block animate-fade-in-up"
                          style={{
                            animationDelay: `${index * 100}ms`,
                            animationFillMode: "both",
                          }}
                        >
                          <span className="text-stone-600 dark:text-stone-400">
                            {spec.label}:
                          </span>
                          <span className="sm:ml-2 text-stone-900 dark:text-stone-100 font-medium">
                            {product[spec.key]}
                          </span>
                        </div>
                      )
                  )}
                </div>

                {/* Care Instructions */}
                {product.care && (
                  <div className="space-y-3 animate-fade-in-up delay-400">
                    <h3 className="font-fira-sans text-sm font-medium text-stone-900 dark:text-stone-100 tracking-wide">
                      CARE INSTRUCTIONS
                    </h3>
                    <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed">
                      {product.care}
                    </p>
                  </div>
                )}
              </div>

              {/* Enhanced Action Buttons with slide-up animation */}
              <div className="space-y-4 animate-fade-in-up delay-500">
                <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                  {/* Add to Bag Button */}
                  <div className="flex-1">
                    <AddToBagButton
                      product={product}
                      variant="primary"
                      size="large"
                      className="w-full"
                    />
                  </div>

                  {/* Wishlist Button */}
                  {/* <button className="sm:w-auto w-full p-4 border border-stone-300 dark:border-stone-600 hover:border-stone-800 dark:hover:border-stone-200 text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center">
                    <FiHeart className="w-5 h-5" />
                    <span className="ml-2 sm:hidden text-sm">ADD TO WISHLIST</span>
                  </button> */}
                  <div className="sm:w-auto w-full">
                    <WishlistButton
                      product={product}
                      // showText={true}
                      className="w-full sm:w-auto p-4 border border-stone-300 dark:border-stone-600 hover:border-stone-800 dark:hover:border-stone-200 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
                    />
                  </div>
                </div>

                <div className="hidden sm:block animate-bounce-in delay-600">
                  <WhatsAppButton
                    productName={product.name}
                    product={product}
                  />
                </div>
              </div>

              {/* Service Icons with staggered animation */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 py-6 sm:py-8 border-t border-stone-200 dark:border-stone-700">
                {[
                  { icon: FiTruck, label: "FREE SHIPPING" },
                  { icon: FiRotateCcw, label: "EASY RETURNS" },
                  { icon: FiShield, label: "AUTHENTIC" },
                ].map((service, index) => (
                  <div
                    key={service.label}
                    className="text-center space-y-2 animate-fade-in-up"
                    style={{
                      animationDelay: `${(index + 7) * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <service.icon className="w-5 h-5 sm:w-6 sm:h-6 mx-auto text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors duration-300" />
                    <p className="text-xs text-stone-600 dark:text-stone-400 tracking-wide">
                      {service.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Products with staggered animation */}
          {relatedProducts.length > 0 && (
            <div className="mt-24 pt-12 border-t border-stone-200 dark:border-stone-700 animate-slide-up">
              <h2 className="font-fira-sans text-xl sm:text-2xl font-light text-stone-900 dark:text-stone-100 mb-8 sm:mb-12 tracking-wide animate-fade-in-up">
                YOU MIGHT ALSO LIKE
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                {relatedProducts.map((relatedProduct, index) => {
                  const relatedMainImage =
                    relatedProduct.images?.find((img) => img.isMain)?.url ||
                    relatedProduct.images?.[0]?.url ||
                    relatedProduct.image;

                  return (
                    <Link
                      key={relatedProduct.firestoreId}
                      href={`/product/${createSlug(relatedProduct.name)}`}
                      className="group animate-fade-in-up"
                      style={{
                        animationDelay: `${index * 150}ms`,
                        animationFillMode: "both",
                      }}
                    >
                      <div className="space-y-3 sm:space-y-4">
                        <div className="aspect-[3/4] relative overflow-hidden bg-stone-50 dark:bg-stone-800">
                          <Image
                            src={relatedMainImage}
                            alt={relatedProduct.name}
                            fill
                            className={`object-cover transition-all duration-700 ease-out group-hover:scale-110`}
                          />
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <h3 className="text-xs sm:text-sm text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors duration-300 line-clamp-2">
                            {relatedProduct.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 font-medium">
                            ₹{relatedProduct.price}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Minimalist Footer with slide-up animation */}
      <div className="border-t border-stone-200 dark:border-stone-700 py-8 text-center bg-white dark:bg-stone-900 animate-slide-up">
        <p className="font-fira-sans text-xs tracking-widest text-stone-500 dark:text-stone-400">
          JAGJIT KAUR • CRAFTED WITH LOVE
        </p>
      </div>
    </>
  );
}

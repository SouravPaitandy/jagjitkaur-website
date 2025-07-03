import Image from "next/image";
import Link from "next/link";
import { fetchProductsFromFirestore } from "@/lib/fetchProducts";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";
import { FiArrowDown } from "react-icons/fi";

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
      title: "Product Not Found | Jagjit Kaur",
      description: "The product you're looking for could not be found.",
    };
  }

  return {
    title: `${product.name} | Jagjit Kaur - Handcrafted ${product.category.charAt(0).toUpperCase() + product.category.slice(1)}`,
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
      "Jagjit Kaur"
    ],
    openGraph: {
      title: `${product.name} | Jagjit Kaur`,
      description: product.description,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Jagjit Kaur`,
      description: product.description,
      images: [product.image],
    },
    appleWebApp: {
      rel: "icon",
      url: "/favicon.ico",
      type: "image/x-icon",
    },
  };
}

export default async function ProductDetail({ params }) {
  const { name } = await params;
  const products = await fetchProductsFromFirestore();

  // Find product by comparing slugified names
  const product = products.find((p) => createSlug(p.name) === name);

  // console.log("Product: ", product);
  // console.log("Looking for slug: ", name);
  // console.log(
  //   "Available products:",
  //   products.map((p) => ({ name: p.name, slug: createSlug(p.name) }))
  // );

  const formatDate = (date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  if (!product) {
    return (
      <>
        <main className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-6">
            <div className="w-24 h-24 mx-auto mb-6 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-stone-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h1 className="font-fira-sans text-4xl font-bold text-stone-900 dark:text-white mb-4">
              Product Not Found
            </h1>
            <p className="text-stone-600 dark:text-stone-300 mb-8 text-lg">
              The beautiful piece you're looking for seems to have found a new
              home.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-8 py-4 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 transition-all duration-300 shadow-lg hover:shadow-xl font-medium"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Explore Our Collection
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Get related products (excluding current product)
  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 3);
  if (relatedProducts.length < 3) {
    const additionalProducts = products
      .filter((p) => p.id !== product.id && p.category !== product.category)
      .slice(0, 3 - relatedProducts.length);
    relatedProducts.push(...additionalProducts);
  }

  return (
    <>
      <main className="min-h-screen bg-stone-50 dark:bg-stone-900">
        {/* Enhanced Breadcrumb */}
        <div className="bg-white dark:bg-stone-800 py-6 border-b border-stone-200 dark:border-stone-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-3 text-sm mb-4">
              <Link
                href="/"
                className="text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-medium flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </Link>
              <svg
                className="w-4 h-4 text-stone-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <Link
                href="/products"
                className="text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-medium flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Collection
              </Link>
              <svg
                className="w-4 h-4 text-stone-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <span className="text-stone-800 dark:text-stone-200 font-semibold">
                {product.name}
              </span>
            </nav>
            {/* Category Badge */}
            <div className="flex items-center space-x-2">
              <span className="bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 px-4 py-1.5 rounded-md text-sm font-semibold shadow-lg">
                {product.category.charAt(0).toUpperCase() +
                  product.category.slice(1)}
              </span>
              {product.createdAt && (
                <span className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-3 py-1 rounded-md text-xs font-medium">
                  Added {formatDate(product.createdAt)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Enhanced Product Detail Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Enhanced Product Image Section */}
            <div className="flex gap-4 lg:gap-6">
              {/* Thumbnail Gallery - Left Side */}
              <div className="flex flex-col gap-3 w-16 md:w-20 lg:w-24">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-md bg-stone-100 dark:bg-stone-800 cursor-pointer hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-stone-300 dark:hover:border-stone-600"
                  >
                    <Image
                      src={product.image}
                      alt={`${product.name} view ${i}`}
                      loading="lazy"
                      fill
                      className="object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
                    />
                    <div className="absolute inset-0 bg-stone-900/10"></div>
                  </div>
                ))}
              </div>

              {/* Main Product Image */}
              <div className="flex-1">
                <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-stone-100 dark:bg-stone-800 shadow-2xl group border border-stone-200 dark:border-stone-700">
                  <Image
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-stone-900/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Heritage Badge */}
                  <div className="absolute top-4 left-4 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 px-3 py-1.5 rounded-md text-xs font-bold shadow-lg">
                    ✨ HANDCRAFTED
                  </div>

                  {/* Product Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-stone-900/60 to-transparent opacity-60"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-sm font-medium opacity-90">
                      Traditional {product.work}
                    </p>
                    <p className="text-xs opacity-75">From {product.origin}</p>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="hidden md:block mt-6 pt-6 border-t-2 border-stone-200 dark:border-stone-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <WhatsAppButton
                      productName={product.name}
                      product={product}
                    />
                    <button className="bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-white px-6 py-3 rounded-md font-semibold hover:bg-stone-200 dark:hover:bg-stone-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg transform hover:scale-105 border border-stone-300 dark:border-stone-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Product Information */}
            <div className="space-y-8 animate-fade-in-up">
              {/* Enhanced Product Title & Price */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-4 py-2 rounded-md text-sm font-semibold border border-stone-200 dark:border-stone-700">
                      🏛️ {product.origin}
                    </span>
                    <span className="bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 px-4 py-2 rounded-md text-sm font-semibold border border-stone-300 dark:border-stone-600">
                      🎭 {product.occasion}
                    </span>
                  </div>

                  <h1 className="font-fira-sans text-4xl md:text-5xl lg:text-6xl font-bold text-stone-900 dark:text-stone-100 leading-tight">
                    {product.name}
                  </h1>

                  <div className="flex items-center space-x-4 bg-stone-100 dark:bg-stone-800 p-4 rounded-md border border-stone-200 dark:border-stone-700">
                    <div className="w-12 h-12 bg-stone-700 dark:bg-stone-300 rounded-md flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white dark:text-stone-900"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-lg text-stone-700 dark:text-stone-200 font-semibold">
                        Traditional {product.work} Craft
                      </p>
                      <p className="text-sm text-stone-600 dark:text-stone-300">
                        Authentic handwork from {product.origin}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Pricing Section - Mobile Optimized */}
                <div className="bg-gradient-to-br from-white to-stone-50 dark:from-stone-800 dark:to-stone-900 p-4 sm:p-6 rounded-xl shadow-xl border border-stone-200 dark:border-stone-700 animate-fade-in-up overflow-hidden relative">
                  {/* Decorative background elements */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-stone-100 dark:bg-stone-700 rounded-full opacity-50 -translate-y-10 translate-x-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-stone-200 dark:bg-stone-600 rounded-full opacity-30 translate-y-8 -translate-x-8"></div>

                  {/* Price Section */}
                  <div className="relative z-10 mb-6">
                    <div className="flex flex-col space-y-3 mb-4">
                      {/* Price with discount */}
                      <div className="flex items-center flex-wrap gap-2">
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 font-fira-sans tracking-tight">
                          {product.price}
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="text-lg sm:text-xl text-stone-500 dark:text-stone-400 line-through opacity-75 font-medium">
                              {product.originalPrice}
                            </span>
                            <div className="relative bg-gradient-to-r from-stone-800 to-stone-900 dark:from-stone-200 dark:to-stone-400 text-white dark:text-stone-900 px-3 py-1.5 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full animate-[slide_2s_infinite] w-full h-full"></div>
                              <FiArrowDown className="text-sm animate-bounce relative z-10" />
                              <span className="relative z-10">
                                {Math.round(
                                  ((parseInt(
                                    product.originalPrice.replace(/[^\d]/g, "")
                                  ) -
                                    parseInt(
                                      product.price.replace(/[^\d]/g, "")
                                    )) /
                                    parseInt(
                                      product.originalPrice.replace(
                                        /[^\d]/g,
                                        ""
                                      )
                                    )) *
                                    100
                                )}
                                % OFF
                              </span>
                            </div>
                          </>
                        )}
                        <div className="hidden md:inline-block ml-12">
                          <WhatsAppButton
                            productName={product.name}
                            product={product}
                          />
                        </div>
                      </div>

                      {/* Limited time offer badge */}
                      <div className="inline-flex items-center gap-2 bg-stone-100 dark:bg-stone-900 text-stone-800 dark:text-stone-200 px-3 py-2 rounded-lg text-sm font-semibold w-fit">
                        <span className="w-2 h-2 bg-stone-500 rounded-full animate-pulse"></span>
                        Limited Collection • Handpicked
                      </div>
                    </div>

                    {/* WhatsApp Button - Mobile First */}
                    <div className="mb-6 md:hidden">
                      <div className="transform hover:scale-105 transition-all duration-300">
                        <WhatsAppButton
                          productName={product.name}
                          product={product}
                        />
                      </div>
                    </div>

                    {/* Rating and Stock Status */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 mb-6">
                      <div className="flex items-center space-x-2 group">
                        <div className="flex items-center space-x-1">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-5 h-5 text-amber-500 dark:text-amber-400 fill-current transform group-hover:scale-110 transition-transform duration-200"
                              style={{ animationDelay: `${i * 100}ms` }}
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-stone-600 dark:text-stone-300 font-medium">
                          5.0{" "}
                          <span className="hidden sm:inline">
                            (24+ happy customers)
                          </span>
                          <span className="inline sm:hidden">(24+)</span>
                        </span>
                        <div className="italic text-green-800 dark:text-green-200 px-3 py-1.5 text-sm font-semibold">
                          Ready to Ship
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Feature Cards - Mobile Optimized */}
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="group relative bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-700 dark:to-stone-800 p-4 rounded-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-stone-200/20 dark:to-stone-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 text-center">
                          <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                            🏆
                          </div>
                          <div className="text-xs font-bold text-stone-900 dark:text-white mb-1">
                            100%
                          </div>
                          <div className="text-xs text-stone-600 dark:text-stone-300 leading-tight">
                            Authentic
                          </div>
                        </div>
                      </div>

                      <div
                        className="group relative bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-700 dark:to-stone-800 p-4 rounded-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                        style={{ animationDelay: "150ms" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-stone-200/20 dark:to-stone-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 text-center">
                          <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                            ✋
                          </div>
                          <div className="text-xs font-bold text-stone-900 dark:text-white mb-1">
                            Hand
                          </div>
                          <div className="text-xs text-stone-600 dark:text-stone-300 leading-tight">
                            Crafted
                          </div>
                        </div>
                      </div>

                      <div
                        className="group relative bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-700 dark:to-stone-800 p-4 rounded-xl transform hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
                        style={{ animationDelay: "300ms" }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-stone-200/20 dark:to-stone-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10 text-center">
                          <div className="text-2xl mb-2 transform group-hover:scale-110 transition-transform duration-300">
                            💎
                          </div>
                          <div className="text-xs font-bold text-stone-900 dark:text-white mb-1">
                            Premium
                          </div>
                          <div className="text-xs text-stone-600 dark:text-stone-300 leading-tight">
                            Quality
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile-First Trust Indicators */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2 bg-stone-100 dark:bg-stone-900/30 p-3 rounded-lg">
                        <div className="w-8 h-8 bg-stone-200 dark:bg-stone-800 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-stone-700 dark:text-stone-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                            Free Ship
                          </div>
                          <div className="text-xs text-stone-700 dark:text-stone-300">
                            Pan India
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 bg-stone-100 dark:bg-stone-900/30 p-3 rounded-lg">
                        <div className="w-8 h-8 bg-stone-200 dark:bg-stone-800 rounded-full flex items-center justify-center">
                          <svg
                            className="w-4 h-4 text-stone-700 dark:text-stone-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                            Easy Return
                          </div>
                          <div className="text-xs text-stone-700 dark:text-stone-300">
                            7 Days
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Description */}
                <div className="bg-stone-100 dark:bg-stone-800 p-6 rounded-md border border-stone-200 dark:border-stone-700">
                  <h3 className="text-2xl font-fira-sans font-bold text-stone-900 dark:text-white mb-4 flex items-center">
                    <span className="w-8 h-8 rounded-md flex items-center justify-center mr-3">
                      📜
                    </span>
                    The Story
                  </h3>
                  <p className="text-stone-700 dark:text-stone-200 leading-relaxed text-lg mb-4">
                    {product.description}
                  </p>
                  <p className="text-stone-600 dark:text-stone-300 leading-relaxed italic border-l-4 border-stone-300 dark:border-stone-600 pl-4">
                    "Each thread tells a story of heritage, each motif carries
                    the legacy of generations of master craftsmen. This isn't
                    just clothing - it's wearable art that celebrates the
                    timeless beauty of Indian craftsmanship."
                  </p>
                </div>

                {/* Enhanced Product Details Grid */}
                <div className="grid grid-cols-1 gap-6">
                  {/* Fabric & Craft Details */}
                  <div className="bg-white dark:bg-stone-800 p-6 rounded-md shadow-lg border border-stone-200 dark:border-stone-700">
                    <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-4 flex items-center">
                      <span className="w-8 h-8 rounded-md flex items-center justify-center mr-2 text-white dark:text-stone-900 text-xl">
                        🧵
                      </span>
                      Fabric & Craft
                    </h3>
                    <div className="space-y-4">
                      {[
                        { label: "Fabric", value: product.fabric, icon: "🪡" },
                        {
                          label: "Craft Work",
                          value: product.work,
                          icon: "✨",
                        },
                        { label: "Origin", value: product.origin, icon: "🏛️" },
                        {
                          label: "Occasion",
                          value: product.occasion,
                          icon: "🎭",
                        },
                      ].map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-700 rounded-md"
                        >
                          <span className="flex items-center text-stone-600 dark:text-stone-300">
                            <span className="mr-2">{detail.icon}</span>
                            {detail.label}:
                          </span>
                          <span className="font-semibold text-stone-900 dark:text-white">
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Care & Specifications */}
                  <div className="bg-white dark:bg-stone-800 p-6 rounded-md shadow-lg border border-stone-200 dark:border-stone-700">
                    <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-4 flex items-center">
                      <span className="w-8 h-8 rounded-md flex items-center justify-center mr-2 text-white dark:text-stone-900 text-xl">
                        💎
                      </span>
                      Care & Details
                    </h3>
                    <div className="space-y-4">
                      {[
                        {
                          label: "Care Instructions",
                          value: product.care,
                          icon: "🧼",
                        },
                        ...(product.length
                          ? [
                              {
                                label: "Length",
                                value: product.length,
                                icon: "📏",
                              },
                            ]
                          : []),
                        ...(product.blouse
                          ? [
                              {
                                label: "Blouse",
                                value: product.blouse,
                                icon: "👚",
                              },
                            ]
                          : []),
                        ...(product.fit
                          ? [{ label: "Fit", value: product.fit, icon: "👗" }]
                          : []),
                      ].map((detail, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-stone-50 dark:bg-stone-700 rounded-md"
                        >
                          <span className="flex items-center text-stone-600 dark:text-stone-300">
                            <span className="mr-2">{detail.icon}</span>
                            {detail.label}:
                          </span>
                          <span className="font-semibold text-stone-900 dark:text-white text-right flex-1 ml-2">
                            {detail.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Enhanced Features Section */}
                {product.features && product.features.length > 0 && (
                  <div className="bg-stone-100 dark:bg-stone-800 p-6 rounded-md border border-stone-200 dark:border-stone-700">
                    <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-4 flex items-center">
                      <span className="w-8 h-8 rounded-md flex items-center justify-center mr-3 text-white dark:text-stone-900">
                        ⭐
                      </span>
                      Authentic Features
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 bg-white dark:bg-stone-700 rounded-md border border-stone-200 dark:border-stone-600"
                        >
                          <div className="w-6 h-6 bg-stone-700 dark:bg-stone-300 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-3 h-3 text-white dark:text-stone-900"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={3}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <span className="text-stone-700 dark:text-stone-200 font-medium">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Action Buttons */}
                <div className="space-y-6 pt-6 border-t-2 border-stone-200 dark:border-stone-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <WhatsAppButton
                      productName={product.name}
                      product={product}
                    />
                    <button className="bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-white px-6 py-3 rounded-md font-semibold hover:bg-stone-200 dark:hover:bg-stone-600 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg transform hover:scale-105 border border-stone-300 dark:border-stone-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                      Add to Wishlist
                    </button>
                  </div>

                  {/* Enhanced Trust Indicators */}
                  <div className="bg-white dark:bg-stone-800 p-6 rounded-md shadow-lg border border-stone-200 dark:border-stone-700">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                      <div className="flex flex-col items-center p-3">
                        <div className="w-12 h-12 bg-stone-600 dark:bg-stone-400 rounded-md flex items-center justify-center mb-2">
                          <svg
                            className="w-6 h-6 text-white dark:text-stone-900"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-stone-900 dark:text-white">
                          Free Shipping
                        </span>
                        <span className="text-xs text-stone-600 dark:text-stone-300">
                          Pan India
                        </span>
                      </div>

                      <div className="flex flex-col items-center p-3">
                        <div className="w-12 h-12 bg-stone-600 dark:bg-stone-400 rounded-md flex items-center justify-center mb-2">
                          <svg
                            className="w-6 h-6 text-white dark:text-stone-900"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-stone-900 dark:text-white">
                          Easy Returns
                        </span>
                        <span className="text-xs text-stone-600 dark:text-stone-300">
                          7 Days
                        </span>
                      </div>

                      <div className="flex flex-col items-center p-3">
                        <div className="w-12 h-12 bg-stone-600 dark:bg-stone-400 rounded-md flex items-center justify-center mb-2">
                          <svg
                            className="w-6 h-6 text-white dark:text-stone-900"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-stone-900 dark:text-white">
                          Authentic
                        </span>
                        <span className="text-xs text-stone-600 dark:text-stone-300">
                          Guaranteed
                        </span>
                      </div>

                      <div className="flex flex-col items-center p-3">
                        <div className="w-12 h-12 bg-stone-600 dark:bg-stone-400 rounded-md flex items-center justify-center mb-2">
                          <svg
                            className="w-6 h-6 text-white dark:text-stone-900"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <span className="text-sm font-semibold text-stone-900 dark:text-white">
                          Handcrafted
                        </span>
                        <span className="text-xs text-stone-600 dark:text-stone-300">
                          Heritage
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-20">
              <div className="text-center mb-12">
                <h2 className="font-fira-sans pb-2 text-4xl md:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                  You Might Also Love
                </h2>
                <p className="text-xl text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
                  Discover more treasures from our curated collection of
                  traditional Indian craftsmanship
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProducts.map((relatedProduct, index) => (
                  <Link
                    key={relatedProduct.name}
                    href={`/product/${createSlug(relatedProduct.name)}`}
                    className="group block animate-fade-in-up"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="bg-white dark:bg-stone-800 rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600">
                      <div className="relative aspect-[4/5] overflow-hidden">
                        <Image
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-stone-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 right-4 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 px-3 py-1 rounded-md text-xs font-bold">
                          {relatedProduct.category.toUpperCase()}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-fira-sans text-xl font-bold text-stone-900 dark:text-white mb-2 group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors">
                          {relatedProduct.name}
                        </h3>
                        <p className="text-stone-600 dark:text-stone-300 text-sm mb-4 line-clamp-2">
                          Traditional {relatedProduct.work} from{" "}
                          {relatedProduct.origin}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-fira-sans">
                            {relatedProduct.price}
                          </span>
                          <div className="bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 px-4 py-2 rounded-md text-sm font-semibold transform group-hover:scale-105 transition-transform">
                            View Details
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      {/* Footer */}
      <div className="mt-12 sm:mt-16 pb-4 sm:pb-6 text-center opacity-30 px-4">
        <p className="font-fira-sans text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-wider text-stone-800 dark:text-stone-200">
          JAGJIT KAUR - Crafted with love
        </p>
        <p className="mt-1 text-sm sm:text-base lg:text-lg text-stone-600 dark:text-stone-400">
          Where tradition meets elegance
        </p>
      </div>
    </>
  );
}

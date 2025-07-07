// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";

// export default function ProductCard({ product }) {
//   const [isHovered, setIsHovered] = useState(false);
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const formatDate = (date) => {
//     if (!date) return "";
//     return new Intl.DateTimeFormat("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     }).format(new Date(date));
//   };

//   function createSlug(name) {
//     return name
//       .toLowerCase()
//       .replace(/[^a-z0-9\s]/g, '') // Remove special characters
//       .replace(/\s+/g, '-') // Replace spaces with hyphens
//       .trim();
//   }

//   // Stone-themed Badge components
//   const Badge = ({ type, text }) => {
//     const styles = {
//       origin:
//         "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-600",
//       fabric:
//         "bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-400 dark:border-stone-500",
//       work: 
//         "bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700",
//     };

//     return (
//       <span
//         className={`${styles[type]} px-3 py-1 rounded-md text-xs font-medium tracking-wide`}
//       >
//         {text}
//       </span>
//     );
//   };

//   // Stone-themed Icon components
//   const IconButton = ({ children, className, title }) => (
//     <button
//       className={`bg-white/95 dark:bg-stone-900/95 backdrop-blur-md text-stone-700 dark:text-stone-300 p-3 rounded-md hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl border border-stone-200 dark:border-stone-700 ${className}`}
//       title={title}
//     >
//       {children}
//     </button>
//   );

//   return (
//     <div
//       className="group relative bg-white dark:bg-stone-900 rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Subtle backdrop */}
//       <div className="absolute inset-0 bg-stone-50/40 dark:bg-stone-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

//       {/* Product Image Section */}
//       <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-stone-800">
//         <Image
//           src={product.image}
//           alt={product.name}
//           loading="lazy"
//           fill
//           className={`object-cover transition-all duration-500 ease-out ${
//             isHovered ? "scale-105" : "scale-100"
//           } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
//           onLoad={() => setImageLoaded(true)}
//         />

//         {/* Loading skeleton */}
//         {!imageLoaded && (
//           <div className="absolute inset-0 bg-stone-200 dark:bg-stone-700">
//             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-stone-600/20 to-transparent animate-shimmer"></div>
//           </div>
//         )}

//         {/* Overlay */}
//         <div
//           className={`absolute inset-0 bg-stone-900/40 transition-all duration-300 ${
//             isHovered ? "opacity-100" : "opacity-0"
//           }`}
//         ></div>

//         {/* Action overlay */}
//         <div
//           className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
//             isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
//           }`}
//         >
//           <div className="flex space-x-4">
//             <Link
//               href={`/product/${createSlug(product.name)}`}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md text-stone-700 dark:text-stone-300 p-4 rounded-md hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300 transform hover:scale-110 shadow-xl border border-stone-200 dark:border-stone-700"
//               title="View Details"
//             >
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                 />
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
//                 />
//               </svg>
//             </Link>

//             <IconButton title="Add to Wishlist">
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
//                 />
//               </svg>
//             </IconButton>
//           </div>
//         </div>

//         {/* Heritage badge */}
//         <div className="absolute top-4 left-4 z-10">
//           <div className="bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 text-xs font-bold px-3 py-1.5 rounded-md shadow-lg">
//             <span className="flex items-center space-x-1">
//               <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21-.399-.328-.839-.328-1.296a.75.75 0 011.5 0c0 .457-.118.897-.328 1.296a35.539 35.539 0 011.558-.82.75.75 0 00.419-.74 41.029 41.029 0 00-.39-3.114A29.708 29.708 0 006 11.459zm8 0a29.848 29.848 0 012.455-1.158 41.029 41.029 0 01.39 3.114.75.75 0 01-.419.74c-.528.256-1.046.53-1.554.82.21-.399.328-.839.328-1.296a.75.75 0 00-1.5 0c0 .457.118.897.328 1.296a35.539 35.539 0 00-1.558-.82.75.75 0 01-.419-.74 41.029 41.029 0 01.39-3.114A29.708 29.708 0 0014 11.459z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span>Heritage</span>
//             </span>
//           </div>
//         </div>

//         {/* Exclusive badge if applicable */}
//         {product.originalPrice && (
//           <div className="absolute top-4 right-4 z-10">
//             <div className="bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 text-xs font-bold px-3 py-1 rounded-md shadow-lg">
//               Exclusive
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Product Info Section */}
//       <div className="p-6 space-y-4 relative">
//         {/* Decorative border */}
//         <div className="absolute top-0 left-6 right-6 h-px bg-stone-200 dark:bg-stone-700"></div>

//         {/* Header */}
//         <div className="space-y-3">
//           <div className="space-y-2">
//             <h3 className="font-fira-sans text-xl font-semibold text-stone-900 dark:text-stone-100 leading-tight group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors duration-300">
//               {product.name}
//             </h3>

//             {/* Subtitle */}
//             <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">
//               Traditional {product.work} • Artisan Heritage
//             </p>
//           </div>

//           {/* Badges */}
//           <div className="flex items-center gap-2 flex-wrap">
//             <Badge type="origin" text={product.origin} />
//             <Badge type="fabric" text={product.fabric} />
//           </div>

//           {/* Rating and certification */}
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-2">
//               <div className="flex items-center space-x-1">
//                 {[...Array(5)].map((_, i) => (
//                   <svg
//                     key={i}
//                     className="w-4 h-4 text-amber-500 dark:text-amber-400 fill-current"
//                     viewBox="0 0 24 24"
//                   >
//                     <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
//                   </svg>
//                 ))}
//               </div>
//               <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
//                 (24 reviews)
//               </span>
//             </div>

//             {/* Authenticity mark */}
//             <div className="flex items-center space-x-1 text-xs text-stone-700 dark:text-stone-300">
//               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
//                 <path
//                   fillRule="evenodd"
//                   d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                   clipRule="evenodd"
//                 />
//               </svg>
//               <span className="font-medium">Certified</span>
//             </div>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="space-y-2">
//           <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed line-clamp-2">
//             {product.description}
//           </p>
//         </div>

//         {/* Price Section */}
//         <div className="space-y-3">
//           <div className="flex items-center justify-between">
//             <div className="space-y-1">
//               <div className="flex items-center space-x-3">
//                 <span className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-fira-sans">
//                   {product.price}
//                 </span>
//                 {product.originalPrice && (
//                   <span className="text-lg text-stone-500 dark:text-stone-400 line-through font-medium">
//                     {product.originalPrice}
//                   </span>
//                 )}
//               </div>
//               <p className="text-xs text-stone-600 dark:text-stone-400 flex items-center font-medium">
//                 <svg
//                   className="w-3 h-3 mr-1 text-stone-700 dark:text-stone-300"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path
//                     fillRule="evenodd"
//                     d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 Premium Collection
//               </p>
//             </div>

//             <div
//               className={`transition-all duration-300 transform ${
//                 isHovered ? "opacity-100" : "opacity-90"
//               }`}
//             >
//               <Link
//                 href={`/product/${createSlug(product.name)}`}
//                 className="bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-4 py-3 rounded-md text-sm font-semibold transition-all duration-300 text-center border border-stone-600 dark:border-stone-400 hover:shadow-lg transform hover:scale-105"
//               >
//                 View Details
//               </Link>
//             </div>
//           </div>
//         </div>

//         {product.createdAt && (
//           <div className="absolute top-4 right-6 flex items-center gap-1.5 group-hover:opacity-100 opacity-70 transition-opacity duration-300">
//             <svg 
//               className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" 
//               fill="none" 
//               strokeLinecap="round" 
//               strokeLinejoin="round" 
//               strokeWidth="2" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
//             </svg>
//             <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
//               {formatDate(product.createdAt)}
//             </span>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiHeart, FiShoppingBag, FiEye, FiStar } from "react-icons/fi";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .trim();
  }


  
const testNames = [
  "Noor Sharara 3 Piece Set",
  "Royal Sharara 3 Piece Set",
  "Mehendi Palazzo 3 Piece Set"
];

console.log("Testing slug generation:");
testNames.forEach(name => {
  console.log(`"${name}" -> "${createSlug(name)}"`);
});

  // Stone-themed Badge components
  const Badge = ({ type, text }) => {
    const badgeStyles = {
      'best-seller': 'bg-amber-100 text-amber-800 border-amber-200',
      'new': 'bg-emerald-100 text-emerald-800 border-emerald-200',
      'premium': 'bg-purple-100 text-purple-800 border-purple-200',
      'sale': 'bg-red-100 text-red-800 border-red-200',
      'default': 'bg-stone-100 text-stone-800 border-stone-200'
    };

    return (
      <span className={`absolute ${type != 'new'? 'right-3' : 'left-3'} top-3 px-2 py-1 text-xs font-medium rounded-full border ${badgeStyles[type] || badgeStyles.default} z-10`}>
        {text}
      </span>
    );
  };

  // Stone-themed Icon components
  const IconButton = ({ children, className, title }) => (
    <button
      className={`bg-white/95 dark:bg-stone-900/95 backdrop-blur-md text-stone-700 dark:text-stone-300 p-3 rounded-md hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl border border-stone-200 dark:border-stone-700 ${className}`}
      title={title}
    >
      {children}
    </button>
  );

  return (
    <div
      className="group relative bg-white dark:bg-stone-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-stone-200 dark:border-stone-700"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover transition-all duration-700 ${
            isHovered ? 'scale-105' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Badges */}
        {product.badge && (
          <Badge 
            type={product.badge.toLowerCase().replace(' ', '-')} 
            text={product.badge}
          />
        )}
        
        {product.isNew && (
          <Badge type="new" text="New"/>
        )}

        {/* Hover Actions */}
        <div className={`absolute top-10 right-3 flex flex-col space-y-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
        }`}>
          <IconButton title="Add to Wishlist">
            <FiHeart className="w-4 h-4" />
          </IconButton>
          <IconButton title="Quick View">
            <FiEye className="w-4 h-4" />
          </IconButton>
          <IconButton title="Add to Cart">
            <FiShoppingBag className="w-4 h-4" />
          </IconButton>
        </div>

        {/* Quick Shop Overlay */}
        <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-all duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          <Link
            href={`/product/${createSlug(product.name)}`}
            className="bg-white dark:bg-stone-900 text-stone-900 dark:text-white px-6 py-2 rounded-md font-medium hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-300 transform hover:scale-105 shadow-lg border border-stone-200 dark:border-stone-700"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 space-y-3">
        {/* Product Name */}
        <div>
          <h3 className="font-medium text-stone-900 dark:text-white group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-1 line-clamp-1">
            {product.description}
          </p>
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-stone-300 dark:text-stone-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-stone-600 dark:text-stone-400">
              ({product.reviews} reviews)
            </span>
          </div>
        )}

        {/* Set Components Details - NEW SECTION */}
        {product.components && (
          <div className="space-y-3 mt-4 p-4 bg-stone-50 dark:bg-stone-800/50 rounded-md border border-stone-200 dark:border-stone-700">
            <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Set Includes:
            </h4>
            <div className="space-y-2">
              {Object.entries(product.components).map(([component, description]) => (
                <div key={component} className="text-xs">
                  <span className="font-medium text-stone-800 dark:text-stone-200 capitalize">
                    {component}:
                  </span>
                  <span className="text-stone-600 dark:text-stone-400 ml-1">
                    {description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Set Includes Tags - NEW SECTION */}
        {product.setIncludes && (
          <div className="flex flex-wrap gap-1 mt-3">
            {product.setIncludes.map((item, idx) => (
              <span
                key={idx}
                className="bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 px-2 py-1 rounded-full text-xs font-medium"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        {/* Product Features */}
        {product.features && (
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-2 py-1 rounded-full text-xs border border-stone-200 dark:border-stone-700"
              >
                {feature}
              </span>
            ))}
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-stone-900 dark:text-white">
              {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-stone-500 dark:text-stone-400 line-through">
                {product.originalPrice}
              </span>
            )}
          </div>
          {product.originalPrice && (
            <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
              Save {Math.round((1 - parseFloat(product.price.replace('₹', '').replace(',', '')) / parseFloat(product.originalPrice.replace('₹', '').replace(',', ''))) * 100)}%
            </span>
          )}
        </div>

        {/* Additional Product Info */}
        <div className="text-xs text-stone-500 dark:text-stone-400 space-y-1">
          {product.fabric && (
            <div className="flex justify-between">
              <span>Fabric:</span>
              <span className="font-medium">{product.fabric}</span>
            </div>
          )}
          {product.work && (
            <div className="flex justify-between">
              <span>Work:</span>
              <span className="font-medium">{product.work}</span>
            </div>
          )}
          {product.origin && (
            <div className="flex justify-between">
              <span>Origin:</span>
              <span className="font-medium">{product.origin}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
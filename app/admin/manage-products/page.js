"use client";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { 
  collection, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  orderBy,
  query 
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FiEdit3,
  FiTrash2,
  FiEye,
  FiSearch,
  FiFilter,
  FiGrid,
  FiList,
  FiPlus,
  FiArrowLeft,
  FiCalendar,
  FiDollarSign,
  FiTag,
  FiImage,
  FiAlertTriangle,
  FiCheck,
  FiX
} from "react-icons/fi";
import { Loading } from "@/components/Loading";

export default function ManageProductsPage() {
  const [user, loading] = useAuthState(auth);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, product: null });
  const [sortBy, setSortBy] = useState("newest");
  const router = useRouter();

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "pehchaan", label: "Collection - Pehchaan" },
    { value: "custom-made", label: "Custom Made" },
    { value: "potli-bags", label: "Potli Bags" },
  ];

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, searchQuery, selectedCategory, sortBy]);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Error loading products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.fabric && product.fabric.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (product.work && product.work.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return parseFloat(a.price) - parseFloat(b.price);
        case "oldest":
          return new Date(a.createdAt?.toDate() || 0) - new Date(b.createdAt?.toDate() || 0);
        case "newest":
        default:
          return new Date(b.createdAt?.toDate() || 0) - new Date(a.createdAt?.toDate() || 0);
      }
    });

    setFilteredProducts(filtered);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, "products", productId));
      setProducts(products.filter(p => p.id !== productId));
      setDeleteModal({ isOpen: false, product: null });
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again.");
    }
  };

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString();
  };

  const getMainImage = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images.find(img => img.isMain)?.url || product.images[0]?.url;
    }
    return product.image || "/images/placeholder.jpg";
  };

  if (loading || isLoading) {
    return <Loading type="page" message="Loading products..." />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-stone-200 dark:border-stone-700 pt-12 pb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-4 mb-2">
                <Link
                  href="/admin/dashboard"
                  className="flex items-center space-x-2 text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  <span className="text-sm">Back to Dashboard</span>
                </Link>
              </div>
              <h1 className="font-fira-sans text-3xl font-light text-stone-900 dark:text-stone-100 tracking-wide">
                MANAGE PRODUCTS
              </h1>
              <p className="text-stone-600 dark:text-stone-400 mt-1">
                Edit, delete, and organize your product listings
              </p>
            </div>
            <Link
              href="/admin/upload"
              className="flex items-center space-x-2 px-6 py-3 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300 font-fira-sans tracking-wide"
            >
              <FiPlus className="w-4 h-4" />
              <span>ADD NEW PRODUCT</span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="py-8 border-b border-stone-200 dark:border-stone-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                {products.length}
              </div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                {categories.length - 1}
              </div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                {filteredProducts.length}
              </div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Filtered Results</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                {products.filter(p => p.images && p.images.length > 1).length}
              </div>
              <div className="text-sm text-stone-600 dark:text-stone-400">Multi-Image Products</div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="py-8 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 focus:border-stone-800 dark:focus:border-stone-200 transition-all duration-300"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-2">
              <FiFilter className="w-4 h-4 text-stone-600 dark:text-stone-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 px-3 py-2 focus:border-stone-800 dark:focus:border-stone-200 transition-all duration-300"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Sort by:
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 px-3 py-2 focus:border-stone-800 dark:focus:border-stone-200 transition-all duration-300"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
                <option value="price">Price (Low-High)</option>
              </select>
            </div>

            <div className="flex items-center space-x-2 ml-auto">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 ${viewMode === "grid" ? "bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900" : "bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-400"} transition-all duration-300`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 ${viewMode === "list" ? "bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900" : "bg-stone-200 dark:bg-stone-700 text-stone-600 dark:text-stone-400"} transition-all duration-300`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid/List */}
        <div className="pb-16">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <FiTag className="w-16 h-16 text-stone-400 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-stone-900 dark:text-stone-100 mb-2">
                No products found
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Try adjusting your search or filters
              </p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 group"
                >
                  {/* Product Image */}
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <Image
                      src={getMainImage(product)}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.images && product.images.length > 1 && (
                      <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 text-xs rounded flex items-center">
                        <FiImage className="w-3 h-3 mr-1" />
                        {product.images.length}
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-medium text-stone-900 dark:text-stone-100 mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mb-2 capitalize">
                      {product.category?.replace('-', ' ')}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                        ₹{product.price}
                      </span>
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {formatDate(product.createdAt)}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/product/${createSlug(product.name)}`}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-600 transition-all duration-300"
                      >
                        <FiEye className="w-4 h-4" />
                        <span className="text-sm">View</span>
                      </Link>
                      <Link
                        href={`/admin/edit-product/${product.id}`}
                        className="flex-1 flex items-center justify-center space-x-1 px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                      >
                        <FiEdit3 className="w-4 h-4" />
                        <span className="text-sm">Edit</span>
                      </Link>
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, product })}
                        className="flex items-center justify-center px-3 py-2 bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 p-6"
                >
                  <div className="flex items-center space-x-6">
                    <div className="w-24 h-24 relative overflow-hidden bg-stone-100 dark:bg-stone-700 flex-shrink-0">
                      <Image
                        src={getMainImage(product)}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-stone-900 dark:text-stone-100 mb-1 truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-stone-600 dark:text-stone-400 mb-2 capitalize">
                        {product.category?.replace('-', ' ')}
                      </p>
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                          ₹{product.price}
                        </span>
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          Created: {formatDate(product.createdAt)}
                        </span>
                        {product.images && product.images.length > 1 && (
                          <span className="text-xs text-blue-600 dark:text-blue-400 flex items-center">
                            <FiImage className="w-3 h-3 mr-1" />
                            {product.images.length} images
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/product/${createSlug(product.name)}`}
                        className="flex items-center space-x-1 px-3 py-2 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-600 transition-all duration-300"
                      >
                        <FiEye className="w-4 h-4" />
                        <span className="text-sm">View</span>
                      </Link>
                      <Link
                        href={`/admin/edit-product/${product.id}`}
                        className="flex items-center space-x-1 px-3 py-2 bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
                      >
                        <FiEdit3 className="w-4 h-4" />
                        <span className="text-sm">Edit</span>
                      </Link>
                      <button
                        onClick={() => setDeleteModal({ isOpen: true, product })}
                        className="flex items-center space-x-1 px-3 py-2 bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
                      >
                        <FiTrash2 className="w-4 h-4" />
                        <span className="text-sm">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiAlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">
                Delete Product
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Are you sure you want to delete "{deleteModal.product?.name}"? This action cannot be undone.
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setDeleteModal({ isOpen: false, product: null })}
                className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all duration-300"
              >
                <FiX className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                onClick={() => handleDeleteProduct(deleteModal.product.id)}
                className="flex-1 flex items-center justify-center space-x-1 px-4 py-2 bg-red-500 text-white hover:bg-red-600 transition-all duration-300"
              >
                <FiTrash2 className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
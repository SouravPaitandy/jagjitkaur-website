"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import {
  collection,
  addDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import {
  FiArrowUp,
  FiUsers,
  FiUpload,
  FiHome,
  FiLock,
  FiUser,
  FiEye,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import { ensureAdminDocument } from "@/lib/adminSetup";

export default function AdminUpload({
  getInputProps,
  getRootProps,
  form,
  setForm,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [componentFields, setComponentFields] = useState([{ name: "", description: "" }]);

  // Ensure admin document exists
  useEffect(() => {
    if (user && !loading) {
      ensureAdminDocument(user);
    }
  }, [user, loading]);

  // Scroll-to-top button visibility logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setShowScrollToTop(scrollPosition >= documentHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Component field handlers
  const addComponentField = () => {
    setComponentFields([...componentFields, { name: "", description: "" }]);
  };

  const removeComponentField = (index) => {
    if (componentFields.length > 1) {
      setComponentFields(componentFields.filter((_, i) => i !== index));
    }
  };

  const handleComponentChange = (index, field, value) => {
    const updatedFields = componentFields.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    );
    setComponentFields(updatedFields);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-4 border-stone-200 border-t-stone-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-stone-700 dark:text-stone-300 font-medium text-base sm:text-lg">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-stone-800 p-6 sm:p-10 rounded-md shadow-2xl text-center border border-stone-200 dark:border-stone-700 max-w-md w-full">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-stone-100 dark:bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 text-stone-500 dark:text-stone-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L4.316 15.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h1 className="font-fira-sans text-xl sm:text-2xl font-bold text-stone-600 dark:text-stone-400 mb-2 sm:mb-3">
            Access Denied
          </h1>
          <p className="text-stone-600 dark:text-stone-300 text-base sm:text-lg">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // 🔧 Updated slug generation to match the one in page.js
  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation
    if (!form.name || !form.price || !form.image || !form.category) {
      alert(
        "Please fill in all required fields (name, price, image, category)"
      );
      setIsLoading(false);
      return;
    }

    const currentTimestamp = serverTimestamp();

    // 🔧 Convert component fields to object format
    const componentsObject = {};
    componentFields.forEach(field => {
      if (field.name.trim() && field.description.trim()) {
        componentsObject[field.name.trim().toLowerCase()] = field.description.trim();
      }
    });

    // 🔧 Updated data structure to match the expected format
    const data = {
      name: form.name,
      price: form.price,
      originalPrice: form.originalPrice || "",
      image: form.image,
      category: form.category,
      fabric: form.fabric || "",
      work: form.work || "",
      origin: form.origin || "",
      occasion: form.occasion || "",
      description: form.description || "",
      care: form.care || "",
      fit: form.fit || "",
      blouse: form.blouse || "",
      length: form.length || "",
      // 🔧 Updated features handling
      features: form.features
        ? form.features
            .split(",")
            .map((f) => f.trim())
            .filter((f) => f.length > 0)
        : [],
      // 🔧 Add components from component fields
      components: Object.keys(componentsObject).length > 0 ? componentsObject : null,
      setIncludes: form.setIncludes
        ? form.setIncludes
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item.length > 0)
        : [],
      // 🔧 Timestamps and metadata
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
      createdBy: user?.email || "admin",
      lastModifiedBy: user?.email || "admin",
    };

    try {
      // 🔧 Add document to Firestore and get the document reference
      const docRef = await addDoc(collection(db, "products"), data);

      // 🔧 Update the document with the firestoreId
      await updateDoc(docRef, {
        firestoreId: docRef.id,
      });

      alert("Product added successfully!");

      // Reset form
      setForm({
        name: "",
        price: "",
        originalPrice: "",
        image: "",
        category: "",
        fabric: "",
        work: "",
        origin: "",
        occasion: "",
        description: "",
        care: "",
        fit: "",
        blouse: "",
        length: "",
        features: "",
        setIncludes: "",
      });

      // Reset component fields
      setComponentFields([{ name: "", description: "" }]);
    } catch (err) {
      alert("Error uploading product. Please try again.");
      console.error("Upload error:", err);
    }
    setIsLoading(false);
  };

  // 🔧 Updated field labels to match new structure
  const fieldLabels = {
    name: "Product Name *",
    price: "Price *",
    originalPrice: "Original Price",
    image: "Image URL *",
    category: "Category *",
    fabric: "Fabric",
    work: "Work Type",
    origin: "Origin",
    occasion: "Occasion",
    description: "Description",
    care: "Care Instructions",
    fit: "Fit",
    blouse: "Blouse Details",
    length: "Length",
    features: "Features (comma-separated)",
    setIncludes: "Set Includes (comma-separated)",
  };

  const categories = [
    "sarees",
    "kurtas",
    "lehengas",
    "suits",
    "dupattas",
    "shararas",
    "palazzos",
    "potli-bags",
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`fixed bottom-16 right-6 z-50 transition-all duration-300 transform ${
            showScrollToTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        >
          <div
            className="p-3 rounded-full bg-stone-600 hover:bg-stone-700 dark:bg-stone-400 dark:hover:bg-stone-300 shadow-lg hover:shadow-stone-300/30 dark:hover:shadow-stone-500/20 text-white dark:text-stone-900 cursor-pointer backdrop-blur-sm transition-all duration-300 border border-stone-300 dark:border-stone-700"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <FiArrowUp className="text-xl" />
          </div>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="mb-6 sm:mb-8 pt-10">
          <nav className="flex items-center space-x-2 sm:space-x-3 text-xs sm:text-sm overflow-x-auto">
            <Link
              href="/"
              className="text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-medium flex items-center whitespace-nowrap"
            >
              <FiHome className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
              Home
            </Link>
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-stone-300 dark:text-stone-600"
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
              className="text-stone-600 dark:text-stone-400 hover:text-stone-stone-800 dark:hover:text-stone-200 transition-colors font-medium flex items-center whitespace-nowrap"
            >
              <svg
                className="w-3 h-3 sm:w-4 sm:h-4 mr-1"
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
              Collections
            </Link>
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-stone-300 dark:text-stone-600"
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
            <span className="text-stone-800 dark:text-stone-200 font-semibold whitespace-nowrap">
              Admin Dashboard
            </span>
          </nav>
        </div>

        {/* Header */}
        <div className="rounded-md shadow-xl border border-stone-200 dark:border-stone-700 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8 backdrop-blur-sm bg-white/95 dark:bg-stone-800/95">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-6 lg:space-y-0">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 lg:space-x-6 mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-stone-800 dark:bg-stone-400 rounded-md flex items-center justify-center shadow-lg">
                  <FiUpload className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white dark:text-stone-900" />
                </div>
                <div>
                  <h1 className="font-fira-sans text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-1 sm:mb-2">
                    Admin Dashboard
                  </h1>
                  <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base lg:text-lg">
                    Curate beautiful pieces for our collection
                  </p>
                </div>
              </div>

              {/* User Info */}
              <div className="bg-stone-100 dark:bg-stone-700 rounded-md p-4 sm:p-6 border border-stone-200 dark:border-stone-600">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-600 dark:bg-green-500 rounded-md flex items-center justify-center shadow-md">
                    <FiUser className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-semibold text-stone-700 dark:text-stone-200 mb-1">
                      Authenticated Administrator
                    </p>
                    <p className="text-stone-600 dark:text-stone-300 font-medium text-sm sm:text-base truncate">
                      {user?.email}
                    </p>
                  </div>
                  <div>
                    <span className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 border border-green-200 dark:border-green-700">
                      <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2 animate-pulse"></span>
                      Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-3 lg:ml-8">
              {/* Quick Navigation Links */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-md hover:bg-stone-50 dark:hover:bg-stone-600 hover:border-stone-400 dark:hover:border-stone-500 transition-all duration-200 shadow-sm"
                >
                  <FiHome className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  Home
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-md hover:bg-stone-50 dark:hover:bg-stone-600 hover:border-stone-400 dark:hover:border-stone-500 transition-all duration-200 shadow-sm"
                >
                  <FiEye className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  Collections
                </Link>
              </div>
              <LogoutButton />
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700 mb-6 sm:mb-8 rounded-md shadow-md">
          <div className="flex justify-between items-center py-3 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/change-password"
                className="flex items-center px-4 py-2 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-md transition-colors"
              >
                <FiLock className="w-4 h-4 mr-2" />
                Change Password
              </Link>

              {user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL && (
                <Link
                  href="/admin/manage"
                  className="flex items-center px-3 py-2 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-md transition-colors"
                >
                  <FiUsers className="w-4 h-4 mr-2" />
                  Manage Admins
                </Link>
              )}
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-md shadow-xl border border-stone-200 dark:border-stone-700 p-4 sm:p-6 lg:p-8 backdrop-blur-sm bg-white/95 dark:bg-stone-800/95">
          <div className="mb-6 sm:mb-8">
            <h2 className="font-fira-sans text-xl sm:text-2xl font-bold text-stone-900 dark:text-white mb-2">
              Add New Product
            </h2>
            <p className="text-stone-600 dark:text-stone-300 text-sm sm:text-base">
              Fill in the details to add a new piece to our exquisite collection
            </p>

            {/* URL preview section */}
            {form.name && (
              <div className="mt-4 p-3 bg-stone-100 dark:bg-stone-700 rounded-md border border-stone-200 dark:border-stone-600">
                <p className="text-stone-700 dark:text-stone-300 text-sm mb-1">
                  <strong>Product URL will be:</strong>
                </p>
                <p className="text-stone-600 dark:text-stone-400 text-xs font-mono">
                  /product/{createSlug(form.name)}
                </p>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
              {Object.keys(form)
                .filter((field) => field !== "image" && field !== "components") // 🔧 Filter out image and components (handled separately)
                .map((field) => (
                  <div
                    key={field}
                    className={field === "description" || field === "features" ? "md:col-span-2" : ""}
                  >
                    <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200 mb-2 sm:mb-3">
                      {fieldLabels[field] && fieldLabels[field].includes("*") && (
                        <span className="text-red-500 mr-1">*</span>
                      )}
                      {fieldLabels[field] ? fieldLabels[field].replace(" *", "") : field}
                    </label>
                    {field === "category" ? (
                      <select
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        className="w-full border-2 border-stone-200 dark:border-stone-600 rounded-md px-3 py-3 sm:px-4 sm:py-4 bg-white dark:bg-stone-700 text-stone-900 dark:text-white focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-500/30 focus:border-stone-500 transition-all duration-200 text-sm sm:text-base font-medium"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                          </option>
                        ))}
                      </select>
                    ) : field === "description" ? (
                      <textarea
                        name={field}
                        value={form[field]}
                        onChange={handleChange}
                        rows={4}
                        className="w-full border-2 border-stone-200 dark:border-stone-600 rounded-md px-3 py-3 sm:px-4 sm:py-4 bg-white dark:bg-stone-700 text-stone-900 dark:text-white focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-500/30 focus:border-stone-500 transition-all duration-200 text-sm sm:text-base font-medium resize-none"
                        placeholder="Describe the beauty and craftsmanship of this piece..."
                      />
                    ) : (
                      <input
                        name={field}
                        type="text"
                        value={form[field]}
                        onChange={handleChange}
                        className="w-full border-2 border-stone-200 dark:border-stone-600 rounded-md px-3 py-3 sm:px-4 sm:py-4 bg-white dark:bg-stone-700 text-stone-900 dark:text-white focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-500/30 focus:border-stone-500 transition-all duration-200 text-sm sm:text-base font-medium"
                        placeholder={
                          field === "features"
                            ? "Handwoven, Pure silk, Traditional motifs"
                            : field === "setIncludes"
                            ? "Kurti, Dupatta, Palazzo"
                            : field === "price" || field === "originalPrice"
                            ? "₹0,000"
                            : field === "fit"
                            ? "E.g. Regular"
                            : fieldLabels[field]
                            ? `Enter ${fieldLabels[field].replace(" *", "").toLowerCase()}...`
                            : `Enter ${field}...`
                        }
                        required={fieldLabels[field] && fieldLabels[field].includes("*")}
                      />
                    )}
                  </div>
                ))}

              {/* 🔧 Components Section - User-friendly interface */}
              <div className="md:col-span-2">
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200 mb-2 sm:mb-3">
                    Product Components
                  </label>
                  <p className="text-stone-600 dark:text-stone-400 text-sm mb-4">
                    Add components that are part of this outfit (e.g., Kurti, Dupatta, Palazzo)
                  </p>
                </div>
                
                {componentFields.map((component, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-3 mb-4 p-4 bg-stone-50 dark:bg-stone-700 rounded-md border border-stone-200 dark:border-stone-600">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Component name (e.g., Kurti)"
                        value={component.name}
                        onChange={(e) => handleComponentChange(index, 'name', e.target.value)}
                        className="w-full border-2 border-stone-200 dark:border-stone-600 rounded-md px-3 py-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-500/30 focus:border-stone-500 transition-all duration-200 text-sm font-medium"
                      />
                    </div>
                    <div className="flex-2">
                      <input
                        type="text"
                        placeholder="Component description (e.g., Cotton kurti with embroidery)"
                        value={component.description}
                        onChange={(e) => handleComponentChange(index, 'description', e.target.value)}
                        className="w-full border-2 border-stone-200 dark:border-stone-600 rounded-md px-3 py-2 bg-white dark:bg-stone-800 text-stone-900 dark:text-white focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-500/30 focus:border-stone-500 transition-all duration-200 text-sm font-medium"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={addComponentField}
                        className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                        title="Add component"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                      {componentFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeComponentField(index)}
                          className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
                          title="Remove component"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Image Upload Section */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200 mb-2 sm:mb-3">
                  <span className="text-red-500 mr-1">*</span>
                  Product Image
                </label>

                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-stone-300 dark:border-stone-500/30 rounded-md p-6 flex flex-col items-center justify-center bg-stone-50/50 dark:bg-stone-700/50 cursor-pointer hover:border-stone-400 dark:hover:border-stone-400/40 transition-all duration-200 group"
                >
                  <input {...getInputProps()} />
                  <div className="mb-4 p-3 rounded-full bg-stone-100 dark:bg-stone-600 group-hover:bg-stone-200 dark:group-hover:bg-stone-500 transition-colors">
                    <svg
                      className="w-8 h-8 text-stone-500 dark:text-stone-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-stone-600 dark:text-stone-400 font-medium mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-stone-500 dark:text-stone-400 text-sm text-center">
                    High quality images recommended (PNG, JPG)
                  </p>
                </div>

                {/* Image Preview Section */}
                {form.image && (
                  <div className="mt-4 p-4 bg-white dark:bg-stone-800 rounded-md border border-stone-200 dark:border-stone-700">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="relative group">
                        <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden border-2 border-stone-200 dark:border-stone-500/30">
                          <img
                            src={form.image}
                            alt="Product preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200 rounded-md">
                          <button
                            type="button"
                            onClick={() => setForm({ ...form, image: "" })}
                            className="p-1.5 bg-stone-600 rounded-full hover:bg-stone-700 transition-colors"
                          >
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                      <div>
                        <p className="text-stone-900 dark:text-white font-medium mb-1">
                          Image uploaded successfully
                        </p>
                        <p className="text-stone-500 dark:text-stone-400 text-sm">
                          Hover and click the delete button to remove image
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center sm:justify-end pt-6 sm:pt-8 border-t-2 border-stone-200 dark:border-stone-700">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 font-semibold text-base sm:text-lg rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 focus:outline-none focus:ring-4 focus:ring-stone-300 dark:focus:ring-stone-500/50 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white dark:border-stone-900 border-t-transparent mr-2 sm:mr-3"></div>
                    <span className="hidden sm:inline">Uploading Product...</span>
                    <span className="sm:hidden">Uploading...</span>
                  </>
                ) : (
                  <>
                    <FiUpload className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                    <span className="hidden sm:inline">Add to Collection</span>
                    <span className="sm:hidden">Add Product</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
      
      {/* Footer */}
      <div className="mt-12 sm:mt-16 pb-4 sm:pb-6 text-center opacity-30 px-4">
        <p className="font-fira-sans text-2xl sm:text-3xl lg:text-5xl font-extrabold tracking-wider text-stone-800 dark:text-stone-200">
          JAGJIT KAUR - Crafted with love
        </p>
        <p className="mt-1 text-sm sm:text-base lg:text-lg text-stone-600 dark:text-stone-400">
          Where tradition meets elegance
        </p>
      </div>
    </div>
  );
}
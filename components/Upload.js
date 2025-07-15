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
  FiBarChart,
  FiPackage,
  FiCamera,
  FiCheckCircle,
  FiX,
  FiStar,
  FiMove
} from "react-icons/fi";
import { ensureAdminDocument } from "@/lib/adminSetup";
import Image from "next/image";

export default function AdminUpload({
  getInputProps,
  getRootProps,
  form,
  setForm,
  uploading,
  uploadProgress,
  removeImage,
  setMainImage,
  reorderImages,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [componentFields, setComponentFields] = useState([{ name: "", description: "" }]);
  const [draggedIndex, setDraggedIndex] = useState(null);

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

  const handleDragStart = (e, index) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, hoverIndex) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== hoverIndex) {
      reorderImages(draggedIndex, hoverIndex);
    }
    setDraggedIndex(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-stone-200 dark:border-stone-700 border-t-stone-800 dark:border-t-stone-200 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="font-fira-sans text-xl font-medium text-stone-800 dark:text-stone-200 tracking-wide">
            LOADING UPLOAD FORM
          </h2>
          <p className="font-fira-sans text-sm text-stone-600 dark:text-stone-400 mt-2 tracking-widest uppercase">
            Please wait...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-stone-900 p-8 border border-stone-200 dark:border-stone-700 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-6">
            <FiLock className="w-8 h-8 text-stone-600 dark:text-stone-400" />
          </div>
          <h1 className="font-fira-sans text-2xl font-semibold text-stone-800 dark:text-stone-200 mb-3 tracking-wide">
            ACCESS RESTRICTED
          </h1>
          <p className="font-fira-sans text-stone-600 dark:text-stone-400 text-sm tracking-wide">
            Authentication required to access this dashboard
          </p>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const createSlug = (name) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Basic validation - Updated to check for images array
    if (!form.name || !form.price || (!form.images || form.images.length === 0) || !form.category) {
      alert("Please fill in all required fields (name, price, images, category)");
      setIsLoading(false);
      return;
    }

    const currentTimestamp = serverTimestamp();

    // Convert component fields to object format
    const componentsObject = {};
    componentFields.forEach(field => {
      if (field.name.trim() && field.description.trim()) {
        componentsObject[field.name.trim().toLowerCase()] = field.description.trim();
      }
    });

    const data = {
      name: form.name,
      price: form.price,
      originalPrice: form.originalPrice || "",
      images: form.images, // Use images array instead of single image
      // Keep backward compatibility with single image field
      image: form.images && form.images.length > 0 ? form.images.find(img => img.isMain)?.url || form.images[0]?.url : "",
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
      features: form.features
        ? form.features
            .split(",")
            .map((f) => f.trim())
            .filter((f) => f.length > 0)
        : [],
      components: Object.keys(componentsObject).length > 0 ? componentsObject : null,
      setIncludes: form.setIncludes
        ? form.setIncludes
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item.length > 0)
        : [],
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
      createdBy: user?.email || "admin",
      lastModifiedBy: user?.email || "admin",
    };

    try {
      const docRef = await addDoc(collection(db, "products"), data);
      await updateDoc(docRef, {
        firestoreId: docRef.id,
      });

      alert("Product added successfully!");

      // Reset form
      setForm({
        name: "",
        price: "",
        originalPrice: "",
        images: [], // Reset images array
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

      setComponentFields([{ name: "", description: "" }]);
    } catch (err) {
      alert("Error uploading product. Please try again.");
      console.error("Upload error:", err);
    }
    setIsLoading(false);
  };

  const fieldLabels = {
    name: "Product Name *",
    price: "Price *",
    originalPrice: "Original Price",
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
    "sharara-sets",
    "palazzo-sets",
    "anarkali-sets",
    "gharara-sets",
    "kurti-sets",
    "co-ord-sets",
    "potli-bags",
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900">
      {/* Scroll to top button */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-500 transform ${
          showScrollToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="p-3 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300 hover:scale-105 shadow-lg"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="w-5 h-5" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-stone-200 dark:border-stone-700 pt-12 pb-6">
          <nav className="flex items-center space-x-2 text-xs tracking-widest text-stone-500 dark:text-stone-400 uppercase">
            <Link
              href="/"
              className="hover:text-stone-800 dark:hover:text-stone-200 transition-colors duration-300"
            >
              HOME
            </Link>
            <span>/</span>
            <Link
              href="/admin/dashboard"
              className="hover:text-stone-800 dark:hover:text-stone-200 transition-colors duration-300"
            >
              DASHBOARD
            </Link>
            <span>/</span>
            <span className="text-stone-800 dark:text-stone-200">
              UPLOAD
            </span>
          </nav>
        </div>

        {/* Header Section */}
        <div className="py-16 text-center border-b border-stone-200 dark:border-stone-700">
          <div className="mb-8 flex flex-col items-center justify-center">
            <Image src='/images/newlogo.png' alt="JK" height={90} width={90} className="text-center"/>
            <h1 className="font-fira-sans text-4xl md:text-5xl font-light text-stone-900 dark:text-stone-100 mb-4 tracking-wide">
              WELCOME TO THE PRODUCT UPLOAD 
            </h1>
            <p className="font-fira-sans text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto tracking-wide">
              Add exquisite pieces for our heritage collection
            </p>
          </div>

          {/* Admin Status Card */}
          <div className="max-w-md mx-auto bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-10 h-10 bg-stone-800 dark:bg-stone-200 flex items-center justify-center">
                <FiUser className="w-5 h-5 text-white dark:text-stone-900" />
              </div>
              <div className="text-left">
                <p className="font-fira-sans text-xs text-stone-600 dark:text-stone-400 font-medium tracking-widest uppercase">
                  Authenticated Administrator
                </p>
                <p className="font-fira-sans text-sm text-stone-800 dark:text-stone-200 font-medium tracking-wide">
                  {user?.email}
                </p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Main Form Section */}
        <div className="py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-fira-sans text-3xl font-light text-stone-900 dark:text-stone-100 mb-4 tracking-wide">
                ADD NEW PRODUCT
              </h2>
              <p className="font-fira-sans text-stone-600 dark:text-stone-400 tracking-wide">
                Fill in the details to add a new piece to our collection
              </p>

              {/* URL Preview */}
              {form.name && (
                <div className="mt-8 p-4 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-center">
                  <p className="font-fira-sans text-xs text-stone-600 dark:text-stone-400 font-medium tracking-widest uppercase mb-2">
                    Product URL Preview
                  </p>
                  <p className="font-fira-sans text-sm text-stone-800 dark:text-stone-200 font-mono">
                    /product/{createSlug(form.name)}
                  </p>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {Object.keys(form)
                  .filter((field) => field !== "images" && field !== "components")
                  .map((field) => (
                    <div
                      key={field}
                      className={field === "description" || field === "features" ? "md:col-span-2" : ""}
                    >
                      <label className="block font-fira-sans text-sm font-medium text-stone-800 dark:text-stone-200 mb-3 tracking-wide">
                        {fieldLabels[field] && fieldLabels[field].includes("*") && (
                          <span className="text-red-500 mr-2">*</span>
                        )}
                        {(fieldLabels[field] ? fieldLabels[field].replace(" *", "") : field).toUpperCase()}
                      </label>
                      {field === "category" ? (
                        <select
                          name={field}
                          value={form[field]}
                          onChange={handleChange}
                          className="w-full border border-stone-300 dark:border-stone-600 px-4 py-3 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-fira-sans text-sm focus:border-stone-800 dark:focus:border-stone-200 transition-all duration-300 hover:border-stone-400 dark:hover:border-stone-500"
                          required
                        >
                          <option value="">Select Category</option>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>
                              {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                            </option>
                          ))}
                        </select>
                      ) : field === "description" ? (
                        <textarea
                          name={field}
                          value={form[field]}
                          onChange={handleChange}
                          rows={4}
                          className="w-full border border-stone-300 dark:border-stone-600 px-4 py-3 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-fira-sans text-sm focus:border-stone-800 dark:focus:border-stone-200 transition-all duration-300 hover:border-stone-400 dark:hover:border-stone-500 resize-none"
                          placeholder="Describe the beauty and craftsmanship of this piece..."
                        />
                      ) : (
                        <input
                          name={field}
                          type="text"
                          value={form[field]}
                          onChange={handleChange}
                          className="w-full border border-stone-300 dark:border-stone-600 px-4 py-3 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-fira-sans text-sm focus:border-stone-800 dark:focus:border-stone-200 transition-all duration-300 hover:border-stone-400 dark:hover:border-stone-500"
                          placeholder={
                            field === "price" || field === "originalPrice"
                              ? "₹0,000"
                              : `Enter ${field}...`
                          }
                          required={fieldLabels[field] && fieldLabels[field].includes("*")}
                        />
                      )}
                    </div>
                  ))}
              </div>

              {/* Components Section */}
              <div className="border-t border-stone-200 dark:border-stone-700 pt-12">
                <div className="text-center mb-8">
                  <h3 className="font-fira-sans text-2xl font-light text-stone-900 dark:text-stone-100 mb-4 tracking-wide">
                    PRODUCT COMPONENTS
                  </h3>
                  <p className="font-fira-sans text-stone-600 dark:text-stone-400 tracking-wide">
                    Add components that are part of this outfit
                  </p>
                </div>
                
                {componentFields.map((component, index) => (
                  <div key={index} className="mb-6 p-6 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-fira-sans text-sm font-medium text-stone-800 dark:text-stone-200 mb-3 tracking-wide">
                          COMPONENT NAME
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Kurti"
                          value={component.name}
                          onChange={(e) => handleComponentChange(index, 'name', e.target.value)}
                          className="w-full border border-stone-300 dark:border-stone-600 px-4 py-3 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-fira-sans text-sm focus:border-stone-800 dark:focus:border-stone-200 transition-all duration-300"
                        />
                      </div>
                      <div>
                        <label className="block font-fira-sans text-sm font-medium text-stone-800 dark:text-stone-200 mb-3 tracking-wide">
                          COMPONENT DESCRIPTION
                        </label>
                        <input
                          type="text"
                          placeholder="e.g., Cotton kurti with embroidery"
                          value={component.description}
                          onChange={(e) => handleComponentChange(index, 'description', e.target.value)}
                          className="w-full border border-stone-300 dark:border-stone-600 px-4 py-3 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-fira-sans text-sm focus:border-stone-800 dark:focus:border-stone-200 transition-all duration-300"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-center space-x-4 mt-6">
                      <button
                        type="button"
                        onClick={addComponentField}
                        className="flex items-center space-x-2 px-4 py-2 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300 font-fira-sans text-sm tracking-wide"
                      >
                        <FiPlus className="w-4 h-4" />
                        <span>ADD COMPONENT</span>
                      </button>
                      {componentFields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeComponentField(index)}
                          className="flex items-center space-x-2 px-4 py-2 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300 font-fira-sans text-sm tracking-wide"
                        >
                          <FiMinus className="w-4 h-4" />
                          <span>REMOVE</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Multiple Images Upload Section */}
              <div className="border-t border-stone-200 dark:border-stone-700 pt-12">
                <div className="text-center mb-8">
                  <h3 className="font-fira-sans text-2xl font-light text-stone-900 dark:text-stone-100 mb-4 tracking-wide">
                    PRODUCT IMAGES *
                  </h3>
                  <p className="font-fira-sans text-stone-600 dark:text-stone-400 tracking-wide">
                    Upload multiple high-quality images of the product
                  </p>
                </div>

                {/* Upload Dropzone */}
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-stone-300 dark:border-stone-600 p-12 text-center cursor-pointer hover:border-stone-400 dark:hover:border-stone-500 transition-all duration-300"
                >
                  <input {...getInputProps()} />
                  <div className="w-16 h-16 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-6">
                    <FiCamera className="w-8 h-8 text-stone-600 dark:text-stone-400" />
                  </div>
                  <p className="font-fira-sans text-stone-800 dark:text-stone-200 font-medium mb-2 tracking-wide">
                    CLICK TO UPLOAD OR DRAG AND DROP
                  </p>
                  <p className="font-fira-sans text-stone-600 dark:text-stone-400 text-sm tracking-wide">
                    Multiple images supported (PNG, JPG, WebP) • Max 10 images
                  </p>
                </div>

                {/* Upload Progress */}
                {uploading && (
                  <div className="mt-6 space-y-3">
                    <p className="font-fira-sans text-stone-800 dark:text-stone-200 font-medium text-center tracking-wide">
                      UPLOADING IMAGES...
                    </p>
                    {uploadProgress.map((progress, index) => (
                      <div key={index} className="bg-stone-200 dark:bg-stone-700 rounded-full h-2">
                        <div
                          className="bg-stone-800 dark:bg-stone-200 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Uploaded Images Grid */}
                {form.images && form.images.length > 0 && (
                  <div className="mt-8 p-6 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                    <div className="text-center mb-6">
                      <p className="font-fira-sans text-stone-800 dark:text-stone-200 font-medium tracking-wide">
                        UPLOADED IMAGES ({form.images.length})
                      </p>
                      <p className="font-fira-sans text-stone-600 dark:text-stone-400 text-sm tracking-wide mt-2">
                        Drag images to reorder • Click star to set main image
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {form.images.map((image, index) => (
                        <div
                          key={index}
                          className="relative group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-600 overflow-hidden transition-all duration-300 hover:shadow-lg"
                          draggable
                          onDragStart={(e) => handleDragStart(e, index)}
                          onDragOver={handleDragOver}
                          onDrop={(e) => handleDrop(e, index)}
                        >
                          <div className="aspect-square relative">
                            <img
                              src={image.url}
                              alt={`Product image ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            
                            {/* Main image indicator */}
                            {image.isMain && (
                              <div className="absolute top-2 left-2 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-2 py-1 text-xs font-fira-sans tracking-wide flex items-center">
                                <FiStar className="w-3 h-3 mr-1" />
                                MAIN
                              </div>
                            )}
                            
                            {/* Overlay with actions */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                              <div className="flex space-x-2">
                                {!image.isMain && (
                                  <button
                                    type="button"
                                    onClick={() => setMainImage(index)}
                                    className="p-2 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300"
                                    title="Set as main image"
                                  >
                                    <FiStar className="w-4 h-4" />
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="p-2 bg-red-600 hover:bg-red-700 text-white transition-all duration-300"
                                  title="Remove image"
                                >
                                  <FiX className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            
                            {/* Drag handle */}
                            <div className="absolute top-2 right-2 text-white opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <FiMove className="w-4 h-4" />
                            </div>
                          </div>
                          
                          {/* Image info */}
                          <div className="p-3 bg-white dark:bg-stone-900">
                            <p className="font-fira-sans text-xs text-stone-600 dark:text-stone-400 truncate tracking-wide">
                              {image.originalName}
                            </p>
                            <p className="font-fira-sans text-xs text-stone-500 dark:text-stone-500 tracking-wide">
                              {Math.round(image.size / 1024)}KB
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="text-center pt-12 border-t border-stone-200 dark:border-stone-700">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-12 py-4 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 font-fira-sans font-medium tracking-widest hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white dark:border-stone-900 border-t-transparent rounded-full animate-spin"></div>
                      <span>UPLOADING...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <FiUpload className="w-5 h-5" />
                      <span>ADD TO COLLECTION</span>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-16 border-t border-stone-200 dark:border-stone-700">
          <p className="font-fira-sans text-xs tracking-widest text-stone-500 dark:text-stone-400 uppercase">
            JAGJIT KAUR • CRAFTED WITH LOVE
          </p>
        </div>
      </div>
    </div>
  );
}
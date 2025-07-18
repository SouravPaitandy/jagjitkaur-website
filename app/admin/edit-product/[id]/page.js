"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowLeft,
  FiSave,
  FiUpload,
  FiX,
  FiStar,
  FiMove,
  FiCamera,
  FiPlus,
  FiMinus,
  FiTrash2
} from "react-icons/fi";
import { Loading } from "@/components/Loading";

export default function EditProductPage({ params }) {
  const { id } = params;
  const [user, loading] = useAuthState(auth);
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);
  const [componentFields, setComponentFields] = useState([{ name: "", description: "" }]);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    images: [],
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

  const categories = [
    "pehchaan", // Collection - Pehchaan
    "potli-bags", // Potli Bags
    "custom-made", // Custom Made
  ];

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

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && id) {
      fetchProduct();
    }
  }, [user, id]);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const productData = docSnap.data();
        setProduct(productData);
        
        // Populate form
        setForm({
          name: productData.name || "",
          price: productData.price || "",
          originalPrice: productData.originalPrice || "",
          images: productData.images || (productData.image ? [{ url: productData.image, isMain: true }] : []),
          category: productData.category || "",
          fabric: productData.fabric || "",
          work: productData.work || "",
          origin: productData.origin || "",
          occasion: productData.occasion || "",
          description: productData.description || "",
          care: productData.care || "",
          fit: productData.fit || "",
          blouse: productData.blouse || "",
          length: productData.length || "",
          features: Array.isArray(productData.features) ? productData.features.join(", ") : "",
          setIncludes: Array.isArray(productData.setIncludes) ? productData.setIncludes.join(", ") : "",
        });

        // Set component fields
        if (productData.components) {
          const fields = Object.entries(productData.components).map(([name, description]) => ({
            name,
            description
          }));
          setComponentFields(fields.length > 0 ? fields : [{ name: "", description: "" }]);
        }
      } else {
        alert("Product not found!");
        router.push("/admin/manage-products");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      alert("Error loading product. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    setUploading(true);
    setUploadProgress(new Array(acceptedFiles.length).fill(0));

    const uploadPromises = acceptedFiles.map(async (file, index) => {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "jagjitkaur-site");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dwqf6wp14/image/upload",
          {
            method: "POST",
            body: data,
          }
        );

        const result = await res.json();

        if (res.ok) {
          setUploadProgress(prev => {
            const newProgress = [...prev];
            newProgress[index] = 100;
            return newProgress;
          });

          return {
            url: result.secure_url,
            publicId: result.public_id,
            originalName: file.name,
            size: file.size,
            isMain: form.images.length === 0 && index === 0,
          };
        } else {
          throw new Error(result.error?.message || "Upload failed");
        }
      } catch (err) {
        console.error("Upload error:", err);
        throw err;
      }
    });

    try {
      const uploadedImages = await Promise.all(uploadPromises);
      setForm(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));
    } catch (error) {
      alert("Some images failed to upload. Please try again.");
    } finally {
      setUploading(false);
      setUploadProgress([]);
    }
  }, [form.images.length]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true,
    maxFiles: 10
  });

  const removeImage = useCallback((index) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  }, []);

  const setMainImage = useCallback((index) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isMain: i === index
      }))
    }));
  }, []);

  const reorderImages = useCallback((dragIndex, hoverIndex) => {
    setForm(prev => {
      const newImages = [...prev.images];
      const draggedImage = newImages[dragIndex];
      newImages.splice(dragIndex, 1);
      newImages.splice(hoverIndex, 0, draggedImage);
      return { ...prev, images: newImages };
    });
  }, []);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    if (!form.name || !form.price || form.images.length === 0 || !form.category) {
      alert("Please fill in all required fields (name, price, images, category)");
      setIsSaving(false);
      return;
    }

    try {
      const currentTimestamp = serverTimestamp();

      // Convert component fields to object format
      const componentsObject = {};
      componentFields.forEach(field => {
        if (field.name.trim() && field.description.trim()) {
          componentsObject[field.name.trim().toLowerCase()] = field.description.trim();
        }
      });

      const updateData = {
        name: form.name,
        price: form.price,
        originalPrice: form.originalPrice || "",
        images: form.images,
        image: form.images.find(img => img.isMain)?.url || form.images[0]?.url || "",
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
          ? form.features.split(",").map(f => f.trim()).filter(f => f.length > 0)
          : [],
        components: Object.keys(componentsObject).length > 0 ? componentsObject : null,
        setIncludes: form.setIncludes
          ? form.setIncludes.split(",").map(item => item.trim()).filter(item => item.length > 0)
          : [],
        updatedAt: currentTimestamp,
        lastModifiedBy: user?.email || "admin",
      };

      await updateDoc(doc(db, "products", id), updateData);
      alert("Product updated successfully!");
      router.push("/admin/manage-products");
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Error updating product. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || isLoading) {
    return <Loading type="page" message="Loading product..." />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-stone-200 dark:border-stone-700 pt-12 pb-6">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/admin/manage-products"
                className="flex items-center space-x-2 text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors mb-4"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span className="text-sm">Back to Products</span>
              </Link>
              <h1 className="font-fira-sans text-3xl font-light text-stone-900 dark:text-stone-100 tracking-wide">
                EDIT PRODUCT
              </h1>
              <p className="text-stone-600 dark:text-stone-400 mt-1">
                Update product information and images
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="py-16">
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.keys(form)
                .filter(field => field !== "images" && field !== "components")
                .map(field => (
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
                        className="w-full border border-stone-300 dark:border-stone-600 px-4 py-3 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-fira-sans text-sm focus:border-stone-800 dark:focus:border-stone-200 transition-all duration-300"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(cat => (
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
                        className="w-full border border-stone-300 dark:border-stone-600 px-4 py-3 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-fira-sans text-sm focus:border-stone-800 dark:focus:border-stone-200 transition-all duration-300 resize-none"
                        placeholder="Describe the beauty and craftsmanship of this piece..."
                      />
                    ) : (
                      <input
                        name={field}
                        type="text"
                        value={form[field]}
                        onChange={handleChange}
                        className="w-full border border-stone-300 dark:border-stone-600 px-4 py-3 bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 font-fira-sans text-sm focus:border-stone-800 dark:focus:border-stone-200 transition-all duration-300"
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
                  Update components that are part of this outfit
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

            {/* Images Section */}
            <div className="border-t border-stone-200 dark:border-stone-700 pt-12">
              <div className="text-center mb-8">
                <h3 className="font-fira-sans text-2xl font-light text-stone-900 dark:text-stone-100 mb-4 tracking-wide">
                  PRODUCT IMAGES *
                </h3>
                <p className="font-fira-sans text-stone-600 dark:text-stone-400 tracking-wide">
                  Upload or manage product images
                </p>
              </div>

              {/* Current Images */}
              {form.images && form.images.length > 0 && (
                <div className="mb-8 p-6 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700">
                  <div className="text-center mb-6">
                    <p className="font-fira-sans text-stone-800 dark:text-stone-200 font-medium tracking-wide">
                      CURRENT IMAGES ({form.images.length})
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
                            {image.originalName || `Image ${index + 1}`}
                          </p>
                          {image.size && (
                            <p className="font-fira-sans text-xs text-stone-500 dark:text-stone-500 tracking-wide">
                              {Math.round(image.size / 1024)}KB
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
                  Add more images (PNG, JPG, WebP) • Max 10 images total
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
            </div>

            {/* Submit Button */}
            <div className="text-center pt-12 border-t border-stone-200 dark:border-stone-700">
              <div className="flex items-center justify-center space-x-4">
                <Link
                  href="/admin/manage-products"
                  className="px-8 py-4 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300 font-fira-sans tracking-wide"
                >
                  CANCEL
                </Link>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-12 py-4 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 font-fira-sans font-medium tracking-widest hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
                >
                  {isSaving ? (
                    <div className="flex items-center space-x-3">
                      <div className="w-5 h-5 border-2 border-white dark:border-stone-900 border-t-transparent rounded-full animate-spin"></div>
                      <span>SAVING...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-3">
                      <FiSave className="w-5 h-5" />
                      <span>SAVE CHANGES</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
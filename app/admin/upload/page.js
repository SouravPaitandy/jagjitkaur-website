"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import AdminUpload from "@/components/Upload";

export default function AdminUploadPage() {
  const [form, setForm] = useState({
    name: "",
    price: "",
    originalPrice: "",
    images: [], // Changed from 'image' to 'images' array
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

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState([]);

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
          // Update progress
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
            isMain: index === 0, // First image is main by default
          };
        } else {
          console.error("Upload failed:", result);
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
  }, []);

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

  const { getRootProps, getInputProps } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true,
    maxFiles: 10 // Limit to 10 images
  });

  return (
    <AdminUpload
      getInputProps={getInputProps}
      getRootProps={getRootProps}
      form={form}
      setForm={setForm}
      uploading={uploading}
      uploadProgress={uploadProgress}
      removeImage={removeImage}
      setMainImage={setMainImage}
      reorderImages={reorderImages}
    />
  );
}
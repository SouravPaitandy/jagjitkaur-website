"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import AdminUpload from "@/components/Upload";

export default function AdminUploadPage() {
  const [form, setForm] = useState({
    id: "",
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
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    const file = acceptedFiles[0];
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
        setForm((prev) => ({ ...prev, image: result.secure_url }));
      } else {
        console.error("Upload failed:", result);
        alert("Upload failed: " + result.error.message);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <AdminUpload
      getInputProps={getInputProps}
      getRootProps={getRootProps}
      form={form}
      setForm={setForm}
    />
  );
}

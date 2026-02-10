export const uploadToCloudinary = async (file) => {
  console.log("🔥 CLOUDINARY RAW UPLOAD RUNNING");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "notenest_raw_pdfs");

  // 🔥 IMPORTANT
  formData.append("resource_type", "raw");

  // ✅ YOU FORGOT THIS LINE BEFORE
  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dll2g5ykv/raw/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Cloudinary Error:", data);
    throw new Error("Upload failed");
  }

  return {
    url: data.secure_url,
    public_id: data.public_id,
  };
};


const CLOUD_NAME = "dnnbr4tuk";
const UPLOAD_PRESET = "unsigned_upload";

export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`, {
    method: "POST",
    body: formData
  });

  const data = await res.json();
  return data.secure_url; // this is your public image URL
}

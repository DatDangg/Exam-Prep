import { useRef } from "react";

function ImageUpload({ target, onInsertImage }) {
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const imageUrl = await uploadToCloudinary(file);
      const markdown = `![ảnh](${imageUrl})`;

      // Gọi callback để component cha xử lý cập nhật state
      onInsertImage?.(markdown);
    } catch (error) {
      console.error("Upload thất bại:", error);
      alert("Không thể upload ảnh lên Cloudinary.");
    }
  };

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "unsigned_exam_upload");

    const cloudName = "dlfq0hngz";
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Lỗi khi upload lên Cloudinary");
    }

    const data = await response.json();
    return data.secure_url;
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <button
        onClick={handleButtonClick}
        style={{
          padding: "6px 12px",
          backgroundColor: "#3498db",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          fontSize: "1.4rem",
          cursor: "pointer",
        }}
      >
        📷 Tải ảnh
      </button>
    </>
  );
}

export default ImageUpload;

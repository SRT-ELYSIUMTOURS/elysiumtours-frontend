import { useInput, useNotify } from "react-admin";
import { useState } from "react";
import { Box, Button, Typography, CircularProgress, IconButton } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DeleteIcon from "@mui/icons-material/Delete";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001/api/v2";

/**
 * Image upload field that uploads to Cloudinary via the backend media service.
 * Stores the returned URL in the form field.
 *
 * Usage: <ImageUploadField source="coverImage" label="Cover Image" />
 */
const ImageUploadField = ({ source, label = "Image", multiple = false }) => {
  const { field } = useInput({ source });
  const notify = useNotify();
  const [uploading, setUploading] = useState(false);

  const currentValue = field.value;
  const hasImage = multiple
    ? Array.isArray(currentValue) && currentValue.length > 0
    : !!currentValue;

  const uploadFile = async (file) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "elysium-tours");

    const res = await fetch(`${API_URL}/media/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || `Upload failed: ${res.status}`);
    }

    const data = await res.json();
    return data.url;
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploading(true);
    try {
      if (multiple) {
        const urls = await Promise.all(files.map(uploadFile));
        const existing = Array.isArray(currentValue) ? currentValue : [];
        field.onChange([...existing, ...urls]);
        notify(`${urls.length} image(s) uploaded`, { type: "success" });
      } else {
        const url = await uploadFile(files[0]);
        field.onChange(url);
        notify("Image uploaded", { type: "success" });
      }
    } catch (err) {
      console.error("[ImageUpload] error:", err);
      notify(err.message, { type: "error" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemove = (index) => {
    if (multiple) {
      const updated = [...currentValue];
      updated.splice(index, 1);
      field.onChange(updated);
    } else {
      field.onChange("");
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: "block" }}>
        {label}
      </Typography>

      {/* Preview */}
      {hasImage && (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 1 }}>
          {multiple ? (
            currentValue.map((url, i) => (
              <Box key={i} sx={{ position: "relative", width: 120, height: 80 }}>
                <img
                  src={url}
                  alt={`${label} ${i + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemove(i)}
                  sx={{ position: "absolute", top: -8, right: -8, bgcolor: "error.main", color: "white", "&:hover": { bgcolor: "error.dark" }, width: 24, height: 24 }}
                >
                  <DeleteIcon sx={{ fontSize: 14 }} />
                </IconButton>
              </Box>
            ))
          ) : (
            <Box sx={{ position: "relative", width: 200, height: 130 }}>
              <img
                src={currentValue}
                alt={label}
                style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 8 }}
              />
              <IconButton
                size="small"
                onClick={() => handleRemove()}
                sx={{ position: "absolute", top: -8, right: -8, bgcolor: "error.main", color: "white", "&:hover": { bgcolor: "error.dark" }, width: 24, height: 24 }}
              >
                <DeleteIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </Box>
          )}
        </Box>
      )}

      {/* Upload button */}
      <Button
        variant="outlined"
        component="label"
        startIcon={uploading ? <CircularProgress size={16} /> : <CloudUploadIcon />}
        disabled={uploading}
        size="small"
      >
        {uploading ? "Uploading..." : hasImage ? "Replace" : "Upload"}
        <input
          type="file"
          accept="image/*"
          hidden
          multiple={multiple}
          onChange={handleFileChange}
        />
      </Button>
    </Box>
  );
};

export default ImageUploadField;

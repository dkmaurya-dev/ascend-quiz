import axios from "axios";

const API_BASE =  "http://localhost:8000";

export async function generateFromPdf(
  file: File,
  onUploadProgress?: (p: number) => void
) {
  const form = new FormData();
  form.append("file", file);

  const resp = await axios.post(`${API_BASE}/generate-questions`, form, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (ev) => {
      if (ev.total && onUploadProgress) {
        onUploadProgress(Math.round((ev.loaded / ev.total) * 100));
      }
    },
    timeout: 920000,
  });

  return resp.data;
}

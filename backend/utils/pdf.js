import pdfParse from "pdf-parse";

export const extractTextFromPDF = async (buffer) => {
  if (!buffer) return "";
  const data = await pdfParse(buffer);
  // pdf-parse returns text with pages separated; keep non-empty pages similar to original
  const pages = (data.text || "").split(/\f|\r?\n\f/).map(p => p.trim()).filter(Boolean);
  // return array of pages joined with double newline to mimic Python behavior
  return pages.join("\n\n");
};

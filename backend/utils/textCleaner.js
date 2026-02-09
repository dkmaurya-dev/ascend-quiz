export const cleanResponseText = (text) => {
  if (!text) return "";
  let t = text.trim();

  // Remove code fences
  t = t.replace(/```json/gi, "").replace(/```/g, "").trim();

  // Try to extract JSON array first
  const arrStart = t.indexOf("[");
  const arrEnd = t.lastIndexOf("]");
  if (arrStart !== -1 && arrEnd !== -1 && arrEnd > arrStart) {
    return t.substring(arrStart, arrEnd + 1).trim();
  }

  // Else try to extract object
  const objStart = t.indexOf("{");
  const objEnd = t.lastIndexOf("}");
  if (objStart !== -1 && objEnd !== -1 && objEnd > objStart) {
    return t.substring(objStart, objEnd + 1).trim();
  }

  return t;
};

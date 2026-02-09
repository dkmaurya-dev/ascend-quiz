import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
export const callGemini = async (prompt) => {
  const GEMINI_URL = process.env.GEMINI_URL || "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent";
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not set in env");

  const data = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 13000 }
  };

  const url = `${GEMINI_URL}?key=${apiKey}`;
  const resp = await axios.post(url, data, { headers: { "Content-Type": "application/json" } });

  // debug print first chunk
  if (resp && resp.data) {
    try {
      const txt = resp.data.candidates?.[0]?.content?.parts?.[0]?.text;
      return txt || "";
    } catch (e) {
      return "";
    }
  }
  return "";
};

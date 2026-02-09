import axios from "axios";

export const callDeepSeek = async (prompt) => {
  const url = process.env.DEEP_SEEK_URL || "https://api.deepseek.com/chat/completions";
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) throw new Error("DEEPSEEK_API_KEY not set in env");

  const body = {
    model: "deepseek-chat",
    messages: [
      { role: "system", content: "You are a helpful assistant" },
      { role: "user", content: prompt }
    ],
    temperature: 0.2,
    stream: false
  };

  const resp = await axios.post(url, body, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    }
  });

  return resp.data?.choices?.[0]?.message?.content || "";
};

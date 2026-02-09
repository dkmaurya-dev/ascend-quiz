import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

import mongoose from "mongoose";
import { Worker } from "bullmq";
import { extractTextFromPDF } from "../utils/pdf.js";
import { splitDocument } from "../utils/chunker.js";
import { generatePrompt3 } from "../utils/prompt.js";
import { callGemini } from "../utils/gemini.js";
import { callDeepSeek } from "../utils/deepseek.js";
import { cleanResponseText } from "../utils/textCleaner.js";
import Questions from "../model/Questions.js";
import { redisPub } from "../redisPublisher.js";

// --------------------------
// 🔥 Validate ENV
// --------------------------
if (!process.env.MONGODB_URI) {
  throw new Error("❌ MONGODB_URI missing in .env");
}

// --------------------------
// 🔥 MongoDB Connect
// --------------------------
mongoose.set("bufferCommands", false);

try {
  console.log("📌 Connecting to MongoDB:", process.env.MONGODB_URI);
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("✅ Worker connected to MongoDB");
} catch (err) {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1);
}

// --------------------------
// 🚀 Redis Connection
// --------------------------
const connection = { host: "127.0.0.1", port: 6379 };

// --------------------------
// 🧠 WORKER
// --------------------------
const worker = new Worker(
  "question-queue",
  async (job) => {
    console.log("🚀 Worker Running:", job.id);

    const { fileBuffer, assessmentCode } = job.data;

    try {
      let finalText = null;

      if (fileBuffer) {
        const buffer = Buffer.from(fileBuffer, "base64");
        finalText = await extractTextFromPDF(buffer);
      }

      const chunks = splitDocument(finalText, 40000);
      const allResponses = [];

      for (const chunk of chunks) {
        const prompt = generatePrompt3(chunk);

        const response =
          process.env.MODEL_NAME === "deepseek"
            ? await callDeepSeek(prompt)
            : await callGemini(prompt);

        allResponses.push(cleanResponseText(response));
      }

      // --------------------------
      // 📌 Parse JSON From LLM
      // --------------------------
      let jsonOutput;

      if (process.env.MODEL_NAME === "deepseek") {
        const mergePrompt = `Combine JSON fragments into one valid JSON array:\n\n${allResponses.join(
          "\n"
        )}`;
        const merged = await callDeepSeek(mergePrompt);
        jsonOutput = JSON.parse(cleanResponseText(merged));
      } else {
        jsonOutput = JSON.parse(allResponses[0]);
      }

      // --------------------------
      // 📝 Save Questions
      // --------------------------
      await Questions.insertMany(
        jsonOutput.map((q) => ({
          assessmentCode,
          question: q.question,
          correct_answer: q.correct_answer,
          explanation: q.explanation,
          options: q.options,
          cognitive_level: q.cognitive_level,
          estimated_correct_pct: q.estimated_correct_pct,
          difficulty_label: q.difficulty_label || 1,
          reasoning: q.reasoning,
        }))
      );

      console.log("✔ Questions saved for assessment:", assessmentCode);

      await redisPub.publish(
        "assessment-status",
        JSON.stringify({
          assessmentCode,
          status: "success",
          message: "Assessment generated successfully",
        })
      );

      return { assessmentCode };
    } catch (err) {
      await redisPub.publish(
        "assessment-status",
        JSON.stringify({
          assessmentCode,
          status: "failed",
          message: err.message,
        })
      );

      console.error("❌ Worker failed:", err);
      throw err;
    }
  },
  { connection }
);

// --------------------------
// 📢 Worker Events
// --------------------------
worker.on("completed", (job, result) => {
  console.log(`✔ Job ${job.id} completed:`, result);
});

worker.on("failed", (job, err) => {
  console.error(`❌ Job ${job.id} failed:`, err.message);
});

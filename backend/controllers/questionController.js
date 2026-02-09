// import { extractTextFromPDF } from "../utils/pdf.js";
// import { splitDocument } from "../utils/chunker.js";
// import { generatePrompt,generatePrompt2,generatePrompt3 } from "../utils/prompt.js";
// import { callGemini } from "../utils/gemini.js";
// import { callDeepSeek } from "../utils/deepseek.js";
// import { cleanResponseText } from "../utils/textCleaner.js";

// export const askQuestion = async (req, res) => {
//   try {
//     // Accept either a direct question + document_text in JSON or a file upload (pdf)
//     const question = req.body.question || "Generate questions from the content";
//     let documentText = req.body.document_text;

//     if (!documentText && req.file) {
//       documentText = await extractTextFromPDF(req.file.buffer);
//     }

//     if (!documentText) {
//       return res.status(400).json({ error: "document_text (or file) is required" });
//     }

//     const chunks = splitDocument(documentText, 10000 * 4); // same chunk size logic

//     const allResponses = [];

//     for (const chunk of chunks) {
//       const prompt = generatePrompt3(chunk);
//       let responseText;
//       if ((process.env.MODEL_NAME || "gemini") === "deepseek") {
//         console.log("Using DeepSeek");
//         responseText = await callDeepSeek(prompt);
//       } else {
//         console.log("Using Gemini");
//         responseText = await callGemini(prompt);
//       }

//       if (!responseText) {
//         return res.status(500).json({ error: "Empty response from model" });
//       }

//       const cleaned = cleanResponseText(responseText);
//       allResponses.push(cleaned);
//     }

//     // If using DeepSeek to combine, call it. Otherwise, return combined raw array.
//     let combined = allResponses.join("\n\n");
//     if ((process.env.MODEL_NAME || "gemini") === "deepseek") {
//       const combinedPrompt = `Combine the following JSON fragments into one valid JSON array. If fragments include non-json text, extract the JSON parts and merge them. Output only the JSON array:\n\n${combined}`;
//       const combinedResp = await callDeepSeek(combinedPrompt);
//       const finalClean = cleanResponseText(combinedResp);
//       try {
//         return res.json(JSON.parse(finalClean));
//       } catch (e) {
//         return res.json({ raw: allResponses, parse_error: e.toString() });
//       }
//     }

//     // Default: try to parse first cleaned chunk as JSON, else return all cleaned
//     try {
//       const parsed = JSON.parse(allResponses[0]);
//       return res.json(parsed);
//     } catch (e) {
//       return res.json({ all_chunks: allResponses, parse_error: e.toString() });
//     }
//   } catch (error) {
//     console.error("Controller Error:", error);
//     res.status(500).json({ error: "Internal Server Error", detail: String(error) });
//   }
// };





import { Queue } from "bullmq";
import { generateUniqueString } from "../utils/utils.js";
import Assessment from "../model/Assessment.js";
const connection = { host: "127.0.0.1", port: 6379 };
const questionQueue = new Queue("question-queue", { connection });

export const askQuestion = async (req, res) => {
  try {
    console.log("askQuestion",req.body);
    const { teacher_id, title, description, pass_percent } = req.body;

    // PDF file case
    let fileBuffer = null;
    if ( req.file) {
      fileBuffer = req.file.buffer; 
    }

    if (!fileBuffer) {
      return res.status(400).json({ error: "File is required" });
    }
 const assessmentCode = generateUniqueString();

   
console.log(assessmentCode,"assessmentCodeassessmentCodeassessmentCodeassessmentCodeassessmentCode")
    // Create the job
    const job = await questionQueue.add("process-question", {
      fileBuffer: fileBuffer ? fileBuffer.toString("base64") : null,
      assessmentCode:assessmentCode,
    });
 const assessment = await Assessment.create({
      assessmentCode: assessmentCode,
      title: title || "Untitled",
      description: description || "",
      userId: teacher_id,
      fileName: req.file.originalname,
      passPercent: pass_percent,
      totalQuestions: 0,
      difficultyDistribution: "auto", // default to auto
      jobId: job.id,
      status: "generating",
    });

    // console.log("✔ Assessment saved:", assessment._id);
    return res.json({
      status: "queued",
      jobId: job.id,
      assessmentCode: assessmentCode,
      message: "Your request is being processed in background"
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal error" });
  }
};

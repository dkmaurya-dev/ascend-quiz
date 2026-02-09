import { askQuestion } from "./questionController.js";
import { generatePrompt } from "../utils/prompt.js";
import { callGemini } from "../utils/gemini.js";
import { callDeepSeek } from "../utils/deepseek.js";
import { cleanResponseText } from "../utils/textCleaner.js";
import { extractTextFromPDF } from "../utils/pdf.js";
import { splitDocument } from "../utils/chunker.js";
import Assessment from "../model/Assessment.js";
import Questions from "../model/Questions.js";
export const createAssessment = async (req, res) => {
  try {
    console.log("createAssessment",req.body);
    const assessmentCode = req.body.assessmentCode || "";
    const title = req.body.title || "";
    const description = req.body.description || "";
    const file_path = req.body.file_path || "";
    const totalQuestions = req.body.totalQuestions || 0;
    const difficultyDistribution = req.body.difficultyDistribution || "";
    const status = req.body.status || "";

    // if (!assessmentCode || !title || !description || !file_path || !totalQuestions || !difficultyDistribution || !status) {
    //   return res.status(400).json({ error: "assessmentCode, title, description, file_path, totalQuestions, difficultyDistribution, status are required" });
    // }
   const data=await askQuestion(req,res);
    const assessment = new Assessment({
      aassementCode: assessmentCode,
      title: title,
      description: description,
      file_path: file_path,
      totalQuestions: totalQuestions,
      difficultyDistribution: difficultyDistribution,
      status: status,
    });

    await assessment.save();
    const questions =new Questions({
      assessmentId:assessment._id,
      question:"test",
      correct_answer:"test",
      explanation:"test",
      options:["test"],
      cognitive_level:"test",
      estimated_correct_pct:0,
      difficulty_label:0,
      reasoning:"test",
    });
    await questions.save();
    return res.json(assessment);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error", detail: String(error) });
  }
};
export const getAllAssessments = async (req, res) => {
  try {
    const assessments = await Assessment.find();
    return res.json(assessments);
  } catch (error) {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
    console.error("Controller Error:", error);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
    res.status(500).json({ error: "Internal Server Error", detail: String(error) });                        
  }
}


    // attend Assessment
export const getAssessmentDetails = async (req, res) => {
  try {
    const { assessmentCode } = req.params;

    // 1️⃣ Fetch assessment
    const assessment = await Assessment.findOne({ assessmentCode });

    if (!assessment) {
      return res.status(404).json({
        success: false,
        message: "Assessment not found",
      });
    }

    // 2️⃣ Fetch all questions with same assessmentCode
    const questions = await Questions.find({ assessmentCode });

    // 3️⃣ Combine data into one JSON response
    return res.status(200).json({
      success: true,
      assessment,
      questions,
    });

  } catch (err) {
    console.error("❌ Error fetching assessment details:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message
    });
  }
}

























export const getAssessment = async (req, res) => {
  try {
    const assessmentCode = req.params.assessmentCode;

    const assessment = await Assessment.findOne({ aassementCode: assessmentCode });

    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    return res.json(assessment);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error", detail: String(error) });
  }
};

export const getAssessmentQuestions = async (req, res) => {
  try {
    const assessmentCode = req.params.assessmentCode;                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

    const assessment = await Assessment.findOne({ aassementCode: assessmentCode });

    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    const questions = await Questions.find({ assessmentId: assessment._id });

    return res.json(questions);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error", detail: String(error) });
  }
};

export const getAssessmentLogs = async (req, res) => {
  try {
    const assessmentCode = req.params.assessmentCode;

    const assessment = await Assessment.findOne({ aassementCode: assessmentCode });

    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    const logs = await AssessmentLog.find({ assessmentId: assessment._id });

    return res.json(logs);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error", detail: String(error) });
  }
};

export const getAssessmentResults = async (req, res) => {
  try {
    const assessmentCode = req.params.assessmentCode;

    const assessment = await Assessment.findOne({ aassementCode: assessmentCode });

    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    const logs = await AssessmentLog.find({ assessmentId: assessment._id });

    const results = logs.map((log) => {
      return {
        question: log.questionId.question,
        options: log.questionId.options,
        correct_answer: log.questionId.correct_answer,
        cognitive_level: log.questionId.cognitive_level,
        estimated_correct_pct: log.questionId.estimated_correct_pct,
        difficulty_label: log.questionId.difficulty_label,
        reasoning: log.questionId.reasoning,
        answer: log.answer,
      };
    });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

    return res.json(results);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error", detail: String(error) });
  }
};

export const getAssessmentStatus = async (req, res) => {
  try {
    const assessmentCode = req.params.assessmentCode;

    const assessment = await Assessment.findOne({ aassementCode: assessmentCode });

    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    return res.json(assessment);
  } catch (error) {
    console.error("Controller Error:", error);
    res.status(500).json({ error: "Internal Server Error", detail: String(error) });
  }
};

export const updateAssessmentStatus = async (req, res) => {
  try {
    const assessmentCode = req.params.assessmentCode;
    const status = req.body.status;
console.log("status:",assessmentCode,status);
    const assessment = await Assessment.findOneAndUpdate({ assessmentCode: assessmentCode }, { status: status });

    if (!assessment) {
      return res.status(404).json({ error: "Assessment not found" });
    }

    return res.json(assessment);
  } catch (error) {
    console.error("Controller Error:", error);                                                                              
  }
  res.status(500).json({ error: "Internal Server Error", detail: String(error) });
};

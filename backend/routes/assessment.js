import express from "express";
import {
  createAssessment,
  getAssessment,
  getAssessmentQuestions,
  getAssessmentLogs,
  getAssessmentResults,
  getAssessmentStatus,
  updateAssessmentStatus,
  getAllAssessments,
  getAssessmentDetails
} from "../controllers/assessmentController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post("/create",upload.single("file"), createAssessment);
router.get("/", getAllAssessments);
router.get("/:assessmentCode", getAssessmentDetails);
router.get("/:assessmentCode/questions", getAssessmentQuestions);
router.get("/:assessmentCode/logs", getAssessmentLogs);
router.get("/:assessmentCode/results", getAssessmentResults);
router.get("/:assessmentCode/status", getAssessmentStatus);
router.put("/:assessmentCode/status", updateAssessmentStatus);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             

export default router;
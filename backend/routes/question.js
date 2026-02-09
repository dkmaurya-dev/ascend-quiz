import express from "express";
import multer from "multer";
import { askQuestion } from "../controllers/questionController.js";
import { Queue } from "bullmq";

const questionRouter = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

const connection = { host: "127.0.0.1", port: 6379 };
const questionQueue = new Queue("question-queue", { connection });

export const checkStatus = async (req, res) => {
  const job = await questionQueue.getJob(req.params.id);
  if (!job) {
    return res.status(404).json({ error: "job not found" });
  }

  const state = await job.getState();
  const result = await job.returnvalue;

  res.json({ state, result });
};

questionRouter.post("/", upload.single("file"), askQuestion);
questionRouter.get("/:id/status", checkStatus);
export default questionRouter;

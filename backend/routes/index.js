import express from "express";
import assessmentRouter from "./assessment.js";
import userRouter from "./user.js";

const router = express.Router();

router.use("/assessment", assessmentRouter);
router.use("/user", userRouter);

export default router;
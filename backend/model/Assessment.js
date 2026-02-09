import mongoose from "mongoose";

const AssessmentSchema = new mongoose.Schema({

    assessmentCode: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    userId: {
        type: Number,
        required: true,
    },
    fileName: {
        type: String,
        required: true,
    },
    passPercent: {
        type: Number,
        required: true,
    },
    totalQuestions: {
        type: Number,
        required: true,
    },  
    difficultyDistribution: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    jobId: {
        type: Number,
        required: false,

    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}); 

export default mongoose.model("Assessment", AssessmentSchema);
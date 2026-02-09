import mongoose from "mongoose";

const AssessmentLogSchema = new mongoose.Schema({
    assessmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assessment",
        required: true,
    },
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Questions",
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});                        

export default mongoose.model("AssessmentLog", AssessmentLogSchema);
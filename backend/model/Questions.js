import mongoose from "mongoose";

const QuestionsSchema = new mongoose.Schema({
    
    assessmentCode: {
        type: String,
        ref: "Assessment",
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    correct_answer: {
        type: String,
        required: true,
    },
    explanation: {
        type: String,
        required: true,
    }, 
    options: {
        type: Array,
        required: true,
    },
    cognitive_level: {
        type: String,
        required: true,
    },
    estimated_correct_pct: {
        type: Number,
        required: true,
    },
    difficulty_label: {
        type: Number,
        required: true,
    },
    reasoning: {    
        type: String,
        required: true,
    },
  
    createdAt: {
        type: Date,
        default: Date.now,
    },
});                        

export default mongoose.model("Questions", QuestionsSchema);
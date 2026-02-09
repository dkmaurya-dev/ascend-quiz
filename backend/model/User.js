import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
     roleId :{
        type: Number,
        default: 1,
        required: false,
    },
    createdAt   : {
        type: Date,
        default: Date.now,
    }
    
},{timestamps: true});

export default mongoose.model("User", UserSchema);
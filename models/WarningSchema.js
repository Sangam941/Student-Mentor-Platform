// models/Warning.js
import mongoose from "mongoose";

const warningSchema = new mongoose.Schema({
    warning_id: {
        type: String,
        required: true,
        unique: true
    },
    student_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    mentor_id: {
        type: String,
        required: true
    },
    remark: {
        type: String
    },
    level: {
        type: Number,
        default: 1
    }
}, { timestamps: true });

export default mongoose.model("Warning", warningSchema);

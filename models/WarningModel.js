import mongoose from "mongoose";

const WarningSchema = new mongoose.Schema({
    warning_id: {
        type: String,
        required: true,
        unique: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor",
        required: true
    },
    remark: {
        type: String
    },
    level: {
        type: String,
        enum: ["warning1", "warning2", "warning3"],
        default: "warning1"
    }
}, { timestamps: true });

export default mongoose.model("Warning", WarningSchema);

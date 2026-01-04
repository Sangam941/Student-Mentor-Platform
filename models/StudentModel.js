// models/Student.js
import mongoose, { Mongoose } from "mongoose";

const StudentSchema = new mongoose.Schema({
    student_id: {
        type: String,
        unique: true
    },
    name: {
        type: String
    },
    photo: {
        type: String
    },
    mentor_id: {
        type: String,
        required: true
    },
    mentor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mentor",
        required: true
    },
    social_links: {
        github: {
            type: String
        },
        linkedin: {
            type: String
        }
    },
    warning_count: {
        type: Number,
        default: 0
    },
    warning_status: {
        type: String,
        default: "Normal"
    },
    progress: {
        type: Number,
        default: 0
    }
});

export default mongoose.model("Student", StudentSchema);

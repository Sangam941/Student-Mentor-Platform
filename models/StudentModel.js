// models/Student.js
import mongoose, { Mongoose } from "mongoose";

const StudentSchema = new mongoose.Schema({
    student_id: {
        type: String,
        unique: true
    },
    email : {
        type: String,
        unique: true,
        required: true
    },
    password:{
        type:String
    },
    name: {
        type: String
    },
    photo: {
        id: {
            type: String
        },
        url: {
            type: String
        }
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
            type: String,
            default: ""
        },
        linkedin: {
            type: String,
            default: ""
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

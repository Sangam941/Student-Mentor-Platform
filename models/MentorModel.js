// models/Mentor.js
import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema({
    mentor_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String
    },
    photo: {
        id: {
            type: String
        },
        url: {
            type: String
        }
    }
}, { timestamps: true });

export default mongoose.model("Mentor", MentorSchema);

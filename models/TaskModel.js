// models/Task.js
import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    task_id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    doc_link: {
        type: String
    },
    course_id: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model("Task", TaskSchema);

import mongoose from "mongoose";

const TaskAssignmentSchema = new mongoose.Schema({
    assignment_id: {
        type: String,
        required: true,
        unique: true
    },
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    student_id: {
        type: String,
        required: true
    },

    // Student submissions (optional initially)
    submissions: [{
        github_link: {
            type: String
        },
        hosted_link: {
            type: String
        },
        submitted_at: {
            type: Date,
            default: Date.now
        }
    }],

    // Mentor feedback (optional initially)
    remarks: [{
        mentor_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Mentor"
        },
        remark: {
            type: String
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    }],

    status: {
        type: String,
        enum: ["pending", "submitted", "reviewed"],
        default: "pending"
    }

}, { timestamps: true });

export default mongoose.model("TaskAssignment", TaskAssignmentSchema);

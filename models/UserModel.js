// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
        unique: true
    },
    password_hash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "mentor", "student"],
        default: "student",
        required: true
    }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);

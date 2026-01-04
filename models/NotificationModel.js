import mongoose from "mongoose";

const NotificationSchema = new mongoose.Schema({
    notification_id: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    sender: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ["info", "warning", "alert"],
        default: "info"
    }
}, { timestamps: true });

export default mongoose.model("Notification", NotificationSchema);

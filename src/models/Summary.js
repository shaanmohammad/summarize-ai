import mongoose, { Schema } from "mongoose";

const toneEnum = ["Human", "Professor", "Architect", "Natural", "Founder"];

const summarySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    tone: {
        type: String,
        required: true,
        enum: toneEnum
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Summary = mongoose.models.Schema || mongoose.model('Summary', summarySchema);
export default Summary;
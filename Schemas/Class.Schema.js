import mongoose from "mongoose";

export const ClassSchema = new mongoose.Schema({
    class_name: {
        type: String,
        required: true,
        unique: true
    },
    subjects: [{
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Subject"
    }],
    order: {
        type: Number,
        default: 0
    }
})
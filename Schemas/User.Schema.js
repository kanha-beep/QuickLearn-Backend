import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    chapterTestProgress: [{
        chapterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter",
            required: true
        },
        wrongSectionIds: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section"
        }],
        wrongSubsectionIds: [{
            type: String,
            default: ""
        }],
        generatedQuestions: [{
            questionId: {
                type: String,
                required: true
            },
            sectionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Section",
                required: true
            },
            order: {
                type: Number,
                default: 0
            },
            prompt: {
                type: String,
                required: true
            },
            options: [{
                type: String,
                required: true
            }],
            correctAnswer: {
                type: String,
                required: true
            },
            explanation: {
                type: String,
                default: ""
            }
        }],
        lastSubmittedAt: {
            type: Date,
            default: null
        }
    }]
})

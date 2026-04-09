import mongoose from "mongoose";

const optionSchema = new mongoose.Schema(
    {
        key: { type: String, required: true },
        text: { type: String, required: true },
    },
    { _id: false }
);

const aiNoteSchema = new mongoose.Schema(
    {
        title: { type: String, default: "" },
        content: { type: String, default: "" },
    },
    { _id: false }
);

const questionSchema = new mongoose.Schema(
    {
        number: { type: Number, required: true },
        prompt: { type: String, required: true },
        subject: { type: String, required: true },
        difficulty: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            default: "Medium",
        },
        sectionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Section",
            required: true,
        },
        subsectionId: {
            type: String,
            default: "",
        },
        options: {
            type: [optionSchema],
            validate: [(value) => value.length === 4, "Exactly four options are required"],
            default: [],
        },
        correctOption: { type: String, required: true },
        explanation: { type: String, required: true },
        aiNote: { type: aiNoteSchema, default: () => ({}) },
    },
    { _id: true }
);

const chapterTestSchema = new mongoose.Schema(
    {
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        chapterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter",
            required: true,
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Single_Subject",
            required: true,
        },
        title: { type: String, required: true },
        description: { type: String, required: true },
        durationMinutes: { type: Number, required: true },
        totalMarks: { type: Number, required: true },
        instructions: { type: [String], default: [] },
        questions: { type: [questionSchema], default: [] },
    },
    { timestamps: true }
);

export const ChapterTest = mongoose.model("ChapterTest", chapterTestSchema);

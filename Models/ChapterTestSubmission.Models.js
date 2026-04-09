import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
    {
        questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
        selectedOption: { type: String, default: null },
        status: {
            type: String,
            enum: ["answered", "skipped", "review", "review_answered"],
            required: true,
        },
    },
    { _id: false }
);

const evaluatedAnswerSchema = new mongoose.Schema(
    {
        questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
        questionNumber: { type: Number, required: true },
        prompt: { type: String, required: true },
        sectionId: { type: mongoose.Schema.Types.ObjectId, ref: "Section", required: true },
        subsectionId: { type: String, default: "" },
        options: [
            {
                key: String,
                text: String,
            },
        ],
        selectedOption: { type: String, default: null },
        correctOption: { type: String, required: true },
        explanation: { type: String, required: true },
        aiNote: {
            title: { type: String, default: "" },
            content: { type: String, default: "" },
        },
        status: {
            type: String,
            enum: ["correct", "incorrect", "skipped", "review", "review_correct", "review_incorrect"],
            required: true,
        },
    },
    { _id: false }
);

const chapterTestSubmissionSchema = new mongoose.Schema(
    {
        testId: { type: mongoose.Schema.Types.ObjectId, ref: "ChapterTest", required: true },
        chapterId: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter", required: true },
        subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Single_Subject", required: true },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        candidateName: { type: String, required: true },
        answers: { type: [answerSchema], default: [] },
        score: { type: Number, required: true },
        summary: {
            correct: { type: Number, default: 0 },
            incorrect: { type: Number, default: 0 },
            skipped: { type: Number, default: 0 },
            review: { type: Number, default: 0 },
        },
        wrongSectionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }],
        wrongSubsectionIds: [{ type: String, default: "" }],
        evaluatedAnswers: { type: [evaluatedAnswerSchema], default: [] },
    },
    { timestamps: true }
);

export const ChapterTestSubmission = mongoose.model("ChapterTestSubmission", chapterTestSubmissionSchema);

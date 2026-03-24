import mongoose from "mongoose";

export const SectionSchema = new mongoose.Schema({
    section_name: { type: String, required: true },
    section_content: [{ type: String, default: "" }],
    date: { type: String },
    order: {
        type: Number,
        default: 0
    },
    chapter_of_section: { type: mongoose.Schema.Types.ObjectId, ref: "Chapter" },
    subject_of_section: { type: mongoose.Schema.Types.ObjectId, ref: "Single_Subject" },
    class_of_section: { type: mongoose.Schema.Types.ObjectId, ref: "Class" }
});

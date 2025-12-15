import mongoose from "mongoose";
import { SectionSchema } from "./Section.Schema.js";

export const ChapterSchema = new mongoose.Schema({
    chapter_name: {
        type: String,
        required: true
    },
    sections:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
    }],
    subject_of_chapter: { type: mongoose.Schema.Types.ObjectId, ref: "Single_Subject" }
});

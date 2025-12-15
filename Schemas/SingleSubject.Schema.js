import mongoose from "mongoose";
import { ChapterSchema } from "./Chapter.Schema.js";

export const SingleSubjectSchema = new mongoose.Schema({
    subject_name: {
        type: String
    },
    // embed chapter subdocuments so client can POST nested chapters directly
    // chapters: [ChapterSchema]
    chapters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter"
        }
    ]
})
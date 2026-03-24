import mongoose from "mongoose";
import { ChapterSchema } from "./Chapter.Schema.js";

export const SingleSubjectSchema = new mongoose.Schema({
    subject_name: {
        type: String
    },
    chapters: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chapter"
        }
    ],
    class_of_subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class"
    }, order: {
        type: Number,
        default: 0
    }

})
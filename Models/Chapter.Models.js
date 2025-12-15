import mongoose from "mongoose";
import { ChapterSchema } from "../Schemas/Chapter.Schema.js";
export const Chapters = mongoose.model("Chapter", ChapterSchema)
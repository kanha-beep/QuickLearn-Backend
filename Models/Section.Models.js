import mongoose from "mongoose";
import { SectionSchema } from "../Schemas/Section.Schema.js";
export const Sections = mongoose.model("Section", SectionSchema)
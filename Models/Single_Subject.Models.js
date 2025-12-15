import { SingleSubjectSchema } from "../Schemas/SingleSubject.Schema.js";
import mongoose from "mongoose";
export const Single_Subject = mongoose.model("Single_Subject", SingleSubjectSchema)
import {SubjectsSchema} from "../Schemas/Subjects.Schema.js";
import mongoose from "mongoose";
export const Subjects = mongoose.model("Subjects", SubjectsSchema)
import mongoose from "mongoose";
import { ClassSchema } from "../Schemas/Class.Schema.js";
export const Class = new mongoose.model("Class", ClassSchema)
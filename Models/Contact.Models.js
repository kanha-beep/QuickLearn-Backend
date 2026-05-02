import mongoose from "mongoose";
import { ContactSchema } from "../Schemas/Contact.Schema.js";

export const Contact = mongoose.model("Contact", ContactSchema);

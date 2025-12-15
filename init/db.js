import mongoose from "mongoose"
import { Single_Subject } from "../Models/Single_Subject.Models.js"

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected successfully")

        // Create 5 sample subjects
        // const subjects = [
        //     { subject_name: "Mathematics", chapters: [] },
        //     { subject_name: "Physics", chapters: [] },
        //     { subject_name: "Chemistry", chapters: [] },
        //     { subject_name: "Biology", chapters: [] },
        //     { subject_name: "English", chapters: [] },
        // ]

        // // Check if subjects already exist
        // const count = await Single_Subject.countDocuments()
        // if (count === 0) {
        //     await Single_Subject.insertMany(subjects)
        //     console.log("5 subjects created successfully")
        // } else {
        //     console.log("Subjects already exist, skipping creation")
        // }
    } catch (err) {
        console.error("Database error:", err.message)
        process.exit(1)
    }
}
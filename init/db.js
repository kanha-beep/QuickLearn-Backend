import mongoose from "mongoose"
import { Single_Subject } from "../Models/Single_Subject.Models.js"
import { Class } from "../Models/Class.Models.js"
import { Subjects } from "../Models/Subjects.Models.js"
import { Chapters } from "../Models/Chapter.Models.js"
import { Sections } from "../Models/Section.Models.js"
export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MongoDB connected successfully")

        // Create 5 sample subjects
        const classes = ["Class_6", "Class_7", "Class_8", "Class_9", "Class_10", "BCA"]
        // const subjects = [
        //     { subject_name: "mathematics", chapters: [] },
        //     { subject_name: "History", chapters: [] },
        //     { subject_name: "Physics", chapters: [] },
        //     { subject_name: "Chemistry", chapters: [] },
        //     { subject_name: "Biology", chapters: [] },
        //     { subject_name: "Geography", chapters: [] },
        //     { subject_name: "Economics", chapters: [] },
        //     { subject_name: "Polity", chapters: [] },
        //     // { subject_name: "German Literature", chapters: [] },
        //     { subject_name: "Hindi", chapters: [] },
        //     { subject_name: "English", chapters: [] },
        // ]
        const subjects = [
            { subject_name: "mathematics", chapters: [], class_of_subject: "694166cd246471e145e9b4e9" },
            { subject_name: "computer", chapters: [], class_of_subject: "694166cd246471e145e9b4e9" },
            { subject_name: "english", chapters: [], class_of_subject: "694166cd246471e145e9b4e9" },
            { subject_name: "environment", chapters: [], class_of_subject: "694166cd246471e145e9b4e9" },

        ]
        // await Sections.deleteMany({})
        // const collgeSubjectsId = await Single_Subject.find({})
        // await Single_Subject.deleteMany({})
        // const collegeSubjects = await Single_Subject.create(subjects)
        // console.log("college subjects created: ", collegeSubjects)
        // const newClass = await Class.create({ class_name: "BCA", subjects:[] })
        // console.log("new class created: ", newClass)
        // const subjectsForClass = await Single_Subject.create({subject_name: "Computer", chapters: []})
        // console.log("new subjects craeted: ", subjectsForClass)
        // console.log("new subjects craeted: ", subjectsForClass)
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
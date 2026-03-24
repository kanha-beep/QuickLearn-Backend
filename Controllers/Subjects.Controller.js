import { ExpressError } from "../Middlewares/ExpressError.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";
import { Subjects } from "../Models/Subjects.Models.js";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";
export const allSubjects = async (req, res, next) => {
    const getAllSubjects = await Single_Subject.find({ class_of_subject: req.query.classId }).sort({ order: 1 });
    return res.status(200).json({
        subjects: getAllSubjects,
        count: getAllSubjects.length
    });
}
export const addSubjects = async (req, res, next) => {
    console.log("Request body:", req.body);
    const { classId } = req.params
    const { subjectName, order } = req.body;
    if (!subjectName) return next(new ExpressError(400, "Missing subject name"));
    // console.log("Adding subject:", name, chapters);
    // Create new Single_Subject
    const existingSubject = await Single_Subject.findOne({ subject_name: subjectName, class_of_subject: classId });
    if (existingSubject) return next(new ExpressError(400, "Subject already exists"));
    const newSubject = await Single_Subject.create({ subject_name: subjectName, class_of_subject: classId, order: order });
    if (!newSubject) return next(new ExpressError(500, "Failed to create subject"));
    console.log("Created Subject:", newSubject);
    res.status(200).json({ newSubject });
}
export const editSubjects = async (req, res) => {
    const getSingleSubject = await Single_Subject.findById("6952b18b9772fdf0c05499d2");
    console.log(getSingleSubject);
};

export const deleteSubjects = (req, res) => {
    res.send("Delete Chapters");
}
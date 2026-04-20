import { ExpressError } from "../Middlewares/ExpressError.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";
import { Subjects } from "../Models/Subjects.Models.js";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";
import { Class } from "../Models/Class.Models.js";
export const allSubjects = async (req, res, next) => {
    const getAllSubjects = await Single_Subject.find({ class_of_subject: req.query.classId }).sort({ order: 1 });
    return res.status(200).json({
        subjects: getAllSubjects,
        count: getAllSubjects.length
    });
}
export const addSubjects = async (req, res, next) => {
    const { classId } = req.params
    const normalizedSubjectName = String(req.body.subjectName || "").trim().toLowerCase();
    const order = Number(req.body.order ?? 0);
    if (!normalizedSubjectName) return next(new ExpressError(400, "Missing subject name"));
    if (Number.isNaN(order) || order < 0) return next(new ExpressError(400, "Invalid subject order"));
    const classRoom = await Class.findById(classId);
    if (!classRoom) return next(new ExpressError(404, "Class not found"));
    // console.log("Adding subject:", name, chapters);
    // Create new Single_Subject
    const existingSubject = await Single_Subject.findOne({ subject_name: normalizedSubjectName, class_of_subject: classId });
    if (existingSubject) return next(new ExpressError(400, "Subject already exists"));
    const newSubject = await Single_Subject.create({ subject_name: normalizedSubjectName, class_of_subject: classId, order: order });
    if (!newSubject) return next(new ExpressError(500, "Failed to create subject"));
    classRoom.subjects.push(newSubject._id);
    await classRoom.save();
    res.status(200).json({ newSubject });
}
export const editSubjects = async (req, res) => {
    const getSingleSubject = await Single_Subject.findById("6952b18b9772fdf0c05499d2");
    console.log(getSingleSubject);
};

export const deleteSubjects = (req, res) => {
    res.send("Delete Chapters");
}

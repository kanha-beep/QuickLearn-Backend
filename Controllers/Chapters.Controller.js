import { ExpressError } from "../Middlewares/ExpressError.js";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";
import { Subjects } from "../Models/Subjects.Models.js";

export const addChapters = async (req, res) => {
    const { subjectId } = req.body;
    const { chapters } = req.body;
    const getSingleSubject = await Single_Subject.findById(subjectId);
    if (!getSingleSubject) return res.status(404).json({ msg: "Subject not found" });
    console.log("Chapters:", getSingleSubject);
    const newChapter = await Chapters.create({
        chapter_name: chapters[0],
        subject_of_chapter: subjectId
    });
    getSingleSubject.chapters.push(newChapter._id);
    console.log("chapters added in subject: ", getSingleSubject)
    await getSingleSubject.save();
    return res.status(201).json({ subject: getSingleSubject });
}
export const allChapters = async (req, res) => {
    // console.log("Subject id", req.params._id);
    const { subjectId } = req.params;
    // console.log("Subject id",subjectId);
    const subjectName = await Single_Subject.findById(subjectId);
    // console.log("subject name: ", subjectName.subject_name);
    const chaptersList = await Chapters.find({ subject_of_chapter: subjectId });
    // const chaptersLists = await Single_Subject.findById(subjectId).populate("chapters");
    // console.log("chapters controller: ", subjectName, chaptersList)
    return res.status(200).json({
        chaptersList: chaptersList,
        chaptersCount: chaptersList.length,
        subjectName: subjectName,
    });
    // console.log(getSingleSubject);
}
export const singleChapters = async (req, res) => {
}
export const editChapters = async (req, res, next) => {
    const { chapterId } = req.params;
    const { chapterName } = req.body;
    const chapterToUpdate = await Chapters.findById(chapterId);
    if (!chapterToUpdate) return next(new ExpressError(404, "Chapter not found"));
    chapterToUpdate.chapter_name = chapterName || chapterToUpdate.chapter_name;
    await chapterToUpdate.save();
    return res.status(200).json({ msg: "Chapter updated successfully", chapter: chapterToUpdate });
}
export const deleteChapters = async (req, res, next) => {
    const { chapterId } = req.params;
    const chapterToDelete = await Chapters.findById(chapterId);
    if (!chapterToDelete) return next(new ExpressError(404, "Chapter not found"));
    await Chapters.findByIdAndDelete(chapterId);
    await Sections.deleteMany({ chapter_of_section: chapterId });
    return res.status(200).json({ msg: "Chapter deleted successfully" });
}

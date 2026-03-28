import { ExpressError } from "../Middlewares/ExpressError.js";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";
import { Subjects } from "../Models/Subjects.Models.js";

export const addChapters = async (req, res) => {
    const { subjectId} = req.params;
    const { chapters, classId } = req.body;
    const getSingleSubject = await Single_Subject.findById(subjectId);
    if (!getSingleSubject) return res.status(404).json({ msg: "Subject not found" });

    const normalizedChapters = (chapters || [])
        .map((chapter, index) => {
            if (typeof chapter === "string") {
                return {
                    chapter_name: chapter,
                    order: index + 1,
                };
            }

            return {
                chapter_name: chapter?.chapter_name || "",
                order: chapter?.order ?? index + 1,
            };
        })
        .filter((chapter) => chapter.chapter_name);

    if (normalizedChapters.length === 0) {
        return res.status(400).json({ msg: "At least one valid chapter is required" });
    }

    const newChapters = await Chapters.insertMany(
        normalizedChapters.map((chapter) => ({
            chapter_name: chapter.chapter_name,
            subject_of_chapter: subjectId,
            class_of_chapter: classId,
            order: chapter.order,
        }))
    );

    getSingleSubject.chapters.push(...newChapters.map((chapter) => chapter._id));
    await getSingleSubject.save();

    return res.status(201).json({
        msg: "Chapters added successfully",
        subject: getSingleSubject,
        chapters: newChapters,
    });
}
export const allChapters = async (req, res) => {
    // console.log("Subject id", req.params);
    const { subjectId } = req.params;
    // console.log("Subject id",subjectId);
    const subjectName = await Single_Subject.findById(subjectId);
    // console.log("subject name: ", subjectName.subject_name);
    const chaptersList = await Chapters.find({ subject_of_chapter: subjectId }).sort({order:1});
    // console.log("chaptersList: ", chaptersList);
    // console.log("classId: ", classId)
    // // const chaptersLists = await Single_Subject.findById(subjectId).populate("chapters");
    // console.log("addtions at")
    // const finalChapters = chaptersList.map(ch => ({
    //     ...ch.toObject(),
    //     class_of_chapter: classId,
    // }));
    // console.log("chapters controller: ", finalChapters)
    return res.status(200).json({
        chaptersList: chaptersList,
        chaptersCount: chaptersList.length,
        subjectName: subjectName,
    });
    // console.log(getSingleSubject);
}
export const singleChapters = async (req, res) => {
    const { chapterId } = req.params;
    const chapter = await Chapters.findById(chapterId);
    if (!chapter) return next(new ExpressError(404, "Chapter not found"));
    console.log("got the chapter in single chapter controller")
    return res.status(200).json({ chapter: chapter });
}
export const editChapters = async (req, res, next) => {
    const { chapterId } = req.params;
    const { chapterName , order} = req.body;
    const chapterToUpdate = await Chapters.findById(chapterId);
    if (!chapterToUpdate) return next(new ExpressError(404, "Chapter not found"));
    chapterToUpdate.chapter_name = chapterName || chapterToUpdate.chapter_name;
    chapterToUpdate.order = order || chapterToUpdate.order;
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

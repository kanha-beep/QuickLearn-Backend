import { Sections } from "../Models/Section.Models.js";
import { Chapters } from "../Models/Chapter.Models.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";
import { ExpressError } from "../Middlewares/ExpressError.js";
export const addSections = async (req, res, next) => {
    console.log("req params: ", req.params);
    const subjectId = req.params.subjectId;
    const chapterId = req.params.chapterId;
    if (!subjectId || !chapterId) return next(new ExpressError(404, "Subject ID and Chapter ID are required"));
    // console.log("subjectId: ", subjectId, "chapterId: ", chapterId);
    const { sectionName, sectionContent } = req.body
    if (!sectionName || !sectionContent) return next(new ExpressError(400, "Section Name and Section Content are required"));
    // console.log("req body: ", req.body);
    const sentencesArray = sectionContent.split(".").map(s => s.trim()).filter(s => s.length > 0);
    // console.log("sentences: ", sentencesArray);
    const newSection = await Sections.create({
        section_name: sectionName,
        section_content: sentencesArray,
        chapter_of_section: chapterId,
        subject_of_section: subjectId
    })
    console.log("newSection created: ", newSection);
    const getChapter = await Chapters.findById(chapterId);
    getChapter.sections.push(newSection._id);
    await getChapter.save();
    res.status(201).json({
        msg: "Section added successfully",
        newSection: newSection
    })
}
export const allSections = async (req, res) => {
    // console.log("req.params: ", req.params)
    const subjectId = req.params.subjectId;
    const chapterId = req.params.chapterId;
    const getSections = await Sections.find({ chapter_of_section: chapterId, subject_of_section: subjectId });
    // console.log("getSections: ", getSections)
    return res.status(200).json({
        msg: "All sections fetched successfully",
        sections: getSections
    })
}
export const singleSections = async (req, res) => {
    const { subjectId, chapterId, sectionId } = req.params;
    // console.log("Fetching section with subjectId:", subjectId, "chapterId:", chapterId, "sectionId:", sectionId);
    const section = await Sections.findOne({ _id: sectionId, chapter_of_section: chapterId, subject_of_section: subjectId });
    if (!section) {
        return res.status(404).json({ msg: "Section not found" });
    }
    // console.log("Fetched section: ", section);
    return res.status(200).json({
        msg: "Section fetched successfully",
        section: section
    });
}
export const editSingleSections = async (req, res) => {
    const { subjectId, chapterId, sectionId } = req.params;
    const { sectionName, sectionContent } = req.body;
    const section = await Sections.findOne({ _id: sectionId, chapter_of_section: chapterId, subject_of_section: subjectId });
    if (!section) {
        return res.status(404).json({ msg: "Section not found" });
    }
    const sentencesArray = sectionContent.split("\n").map(s => s.trim()).filter(s => s.length > 0);
    section.section_name = sectionName;
    section.section_content = sentencesArray;
    await section.save();
    console.log("Updated section: ", section);
    return res.status(200).json({
        msg: "Section updated successfully",
        section: section
    });
}
export const deleteSingleSections = async (req, res) => {
    console.log("Delete section req.params: ", req.params);
    const { subjectId, chapterId, sectionId } = req.params;
    const section = await Sections.findOneAndDelete({ _id: sectionId, chapter_of_section: chapterId, subject_of_section: subjectId });
    console.log("Deleted section: ", section);
    return res.status(200).json({
        msg: "Section deleted successfully",
        section: section
    });
}
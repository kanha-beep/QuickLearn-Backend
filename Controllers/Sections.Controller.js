import { Sections } from "../Models/Section.Models.js";
import { Chapters } from "../Models/Chapter.Models.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";
import { ExpressError } from "../Middlewares/ExpressError.js";

const normalizeContentArray = (value) => {
    if (Array.isArray(value)) {
        return value.map((item) => String(item).trim()).filter(Boolean);
    }

    if (typeof value === "string") {
        return value
            .split(/\n|\./)
            .map((item) => item.trim())
            .filter(Boolean);
    }

    return [];
};

const normalizeSubsections = (subsections = []) => {
    if (!Array.isArray(subsections)) return [];

    return subsections
        .map((subsection, index) => ({
            subsection_name: subsection?.subsection_name || subsection?.title || "",
            subsection_content: normalizeContentArray(
                subsection?.subsection_content || subsection?.content || ""
            ),
            order: subsection?.order ?? index,
        }))
        .filter((subsection) => subsection.subsection_name && subsection.subsection_content.length > 0);
};

export const addSections = async (req, res, next) => {
    const order = Number(req.body.order ?? 0);
    const subjectId = req.params.subjectId;
    const chapterId = req.params.chapterId;
    if (!subjectId || !chapterId) return next(new ExpressError(404, "Subject ID and Chapter ID are required"));
    const { sectionName, sectionContent, subsections } = req.body
    const normalizedSubsections = normalizeSubsections(subsections);
    const sentencesArray = normalizedSubsections.length > 0
        ? []
        : normalizeContentArray(sectionContent);
    if (!String(sectionName || "").trim()) return next(new ExpressError(400, "Section Name is required"));
    if (Number.isNaN(order) || order < 0) return next(new ExpressError(400, "Invalid section order"));
    if (!sentencesArray.length && !normalizedSubsections.length) {
        return next(new ExpressError(400, "Add section content or at least one subsection"));
    }
    const getChapter = await Chapters.findById(chapterId);
    if (!getChapter) return next(new ExpressError(404, "Chapter not found"));
    const newSection = await Sections.create({
        section_name: String(sectionName).trim(),
        section_content: sentencesArray,
        subsections: normalizedSubsections,
        chapter_of_section: chapterId,
        subject_of_section: subjectId,
        order: order
    })
    getChapter.sections.push(newSection._id);
    await getChapter.save();
    res.status(201).json({
        msg: "Section added successfully",
        newSection: newSection
    })
}
export const allSections = async (req, res) => {
    const subjectId = req.params.subjectId;
    const chapterId = req.params.chapterId;
    const getSections = await Sections.find({ chapter_of_section: chapterId, subject_of_section: subjectId }).sort({ order: 1 });
    return res.status(200).json({
        msg: "All sections fetched successfully",
        sections: getSections
    })
}
export const singleSections = async (req, res) => {
    const { subjectId, chapterId, sectionId } = req.params;
    const section = await Sections.findOne({ _id: sectionId, chapter_of_section: chapterId, subject_of_section: subjectId });
    if (!section) {
        return res.status(404).json({ msg: "Section not found" });
    }
    return res.status(200).json({
        msg: "Section fetched successfully",
        section: section
    });
}
export const editSingleSections = async (req, res) => {
    const { subjectId, chapterId, sectionId } = req.params;
    const { sectionName, sectionContent, subsections } = req.body;
    const order = Number(req.body.order ?? 0);
    const section = await Sections.findOne({ _id: sectionId, chapter_of_section: chapterId, subject_of_section: subjectId });
    if (!section) {
        return res.status(404).json({ msg: "Section not found" });
    }
    const normalizedSubsections = normalizeSubsections(subsections);
    const sentencesArray = normalizedSubsections.length > 0
        ? []
        : normalizeContentArray(sectionContent);
    if (!String(sectionName || "").trim()) {
        return res.status(400).json({ msg: "Section Name is required" });
    }
    if (!sentencesArray.length && !normalizedSubsections.length) {
        return res.status(400).json({ msg: "Add section content or at least one subsection" });
    }
    section.section_name = String(sectionName).trim();
    section.section_content = sentencesArray;
    section.subsections = normalizedSubsections;
    if (!Number.isNaN(order)) {
        section.order = order;
    }
    await section.save();
    return res.status(200).json({
        msg: "Section updated successfully",
        section: section
    });
}
export const deleteSingleSections = async (req, res) => {
    const { subjectId, chapterId, sectionId } = req.params;
    const section = await Sections.findOneAndDelete({ _id: sectionId, chapter_of_section: chapterId, subject_of_section: subjectId });
    if (!section) {
        return res.status(404).json({ msg: "Section not found" });
    }
    await Chapters.findByIdAndUpdate(chapterId, {
        $pull: { sections: section._id },
    });
    return res.status(200).json({
        msg: "Section deleted successfully",
        section: section
    });
}

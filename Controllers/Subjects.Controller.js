import { ExpressError } from "../Middlewares/ExpressError.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";
import { Subjects } from "../Models/Subjects.Models.js";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";
export const allSubjects = async (req, res, next) => {
    const getAllSubjects = await Subjects.find({});
    // console.log("All Subjects:", getAllSubjects);
    const getSingleSubjectIds = getAllSubjects[0].subjects.map(sub => sub.toString());
    // console.log("Single Subject IDs:", getSingleSubjectIds);
    const getPopulatedSubjects = await Single_Subject.find({ _id: { $in: getSingleSubjectIds } });
    // console.log("Populated Subjects:", getAllSubjects);
    // console.log("Fetching all subjects...");
    console.log("all subjects controller: ", getPopulatedSubjects)
    return res.status(200).json({
        subjects: getPopulatedSubjects,
        count: getPopulatedSubjects.length
    });
}
export const addSubjects = async (req, res, next) => {
    // console.log("Request body:", req.body);
    const { name, chapters } = req.body;
    if (!name) return next(new ExpressError(400, "Missing subject name"));
    // console.log("Adding subject:", name, chapters);
    // Create new Single_Subject
    const existingSubject = await Single_Subject.findOne({ subject_name: name });
    console.log("found the subject: ", existingSubject)
    // if (existingSubject) {
    //     const newChapter = await Chapters.create({
    //         chapter_name: chapters[0].chapter_name,
    //         sections: Array.isArray(chapters[0].sections) ? chapters[0].sections : [],
    //     })
    //     if (!newChapter) return next(new ExpressError(500, "Failed to create chapter"));
    //     // console.log("Created Chapters:", newChapter);
    //     console.log("adding chapter to subject")
    //     existingSubject.chapters.push(newChapter._id);
    //     console.log("added chapter in subject")
    //     await existingSubject.save();
    //     console.log("saved subject")
    //     return res.status(201).json({ subject: existingSubject, chapter: newChapter });
    // }

    // const newSubject = await Single_Subject.create({
    //     subject_name: name,
    //     chapters: chapters || []
    // });
    // if (!newSubject) return next(new ExpressError(500, "Failed to create subject"));
    // // console.log("Created Single_Subject:", newSubject);
    // // Add to main Subjects document
    // let subjectsDoc = await Subjects.findOne();
    // if (!subjectsDoc) {
    //     subjectsDoc = await Subjects.create({ subjects: [newSubject._id] });
    // } else {
    //     subjectsDoc.subjects.push(newSubject._id);
    //     await subjectsDoc.save();
    // }
    // console.log("Updated Subjects document:", subjectsDoc);
    // console.log("creating new chapter")
    const newChapter = await Chapters.create({
        chapter_name: chapters[0].chapter_name,
        sections: Array.isArray(chapters[0].sections) ? chapters[0].sections : [],
    })
    if (!newChapter) return next(new ExpressError(500, "Failed to create chapter"));
    // console.log("Created Chapters:", newChapter);
    console.log("adding chapter to subject")
    newSubject.chapters.push(newChapter._id);
    await newSubject.save();
    return res.status(201).json({ subject: newSubject, chapter: newChapter });
    // console.log("creating new section")
    // const newSection = await Sections.create({
    //     section_name: chapters[0].sections[0].section_name,
    //     section_content: chapters[0].sections[0].section_content,
    // })
    // if (!newSection) return next(new ExpressError(500, "Failed to create section"));
    // console.log("section created: ", newSection);
    // console.log("adding section to chapter")
    // newChapter.sections.push(newSection._id);
    // await newChapter.save();
    // return res.status(201).json({ subject: newSubject });
};
// export const addSubjects = async (req, res, next) => {
//     // console.log("Request body:", req.body);
//     const { name, chapters } = req.body;
//     if (!name) return next(new ExpressError(400, "Missing subject name"));
//     // console.log("Adding subject:", name, chapters);
//     // Create new Single_Subject
//     const existingSubject = await Single_Subject.findOne({ subject_name: name });
//     if (existingSubject) return next(new ExpressError(409, "Subject already exists"));
//     const newSubject = await Single_Subject.create({
//         subject_name: name,
//         chapters: Array.isArray(chapters) ? chapters : [],
//     });
//     if (!newSubject) return next(new ExpressError(500, "Failed to create subject"));
//     // console.log("Created Single_Subject:", newSubject);
//     // Add to main Subjects document
//     let subjectsDoc = await Subjects.findOne();
//     if (!subjectsDoc) {
//         subjectsDoc = await Subjects.create({ subjects: [newSubject._id] });
//     } else {
//         subjectsDoc.subjects.push(newSubject._id);
//         await subjectsDoc.save();
//     }
//     // console.log("Updated Subjects document:", subjectsDoc);
//     // console.log("creating new chapter")
//     const newChapter = await Chapters.create({
//         chapter_name: chapters[0].chapter_name,
//         sections: Array.isArray(chapters[0].sections) ? chapters[0].sections : [],
//     })
//     if (!newChapter) return next(new ExpressError(500, "Failed to create chapter"));
//     // console.log("Created Chapters:", newChapter);
//     console.log("adding chapter to subject")
//     newSubject.chapters.push(newChapter._id);
//     await newSubject.save();
//     console.log("creating new section")
//     const newSection = await Sections.create({
//         section_name: chapters[0].sections[0].section_name,
//         section_content: chapters[0].sections[0].section_content,
//     })
//     if (!newSection) return next(new ExpressError(500, "Failed to create section"));
//     console.log("section created: ", newSection);
//     console.log("adding section to chapter")
//     newChapter.sections.push(newSection._id);
//     await newChapter.save();
//     return res.status(201).json({ subject: newSubject });
// };

export const editSubjects = (req, res) => {
    res.send("Edit Chapters");
};

export const deleteSubjects = (req, res) => {
    res.send("Delete Chapters");
};
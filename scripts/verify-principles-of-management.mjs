import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { Single_Subject } from "../Models/Single_Subject.Models.js";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 10000 });

const subjectId = "6a635f0128870dc644b63e03";
const classId = "6a635ca828870dc644b63dc1";
const chapterId = "6a63638b28870dc644b63e24";

const subject = await Single_Subject.findById(subjectId).lean();
const chapter = await Chapters.findById(chapterId).lean();
const sections = await Sections.find({
  chapter_of_section: chapterId,
  subject_of_section: subjectId,
  class_of_section: classId,
})
  .sort({ order: 1 })
  .lean();

const significance = sections.find(
  (section) => section.section_name === "Significance of Principles of Management"
);

console.log(
  JSON.stringify(
    {
      subject: subject
        ? {
            _id: String(subject._id),
            subject_name: subject.subject_name,
            chaptersCount: Array.isArray(subject.chapters) ? subject.chapters.length : 0,
          }
        : null,
      chapter: chapter
        ? {
            _id: String(chapter._id),
            chapter_name: chapter.chapter_name,
            subject_of_chapter: String(chapter.subject_of_chapter),
            class_of_chapter: String(chapter.class_of_chapter),
            sectionsCount: Array.isArray(chapter.sections) ? chapter.sections.length : 0,
          }
        : null,
      significance: significance
        ? {
            _id: String(significance._id),
            order: significance.order,
            section_name: significance.section_name,
            section_content: significance.section_content,
            keywords: significance.keywords,
            subsections: significance.subsections,
          }
        : null,
      allSectionNames: sections.map((section) => ({
        order: section.order,
        section_name: section.section_name,
        subsectionCount: Array.isArray(section.subsections) ? section.subsections.length : 0,
      })),
    },
    null,
    2
  )
);

await mongoose.disconnect();

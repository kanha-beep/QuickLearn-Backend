import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const subjectId = "6a635f0128870dc644b63e03";
const classId = "6a635ca828870dc644b63dc1";
const chapterId = "6a63638b28870dc644b63e23";

const rows = [
  {
    order: 1,
    sectionName: "Introduction",
    explanation: [
      "1. Meaning of management",
      "2. Need for management in all organisations",
      "3. Management as a deliberate process",
      "4. Management through activities and functions",
    ],
  },
  {
    order: 2,
    sectionName: "Definitions of Management",
    explanation: [
      "1. Process",
      "2. Working with people",
      "3. Achieving objectives",
      "4. Efficiency",
      "5. Effectiveness",
      "6. Coordination of resources",
    ],
  },
  {
    order: 3,
    sectionName: "Concept of Management",
    explanation: [
      "1. Goal achievement",
      "2. Getting things done",
      "3. Through and with people",
      "4. Effective use of resources",
      "5. Efficiency",
      "6. Effectiveness",
    ],
  },
  {
    order: 4,
    sectionName: "Effectiveness versus Efficiency",
    explanation: [
      "1. Effectiveness",
      "2. Doing the right task",
      "3. Efficiency",
      "4. Doing the task correctly",
      "5. Minimum cost",
      "6. Balance between efficiency and effectiveness",
    ],
  },
  {
    order: 5,
    sectionName: "Characteristics of Management",
    explanation: [
      "1. Goal-oriented process",
      "2. All pervasive",
      "3. Multidimensional",
      "4. Management of work",
      "5. Management of people",
      "6. Management of operations",
      "7. Continuous process",
      "8. Group activity",
      "9. Dynamic function",
      "10. Intangible force",
    ],
  },
  {
    order: 6,
    sectionName: "Objectives of Management",
    explanation: [
      "1. Organisational objectives",
      "2. Survival",
      "3. Profit",
      "4. Growth",
      "5. Social objectives",
      "6. Benefit to society",
      "7. Environmental friendly methods",
      "8. Employment opportunities",
      "9. Community welfare",
      "10. Personnel objectives",
      "11. Financial needs",
      "12. Social needs",
      "13. Personal growth",
      "14. Harmony between personal and organisational goals",
    ],
  },
  {
    order: 7,
    sectionName: "Importance of Management",
    explanation: [
      "1. Helps in achieving group goals",
      "2. Increases efficiency",
      "3. Creates a dynamic organisation",
      "4. Helps in achieving personal objectives",
      "5. Helps in the development of society",
    ],
  },
  {
    order: 8,
    sectionName: "Nature of Management",
    explanation: [
      "1. Management is as old as civilisation",
      "2. Developed with trade and commerce",
      "3. Evolved from practice and theory",
      "4. Has different dimensions",
      "5. Can be studied as art, science and profession",
    ],
  },
  {
    order: 9,
    sectionName: "Management as an Art",
    explanation: [
      "1. Existence of theoretical knowledge",
      "2. Personalised application",
      "3. Based on practice and creativity",
      "4. Skillful management",
      "5. Experience-based performance",
    ],
  },
  {
    order: 10,
    sectionName: "Management as a Science",
    explanation: [
      "1. Systematised body of knowledge",
      "2. Principles based on observation",
      "3. Principles based on experimentation",
      "4. Universal validity in a limited sense",
      "5. Inexact science",
      "6. Use of standardised techniques",
    ],
  },
  {
    order: 11,
    sectionName: "Management as a Profession",
    explanation: [
      "1. Well-defined body of knowledge",
      "2. Restricted entry",
      "3. Professional association",
      "4. Ethical code of conduct",
      "5. Service motive",
      "6. Management has some features of profession",
      "7. Management is not a full profession",
    ],
  },
  {
    order: 12,
    sectionName: "Levels of Management",
    explanation: [
      "1. Top management",
      "2. Chairman",
      "3. Chief executive officer",
      "4. President",
      "5. Vice-president",
      "6. Middle management",
      "7. Departmental heads",
      "8. Supervisory management",
      "9. Operational management",
      "10. Foremen and supervisors",
      "11. Hierarchy",
      "12. Authority and responsibility",
    ],
  },
  {
    order: 13,
    sectionName: "Functions of Management",
    explanation: [
      "1. Planning",
      "2. Organising",
      "3. Staffing",
      "4. Directing",
      "5. Controlling",
    ],
  },
  {
    order: 14,
    sectionName: "Coordination: The Essence of Management",
    explanation: [
      "1. Coordination as binding force",
      "2. Common thread of management",
      "3. Synchronisation of activities",
      "4. Harmony among individual efforts",
      "5. Achievement of common goals",
      "6. Essence of management",
    ],
  },
  {
    order: 15,
    sectionName: "Characteristics of Coordination",
    explanation: [
      "1. Integrates group efforts",
      "2. Ensures unity of action",
      "3. Continuous process",
      "4. All pervasive function",
      "5. Responsibility of all managers",
      "6. Deliberate function",
    ],
  },
  {
    order: 16,
    sectionName: "Importance of Coordination",
    explanation: [
      "1. Growth in size",
      "2. Functional differentiation",
      "3. Specialisation",
      "4. Interdependence of departments",
      "5. Need for harmony",
      "6. Organisational efficiency",
    ],
  },
];

const toKeywords = (explanation = []) =>
  explanation
    .map((item) => String(item).replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);

await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 10000 });

const chapter = await Chapters.findOne({
  _id: chapterId,
  subject_of_chapter: subjectId,
  class_of_chapter: classId,
});

if (!chapter) {
  throw new Error("Target chapter not found");
}

const existingSections = await Sections.find({
  chapter_of_section: chapterId,
  subject_of_section: subjectId,
});

if (existingSections.length > 0) {
  await Sections.deleteMany({
    _id: { $in: existingSections.map((section) => section._id) },
  });
}

const createdSections = await Sections.insertMany(
  rows.map((row) => ({
    section_name: row.sectionName,
    section_content: row.explanation,
    keywords: toKeywords(row.explanation),
    subsections: [],
    order: row.order,
    chapter_of_section: chapterId,
    subject_of_section: subjectId,
    class_of_section: classId,
  }))
);

chapter.sections = createdSections.map((section) => section._id);
await chapter.save();

console.log(
  JSON.stringify(
    {
      chapterId,
      chapterName: chapter.chapter_name,
      replacedSections: existingSections.length,
      createdSections: createdSections.length,
    },
    null,
    2
  )
);

await mongoose.disconnect();

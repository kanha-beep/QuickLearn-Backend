import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const subjectId = "6a635f0128870dc644b63e03";
const classId = "6a635ca828870dc644b63dc1";
const chapterId = "6a63638b28870dc644b63e24";
const chapterName = "Principles of Management";

const rows = [
  {
    order: 1,
    sectionName: "Principles of Management",
    explanation: [
      "1. Broad and general guidelines",
      "2. Guide decision-making and behaviour",
      "3. Different from techniques",
      "4. Different from values",
      "5. Applied creatively according to situation",
    ],
  },
  {
    order: 2,
    sectionName: "Nature of Principles of Management",
    explanation: [
      "1. Universal applicability",
      "2. General guidelines",
      "3. Formed by practice and experimentation",
      "4. Flexible",
      "5. Mainly behavioural",
      "6. Cause and effect relationships",
      "7. Contingent",
    ],
  },
  {
    order: 3,
    sectionName: "Significance of Principles of Management",
    explanation: [
      "1. Provide useful insights into reality",
      "2. Optimum utilisation of resources and effective administration",
      "3. Scientific decisions",
      "4. Meeting changing environment requirements",
      "5. Fulfilling social responsibility",
      "6. Management training, education and research",
    ],
  },
  {
    order: 4,
    sectionName: "Taylor's Scientific Management",
    explanation: [
      "1. Father of Scientific Management",
      "2. Scientific study of work",
      "3. One best way",
      "4. Time and motion studies",
      "5. Efficiency movement",
      "6. Improvement of factory system",
    ],
  },
  {
    order: 5,
    sectionName: "Principles of Scientific Management",
    explanation: [
      "1. Science not Rule of Thumb",
      "2. Harmony not Discord",
      "3. Cooperation not Individualism",
      "4. Maximum not Restricted Output",
      "5. Development of each and every person to greatest efficiency and prosperity",
    ],
  },
  {
    order: 6,
    sectionName: "Science not Rule of Thumb",
    explanation: [
      "1. Scientific inquiry",
      "2. Replaces traditional methods",
      "3. Standard method",
      "4. Work study",
      "5. Saving of time, energy and materials",
    ],
  },
  {
    order: 7,
    sectionName: "Harmony not Discord",
    explanation: [
      "1. Complete harmony between management and workers",
      "2. No class conflict",
      "3. Mental revolution",
      "4. Mutual trust",
      "5. Shared prosperity",
    ],
  },
  {
    order: 8,
    sectionName: "Cooperation not Individualism",
    explanation: [
      "1. Complete cooperation between labour and management",
      "2. Reward constructive suggestions",
      "3. Equal division of work and responsibility",
      "4. Joint efforts",
      "5. Better performance",
    ],
  },
  {
    order: 9,
    sectionName: "Maximum not Restricted Output",
    explanation: [
      "1. Maximum production",
      "2. Avoid restricted output",
      "3. Higher efficiency",
      "4. Greater prosperity for workers and company",
      "5. Increase the size of surplus",
    ],
  },
  {
    order: 10,
    sectionName: "Development of Each and Every Person to Greatest Efficiency and Prosperity",
    explanation: [
      "1. Scientific selection of workers",
      "2. Proper training",
      "3. Match work with capabilities",
      "4. Efficiency of employees",
      "5. Prosperity of workers and company",
    ],
  },
  {
    order: 11,
    sectionName: "Techniques of Scientific Management",
    explanation: [
      "1. Functional foremanship",
      "2. Standardisation and simplification of work",
      "3. Method study",
      "4. Motion study",
      "5. Time study",
      "6. Fatigue study",
      "7. Differential piece wage system",
    ],
  },
  {
    order: 12,
    sectionName: "Functional Foremanship",
    explanation: [
      "1. Separation of planning and execution",
      "2. Eight specialists",
      "3. Planning incharge",
      "4. Production incharge",
      "5. Specialisation at shop floor",
    ],
  },
  {
    order: 13,
    sectionName: "Standardisation and Simplification of Work",
    explanation: [
      "1. Standard methods",
      "2. Standard tools",
      "3. Standards of quality and performance",
      "4. Elimination of unnecessary variety",
      "5. Reduction in cost and waste",
    ],
  },
  {
    order: 14,
    sectionName: "Method Study",
    explanation: [
      "1. One best way of doing a job",
      "2. Analysis of production process",
      "3. Better sequence of operations",
      "4. Efficient use of men, machines and materials",
      "5. Minimisation of cost and maximisation of quality",
    ],
  },
  {
    order: 15,
    sectionName: "Motion Study",
    explanation: [
      "1. Study of movements",
      "2. Elimination of unnecessary motions",
      "3. Productive motions",
      "4. Incidental motions",
      "5. Unproductive motions",
      "6. Increased productivity",
    ],
  },
  {
    order: 16,
    sectionName: "Time Study",
    explanation: [
      "1. Standard time for a job",
      "2. Time measuring devices",
      "3. Fixing standard task",
      "4. Determining number of workers",
      "5. Incentive schemes and labour cost",
    ],
  },
  {
    order: 17,
    sectionName: "Fatigue Study",
    explanation: [
      "1. Study of physical and mental tiredness",
      "2. Need for rest intervals",
      "3. Regaining stamina",
      "4. Improving productivity",
      "5. Removal of causes of fatigue",
    ],
  },
  {
    order: 18,
    sectionName: "Differential Piece Wage System",
    explanation: [
      "1. Different wage rates",
      "2. Reward efficient workers",
      "3. Lower rate for inefficient workers",
      "4. Based on standard output",
      "5. Motivation for better performance",
    ],
  },
  {
    order: 19,
    sectionName: "Mental Revolution",
    explanation: [
      "1. Change in attitude of workers and management",
      "2. From competition to cooperation",
      "3. Increase in surplus",
      "4. Share gains with workers",
      "5. Mutual prosperity",
    ],
  },
  {
    order: 20,
    sectionName: "Fayol's Principles of Management",
    explanation: [
      "1. Administrative theory",
      "2. Father of General Management",
      "3. Top level management perspective",
      "4. Fourteen principles of management",
      "5. General and Industrial Management",
    ],
  },
  {
    order: 21,
    sectionName: "Division of Work",
    explanation: [
      "1. Small tasks",
      "2. Specialisation",
      "3. More and better work",
      "4. Efficient use of human effort",
      "5. Trained specialist",
    ],
  },
  {
    order: 22,
    sectionName: "Authority and Responsibility",
    explanation: [
      "1. Right to give orders",
      "2. Responsibility as corollary of authority",
      "3. Balance between authority and responsibility",
      "4. Formal and informal authority",
      "5. Safeguards against misuse of power",
    ],
  },
  {
    order: 23,
    sectionName: "Discipline",
    explanation: [
      "1. Obedience to rules and agreements",
      "2. Good superiors",
      "3. Clear and fair agreements",
      "4. Judicious application of penalties",
      "5. Commitment by management and workers",
    ],
  },
  {
    order: 24,
    sectionName: "Unity of Command",
    explanation: [
      "1. One employee one boss",
      "2. Avoid dual subordination",
      "3. Clear responsibility",
      "4. Prevent confusion",
      "5. Maintain authority and discipline",
    ],
  },
  {
    order: 25,
    sectionName: "Unity of Direction",
    explanation: [
      "1. One head",
      "2. One plan",
      "3. Same objective",
      "4. Coordinated efforts",
      "5. Unity of action",
    ],
  },
  {
    order: 26,
    sectionName: "Subordination of Individual Interest to General Interest",
    explanation: [
      "1. Organisational interest above individual interest",
      "2. Common good",
      "3. Larger interests of stakeholders",
      "4. Selflessness",
      "5. Example by managers",
    ],
  },
  {
    order: 27,
    sectionName: "Remuneration of Employees",
    explanation: [
      "1. Fair wages",
      "2. Reasonable standard of living",
      "3. Within paying capacity of company",
      "4. Just and equitable remuneration",
      "5. Good relations and smooth working",
    ],
  },
  {
    order: 28,
    sectionName: "Centralisation and Decentralisation",
    explanation: [
      "1. Concentration of authority",
      "2. Dispersal of authority",
      "3. Balance between the two",
      "4. Depends on circumstances",
      "5. Large organisations have more decentralisation",
    ],
  },
  {
    order: 29,
    sectionName: "Scalar Chain",
    explanation: [
      "1. Chain of authority",
      "2. Formal lines of communication",
      "3. Top to bottom hierarchy",
      "4. Gang plank in emergency",
      "5. Avoid delay in communication",
    ],
  },
  {
    order: 30,
    sectionName: "Order",
    explanation: [
      "1. Right place for everything and everyone",
      "2. Orderliness",
      "3. Suitable place and time",
      "4. Maximum efficiency",
      "5. Increased productivity",
    ],
  },
  {
    order: 31,
    sectionName: "Equity",
    explanation: [
      "1. Kindliness and justice",
      "2. Fair treatment",
      "3. No discrimination",
      "4. Loyalty and devotion",
      "5. Equality in the eyes of management",
    ],
  },
  {
    order: 32,
    sectionName: "Stability of Personnel",
    explanation: [
      "1. Minimise employee turnover",
      "2. Stability of tenure",
      "3. Time to show results",
      "4. Reduced insecurity",
      "5. Better organisational efficiency",
    ],
  },
  {
    order: 33,
    sectionName: "Initiative",
    explanation: [
      "1. Taking first step",
      "2. Self-motivation",
      "3. Thinking and executing plans",
      "4. Employee suggestion system",
      "5. Reward improvement ideas",
    ],
  },
  {
    order: 34,
    sectionName: "Esprit De Corps",
    explanation: [
      "1. Team spirit",
      "2. Unity and harmony",
      "3. Replace I with We",
      "4. Mutual trust and belongingness",
      "5. Better coordination",
    ],
  },
  {
    order: 35,
    sectionName: "Fayol Versus Taylor - A Comparison",
    explanation: [
      "1. Fayol focused on top management",
      "2. Taylor focused on shop floor",
      "3. Fayol based on personal experience",
      "4. Taylor based on observation and experimentation",
      "5. Fayol focused on administration",
      "6. Taylor focused on productivity",
      "7. Both contributions are complementary",
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

chapter.chapter_name = chapterName;
await chapter.save();

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

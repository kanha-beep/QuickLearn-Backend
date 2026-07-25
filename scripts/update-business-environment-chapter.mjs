import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const subjectId = "6a635f0128870dc644b63e03";
const classId = "6a635ca828870dc644b63dc1";
const chapterName = "Business Environment";
const chapterOrder = 3;

const rows = [
  {
    order: 1,
    sectionName: "Introduction",
    explanation: [
      "1. Meaning of business environment",
      "2. Sum total of external forces",
      "3. Individuals, institutions and other forces",
      "4. Outside the control of business enterprise",
      "5. Influences the performance of business",
    ],
  },
  {
    order: 2,
    sectionName: "Features of Business Environment",
    explanation: [
      "1. Totality of external forces",
      "2. Specific and general forces",
      "3. Inter-relatedness",
      "4. Dynamic nature",
      "5. Uncertainty",
      "6. Complexity",
      "7. Relativity",
    ],
  },
  {
    order: 3,
    sectionName: "Importance of Business Environment",
    explanation: [
      "1. Identifies opportunities",
      "2. Helps in getting first mover advantage",
      "3. Identifies threats and early warning signals",
      "4. Helps in tapping useful resources",
      "5. Helps in coping with rapid changes",
      "6. Assists in planning and policy formulation",
      "7. Improves performance",
    ],
  },
  {
    order: 4,
    sectionName: "Dimensions of Business Environment",
    explanation: [
      "1. Economic environment",
      "2. Social environment",
      "3. Technological environment",
      "4. Political environment",
      "5. Legal environment",
    ],
  },
  {
    order: 5,
    sectionName: "Economic Environment",
    explanation: [
      "1. Interest rates",
      "2. Inflation rates",
      "3. Changes in disposable income",
      "4. Stock market indices",
      "5. Value of rupee",
      "6. Affects management practices and demand",
    ],
  },
  {
    order: 6,
    sectionName: "Social Environment",
    explanation: [
      "1. Customs and traditions",
      "2. Values",
      "3. Social trends",
      "4. Society's expectations from business",
      "5. Changes in consumption patterns",
      "6. Creates opportunities and threats",
    ],
  },
  {
    order: 7,
    sectionName: "Technological Environment",
    explanation: [
      "1. Scientific improvements",
      "2. Innovations",
      "3. New methods of production",
      "4. New ways of operating business",
      "5. Creates both opportunities and threats",
      "6. Leads to new products and services",
    ],
  },
  {
    order: 8,
    sectionName: "Political Environment",
    explanation: [
      "1. Political conditions in the country",
      "2. Stability and peace",
      "3. Attitude of government towards business",
      "4. Political leadership and ideology",
      "5. Confidence for long-term investment",
      "6. Political instability affects business confidence",
    ],
  },
  {
    order: 9,
    sectionName: "Legal Environment",
    explanation: [
      "1. Laws and regulations",
      "2. Administrative orders",
      "3. Court judgments",
      "4. Government commissions and agencies",
      "5. Compliance is essential",
      "6. Non-compliance leads to legal problems",
    ],
  },
  {
    order: 10,
    sectionName: "Economic Environment in India",
    explanation: [
      "1. Macro-level factors related to production and distribution",
      "2. Stage of economic development",
      "3. Mixed economy",
      "4. Government economic policies",
      "5. Economic planning and budgets",
      "6. Economic indices and infrastructure",
    ],
  },
  {
    order: 11,
    sectionName: "Indian Economy at Independence",
    explanation: [
      "1. Mainly agricultural and rural economy",
      "2. Majority employed in agriculture",
      "3. Large population living in villages",
      "4. Low productivity technology",
      "5. Weak public health system",
      "6. Need for state intervention and planning",
    ],
  },
  {
    order: 12,
    sectionName: "New Industrial Policy 1991",
    explanation: [
      "1. Reduction in compulsory licensing",
      "2. Dereservation of public sector industries",
      "3. Disinvestment in public enterprises",
      "4. Liberalised foreign capital policy",
      "5. Automatic permission for technology agreements",
      "6. Setting up of Foreign Investment Promotion Board",
    ],
  },
  {
    order: 13,
    sectionName: "Liberalisation",
    explanation: [
      "1. Removal of unnecessary controls and restrictions",
      "2. End of licence-permit-quota raj",
      "3. Abolishing licensing in most industries",
      "4. Freedom in scale of business activities",
      "5. Freedom in movement and pricing of goods and services",
      "6. Easier imports, foreign capital and technology",
    ],
  },
  {
    order: 14,
    sectionName: "Privatisation",
    explanation: [
      "1. Greater role of private sector",
      "2. Reduced role of public sector",
      "3. Planned disinvestment",
      "4. Transfer of stake in public enterprises",
      "5. Dilution of government ownership",
      "6. Transfer of ownership and management to private sector",
    ],
  },
  {
    order: 15,
    sectionName: "Globalisation",
    explanation: [
      "1. Integration of world economies",
      "2. Import liberalisation",
      "3. Export promotion",
      "4. Reforms in foreign exchange",
      "5. Free flow of goods, capital and technology",
      "6. Increased international interaction and interdependence",
    ],
  },
  {
    order: 16,
    sectionName: "Demonetisation",
    explanation: [
      "1. Announcement on November 8, 2016",
      "2. Rs 500 and Rs 1000 notes ceased to be legal tender",
      "3. Aimed at curbing corruption and black money",
      "4. Encouraged formal financial system",
      "5. Promoted digital transactions and cash-lite economy",
      "6. Improved tax compliance",
    ],
  },
  {
    order: 17,
    sectionName: "Impact of Government Policy Changes on Business and Industry",
    explanation: [
      "1. Increasing competition",
      "2. More demanding customers",
      "3. Rapidly changing technological environment",
      "4. Necessity for change",
      "5. Need for developing human resources",
      "6. Market orientation",
      "7. Loss of budgetary support to public sector",
    ],
  },
];

const toKeywords = (explanation = []) =>
  explanation
    .map((item) => String(item).replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);

await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 20000 });

const subject = await Single_Subject.findOne({
  _id: subjectId,
  class_of_subject: classId,
});

if (!subject) {
  throw new Error("Target business subject for Class 12 Commerce not found");
}

let chapter = await Chapters.findOne({
  subject_of_chapter: subjectId,
  class_of_chapter: classId,
  $or: [{ chapter_name: chapterName }, { order: chapterOrder }],
});

if (!chapter) {
  chapter = await Chapters.create({
    chapter_name: chapterName,
    sections: [],
    subject_of_chapter: subjectId,
    class_of_chapter: classId,
    order: chapterOrder,
  });
} else {
  chapter.chapter_name = chapterName;
  chapter.order = chapterOrder;
}

const existingSections = await Sections.find({
  chapter_of_section: chapter._id,
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
    chapter_of_section: chapter._id,
    subject_of_section: subjectId,
    class_of_section: classId,
  }))
);

chapter.sections = createdSections.map((section) => section._id);
await chapter.save();

if (!subject.chapters.some((id) => String(id) === String(chapter._id))) {
  subject.chapters.push(chapter._id);
  await subject.save();
}

console.log(
  JSON.stringify(
    {
      chapterId: chapter._id,
      chapterName: chapter.chapter_name,
      subjectId,
      classId,
      replacedSections: existingSections.length,
      createdSections: createdSections.length,
    },
    null,
    2
  )
);

await mongoose.disconnect();

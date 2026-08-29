import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const subjectId = "6a635f0928870dc644b63e09";
const classId = "6a635ca828870dc644b63dc1";
const chapterName = "Introduction";
const chapterOrder = 1;

const rows = [
  {
    order: 1,
    sectionName: "Introduction",
    explanation: [
      "1. Macroeconomics studies the economy as a whole, unlike microeconomics which studies individual buyers, sellers and markets.",
      "2. It looks at broad issues like overall prices, employment, output and the general health of the economy.",
      "3. Economists often use aggregate or representative measures because production, prices and employment in different sectors tend to move together.",
      "4. Macroeconomics also studies how different sectors of the economy are connected with one another.",
      "5. It goes beyond market behaviour alone and examines the role of the State in achieving public goals like employment, education, health and defence.",
      "6. Macroeconomic decision-makers are different from individual economic agents because they work for the welfare of the country as a whole.",
    ],
    keywords: [],
    subsections: [],
  },
  {
    order: 2,
    sectionName: "Economic agents",
    explanation: [
      "1. Economic agents are individuals or institutions that take economic decisions.",
      "2. Consumers decide what to consume and how much to consume.",
      "3. Producers decide what goods and services to produce and how much to produce.",
      "4. Government, corporations and banks also act as economic agents by taking decisions about spending, credit and taxation.",
    ],
    keywords: [],
    subsections: [],
  },
  {
    order: 3,
    sectionName: "Adam smith",
    explanation: [
      "1. Adam Smith is regarded as the founding father of modern economics.",
      "2. His major work was An Enquiry into the Nature and Cause of the Wealth of Nations published in 1776.",
      "3. He argued that market participants often act from self-interest rather than benevolence.",
      "4. His ideas are often linked with support for free market economy.",
      "5. The Physiocrats of France were important political economy thinkers before Smith.",
    ],
    keywords: [],
    subsections: [],
  },
  {
    order: 4,
    sectionName: "Emergence of macroeconomics",
    explanation: [
      "1. Macroeconomics emerged as a separate branch after John Maynard Keynes published The General Theory of Employment, Interest and Money in 1936.",
      "2. Before Keynes, the classical view believed that labour and factories would normally remain fully employed.",
      "3. The Great Depression of 1929 challenged this belief because output and employment fell sharply in many countries.",
      "4. Markets faced low demand, factories remained idle and many workers lost their jobs.",
      "5. Keynes explained that an economy could remain in a situation of long-lasting unemployment.",
      "6. His approach studied the economy as a whole and the links between sectors, which gave rise to macroeconomics as a subject.",
    ],
    keywords: [],
    subsections: [],
  },
  {
    order: 5,
    sectionName: "John maynard keynes",
    explanation: [
      "1. John Maynard Keynes was a British economist born in 1883 and educated at King's College, Cambridge.",
      "2. He was active in international diplomacy after the First World War.",
      "3. He wrote The Economic Consequences of the Peace in 1919.",
      "4. His book General Theory of Employment, Interest and Money published in 1936 became one of the most influential economics books of the twentieth century.",
      "5. He was also known as a skilled foreign currency speculator.",
    ],
    keywords: [],
    subsections: [],
  },
  {
    order: 6,
    sectionName: "Context of the present book of macroeconomics",
    explanation: [
      "1. This book studies the economy in the context of a capitalist country.",
      "2. In a capitalist economy, production is mainly carried out by capitalist enterprises led by entrepreneurs.",
      "3. Production uses capital, land and labour, and the output is sold in the market to earn revenue.",
      "4. Revenue is distributed as rent, interest, wages and profit, while part of profit may be used as investment to expand production.",
      "5. A capitalist economy is marked by private ownership, market sale of output and wage labour.",
      "6. The book explains the economy through four major sectors: firms, government, households and the external sector.",
      "7. Government performs functions like making laws, taxation, public spending and providing services.",
      "8. Households consume, save, pay taxes and supply labour, land or capital to earn income.",
      "9. The external sector includes exports, imports and flows of capital between countries.",
    ],
    keywords: [],
    subsections: [],
  },
  {
    order: 7,
    sectionName: "Suggested readings",
    explanation: [
      "1. Bhaduri, A., 1990. Macroeconomics: The Dynamics of Commodity Production, pages 1–27, Macmillan India Limited, New Delhi.",
      "2. Mankiw, N. G., 2000. Macroeconomics, pages 2–14, Macmillan Worth Publishers, New York.",
    ],
    keywords: [],
    subsections: [],
  },
  {
    order: 8,
    sectionName: "Summary",
    explanation: [
      "1. Macroeconomics studies aggregate variables of the economy.",
      "2. It examines interlinkages among different sectors of the economy.",
      "3. It is different from microeconomics, which mainly studies particular sectors while assuming the rest of the economy remains unchanged.",
      "4. Macroeconomics emerged as a separate subject in the 1930s due to Keynes and the experience of the Great Depression.",
      "5. This book mainly studies the working of a capitalist economy.",
      "6. From the macroeconomic point of view, the economy is seen through four sectors: households, firms, government and external sector.",
    ],
    keywords: [],
    subsections: [],
  },
  {
    order: 9,
    sectionName: "Exercises",
    explanation: [
      "1. What is the difference between microeconomics and macroeconomics?",
      "2. What are the important features of a capitalist economy?",
      "3. Describe the four major sectors in an economy according to the macroeconomic point of view.",
      "4. Describe the Great Depression of 1929.",
    ],
    keywords: [],
    subsections: [],
  },
  {
    order: 10,
    sectionName: "Key concepts",
    explanation: [
      "1. Rate of interest",
      "2. Wage rate",
      "3. Profits",
      "4. Economic agents or units",
      "5. Great Depression",
      "6. Unemployment rate",
      "7. Four factors of production",
      "8. Means of production",
      "9. Inputs",
      "10. Land",
      "11. Labour",
      "12. Capital",
      "13. Entrepreneurship",
      "14. Investment expenditure",
      "15. Wage labour",
      "16. Capitalist country or capitalist economy",
      "17. Firms",
      "18. Capitalist firms",
      "19. Output",
      "20. Households",
      "21. Government",
      "22. External sector",
      "23. Exports",
      "24. Imports",
    ],
    keywords: [],
    subsections: [],
  },
];

await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 20000 });

const subject = await Single_Subject.findOne({
  _id: subjectId,
  class_of_subject: classId,
});

if (!subject) {
  throw new Error("Target Class 12 Commerce economy subject not found");
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
  class_of_section: classId,
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
    keywords: row.keywords,
    subsections: row.subsections,
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
      chapterId: String(chapter._id),
      chapterName: chapter.chapter_name,
      subjectId,
      classId,
      replacedSections: existingSections.length,
      createdSections: createdSections.length,
      sectionNames: createdSections.map((section) => section.section_name),
    },
    null,
    2
  )
);

await mongoose.disconnect();

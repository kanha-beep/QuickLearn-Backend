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
    explanation: [],
    keywords: [
      "Providing managers with useful insights into reality",
      "Optimum utilisation of resources and effective administration",
      "Scientific decisions",
      "Meeting changing environment requirements",
      "Fulfilling social responsibility",
      "Management training, education and research",
    ],
    subsections: [
      {
        subsection_name: "Providing managers with useful insights into reality",
        subsection_content: [
          "Management principles help managers understand real business situations better. They improve knowledge, judgement, and help solve recurring problems quickly by learning from past mistakes.",
        ],
        order: 1,
      },
      {
        subsection_name: "Optimum utilisation of resources and effective administration",
        subsection_content: [
          "These principles help managers use human and material resources in the best possible way. They reduce waste and support fair administration by limiting personal bias in decisions.",
        ],
        order: 2,
      },
      {
        subsection_name: "Scientific decisions",
        subsection_content: [
          "Management principles help managers take decisions based on facts, logic, and careful thinking. This makes decisions more objective, realistic, timely, and measurable.",
        ],
        order: 3,
      },
      {
        subsection_name: "Meeting changing environment requirements",
        subsection_content: [
          "Management principles are flexible, so managers can adapt them to changing business conditions. They help organisations respond to trends like specialisation, outsourcing, and focus on core activities.",
        ],
        order: 4,
      },
      {
        subsection_name: "Fulfilling social responsibility",
        subsection_content: [
          "These principles guide businesses to act responsibly toward society. They now include fairness, customer value, environmental care, and proper dealings with stakeholders.",
        ],
        order: 5,
      },
      {
        subsection_name: "Management training, education and research",
        subsection_content: [
          "Management principles form the base for management studies, training, and research. They also help develop new techniques and strengthen management as a discipline.",
        ],
        order: 6,
      },
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
    explanation: [],
    keywords: [
      "Science not Rule of Thumb",
      "Harmony, Not Discord",
      "Cooperation, Not Individualism",
      "Maximum, not Restricted Output",
      "Development of Each and Every Person to His or Her Greatest Efficiency and Prosperity",
      "Functional foremanship",
      "Standardisation and simplification of work",
      "Method study",
      "Motion study",
      "Time study",
      "Fatigue study",
      "Differential piece wage system",
    ],
    subsections: [
      {
        subsection_name: "Science not Rule of Thumb",
        subsection_content: [
          "Taylor said work should be done through scientific study and analysis, not by guesswork or old methods. The best method should be identified, standardised, and used throughout the organisation.",
        ],
        order: 1,
      },
      {
        subsection_name: "Harmony, Not Discord",
        subsection_content: [
          "Taylor believed there should be peace and mutual understanding between workers and management. Both sides should see that their interests are connected and work together without conflict.",
        ],
        order: 2,
      },
      {
        subsection_name: "Cooperation, Not Individualism",
        subsection_content: [
          "Taylor wanted full cooperation between labour and management instead of selfish individual action. Management should listen to workers, reward good suggestions, and involve them in important matters.",
        ],
        order: 3,
      },
      {
        subsection_name: "Maximum, not Restricted Output",
        subsection_content: [
          "Taylor emphasised maximum production instead of deliberately limiting output. Higher output increases efficiency and benefits both workers and the company.",
        ],
        order: 4,
      },
      {
        subsection_name: "Development of Each and Every Person to His or Her Greatest Efficiency and Prosperity",
        subsection_content: [
          "Taylor stressed scientific selection, proper training, and suitable job assignment. When workers are developed according to their abilities, both efficiency and prosperity increase.",
        ],
        order: 5,
      },
      {
        subsection_name: "Functional foremanship",
        subsection_content: [
          "Taylor said one foreman cannot manage all planning, supervision, and control work alone. So he divided the foreman's job among eight specialists, each handling a separate planning or production duty for better efficiency.",
        ],
        order: 6,
      },
      {
        subsection_name: "Standardisation and simplification of work",
        subsection_content: [
          "Taylor supported setting standards for methods, tools, quality, and performance. He also wanted unnecessary varieties and designs removed so work becomes simpler, cheaper, and less wasteful.",
        ],
        order: 7,
      },
      {
        subsection_name: "Method study",
        subsection_content: [
          "Method study means finding the one best way to do a job. It examines each stage of the production process to choose the most efficient sequence and reduce cost while improving quality.",
        ],
        order: 8,
      },
      {
        subsection_name: "Motion study",
        subsection_content: [
          "Motion study examines the movements used while doing a job and removes useless ones. This saves time and energy and helps workers complete work more efficiently.",
        ],
        order: 9,
      },
      {
        subsection_name: "Time study",
        subsection_content: [
          "Time study fixes the standard time needed for a well-defined task by taking repeated measurements. It helps decide standard output, labour requirement, incentive plans, and labour cost.",
        ],
        order: 10,
      },
      {
        subsection_name: "Fatigue study",
        subsection_content: [
          "Fatigue study looks at when and why workers become physically or mentally tired during work. It helps decide proper rest intervals and remove causes of tiredness so productivity can stay high.",
        ],
        order: 11,
      },
      {
        subsection_name: "Differential piece wage system",
        subsection_content: [
          "Taylor proposed different wage rates for efficient and inefficient workers based on standard output. Workers who meet or exceed the standard get a higher rate, which rewards efficiency and motivates better performance.",
        ],
        order: 12,
      },
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
    order: 12,
    sectionName: "Fayol's Principles of Management",
    explanation: [],
    keywords: [
      "Division of Work",
      "Authority and Responsibility",
      "Discipline",
      "Unity of Command",
      "Unity of Direction",
      "Subordination of Individual Interest to General Interest",
      "Remuneration of Employees",
      "Centralisation and Decentralisation",
      "Scalar Chain",
      "Order",
      "Equity",
      "Stability of Personnel",
      "Initative",
      "Esprit De Corps",
    ],
    subsections: [
      {
        subsection_name: "Division of Work",
        subsection_content: [
          "Work should be divided into small and specialised jobs. When trained people do specific tasks, work becomes more efficient and the organisation can achieve better output.",
        ],
        order: 1,
      },
      {
        subsection_name: "Authority and Responsibility",
        subsection_content: [
          "A manager must have the right to give orders and enough power to carry out assigned duties. Authority and responsibility should stay balanced so work can be done properly without misuse of power.",
        ],
        order: 2,
      },
      {
        subsection_name: "Discipline",
        subsection_content: [
          "Discipline means obeying rules and honouring agreements necessary for the organisation to function well. It depends on fair agreements, good superiors, and proper use of penalties when needed.",
        ],
        order: 3,
      },
      {
        subsection_name: "Unity of Command",
        subsection_content: [
          "Each employee should get orders from only one superior. If a person receives instructions from more than one boss, confusion and conflict arise, and work suffers.",
        ],
        order: 4,
      },
      {
        subsection_name: "Unity of Direction",
        subsection_content: [
          "Activities with the same objective should have one head and one plan. This keeps efforts coordinated and prevents overlap between different units or divisions.",
        ],
        order: 5,
      },
      {
        subsection_name: "Subordination of Individual Interest to General Interest",
        subsection_content: [
          "The interest of the organisation should come before the interest of any one employee or small group. Managers and workers should avoid personal gain that harms the larger good of the company and stakeholders.",
        ],
        order: 6,
      },
      {
        subsection_name: "Remuneration of Employees",
        subsection_content: [
          "Employees should receive fair and reasonable pay, and the organisation should also be able to afford it. Just and equitable remuneration helps create good relations and smooth working.",
        ],
        order: 7,
      },
      {
        subsection_name: "Centralisation and Decentralisation",
        subsection_content: [
          "Centralisation means decision-making power is concentrated, while decentralisation means it is shared among more people. A good organisation should maintain a proper balance based on its size and situation.",
        ],
        order: 8,
      },
      {
        subsection_name: "Scalar Chain",
        subsection_content: [
          "There should be a clear line of authority and communication from top to bottom. In normal situations this chain should be followed, but in emergencies a shorter route can be used to avoid delay.",
        ],
        order: 9,
      },
      {
        subsection_name: "Order",
        subsection_content: [
          "People and materials should be kept in the right place at the right time. Proper order avoids confusion and helps the organisation work with greater efficiency and productivity.",
        ],
        order: 10,
      },
      {
        subsection_name: "Equity",
        subsection_content: [
          "Managers should treat all employees fairly, kindly, and justly. Equal treatment builds loyalty and devotion, and there should be no discrimination on any basis.",
        ],
        order: 11,
      },
      {
        subsection_name: "Stability of Personnel",
        subsection_content: [
          "Employees should not be changed too frequently because stability improves efficiency. Keeping people in their positions for a reasonable time reduces insecurity and saves recruitment and training costs.",
        ],
        order: 12,
      },
      {
        subsection_name: "Initative",
        subsection_content: [
          "Workers should be encouraged to think, suggest improvements, and take the first step in useful work. Good organisations support such self-motivated action and reward ideas that save time or cost.",
        ],
        order: 13,
      },
      {
        subsection_name: "Esprit De Corps",
        subsection_content: [
          "Management should build team spirit, unity, and harmony among employees. A strong feeling of togetherness improves coordination, trust, and commitment in the organisation.",
        ],
        order: 14,
      },
    ],
  },
  {
    order: 13,
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
    keywords: Array.isArray(row.keywords) ? row.keywords : toKeywords(row.explanation),
    subsections: Array.isArray(row.subsections) ? row.subsections : [],
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

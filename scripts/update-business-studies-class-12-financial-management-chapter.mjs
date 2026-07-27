import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const subjectId = "6a635f0128870dc644b63e03";
const classId = "6a635ca828870dc644b63dc1";

const chapterConfig = {
  order: 9,
  chapterName: "Financial Management",
  rows: [
    {
      order: 1,
      sectionName: "Introduction",
      explanation: [
        "1. Finance is essential for running, expanding, and modernising a business.",
        "2. Financial decisions affect employees, shareholders, capital structure, and future growth.",
        "3. Sound financial planning and wise use of funds are crucial for business survival and success.",
      ],
    },
    {
      order: 2,
      sectionName: "Meaning of Business Finance",
      explanation: [
        "1. Money required for carrying out business activities is called business finance.",
        "2. Finance is needed to establish, run, modernise, expand, and diversify a business.",
        "3. It is required for buying assets and for carrying out day-to-day operations of business.",
      ],
    },
    {
      order: 3,
      sectionName: "Financial Management",
      explanation: [
        "1. Financial management is concerned with optimal procurement as well as usage of finance.",
        "2. It aims at reducing cost of funds, controlling risk, and ensuring effective deployment of funds.",
        "3. It also ensures availability of enough funds whenever required and avoids idle finance.",
      ],
    },
    {
      order: 4,
      sectionName: "Objectives",
      explanation: [
        "1. The primary objective of financial management is to maximise shareholders' wealth.",
        "2. It aims at maximising the current price of equity shares of the company.",
        "3. Every financial decision should add value to the company and benefit shareholders.",
      ],
    },
    {
      order: 5,
      sectionName: "Financial Decisions",
      explanation: [
        "1. Investment decision",
        "2. Financing decision",
        "3. Dividend decision",
      ],
    },
    {
      order: 6,
      sectionName: "Investment Decision",
      explanation: [
        "1. Investment decision relates to how the firm's funds are invested in different assets.",
        "2. It can be long-term or short-term.",
        "3. Long-term investment decision is also called capital budgeting decision.",
        "4. Short-term investment decision is concerned with working capital management.",
      ],
    },
    {
      order: 7,
      sectionName: "Factors Affecting Capital Budgeting Decision",
      explanation: [
        "1. Cash flows of the project",
        "2. The rate of return",
        "3. The investment criteria involved",
      ],
    },
    {
      order: 8,
      sectionName: "Financing Decision",
      explanation: [
        "1. Financing decision is about the quantum of finance to be raised from various long-term sources.",
        "2. It involves choosing between shareholders' funds and borrowed funds.",
        "3. It determines the overall cost of capital and the financial risk of the enterprise.",
      ],
    },
    {
      order: 9,
      sectionName: "Factors Affecting Financing Decisions",
      explanation: [
        "1. Cost",
        "2. Risk",
        "3. Floatation costs",
        "4. Cash flow position of the company",
        "5. Fixed operating costs",
        "6. Control considerations",
        "7. State of capital market",
      ],
    },
    {
      order: 10,
      sectionName: "Dividend Decision",
      explanation: [
        "1. Dividend is that portion of profit which is distributed to shareholders.",
        "2. Dividend decision is about how much profit should be distributed and how much should be retained in the business.",
        "3. Retained earnings increase the firm's future earning capacity and influence financing decisions.",
      ],
    },
    {
      order: 11,
      sectionName: "Factors Affecting Dividend Decision",
      explanation: [
        "1. Amount of earnings",
        "2. Stability of earnings",
        "3. Stability of dividends",
        "4. Growth opportunities",
        "5. Cash flow position",
        "6. Shareholders' preference",
        "7. Taxation policy",
        "8. Stock market reaction",
        "9. Access to capital market",
        "10. Legal constraints",
        "11. Contractual constraints",
      ],
    },
    {
      order: 12,
      sectionName: "Financial Planning",
      explanation: [
        "1. Financial planning is the preparation of a financial blueprint of an organisation's future operations.",
        "2. It aims at ensuring that enough funds are available at the right time.",
        "3. It seeks proper matching of fund requirements and their availability.",
      ],
    },
    {
      order: 13,
      sectionName: "Importance of Financial Planning",
      explanation: [
        "1. Helps in forecasting what may happen in future under different business situations",
        "2. Helps in avoiding business shocks and surprises",
        "3. Helps in coordinating various business functions",
        "4. Reduces waste, duplication of efforts, and gaps in planning",
        "5. Tries to link the present with the future",
        "6. Provides a link between investment and financing decisions",
        "7. Makes evaluation of actual performance easier",
      ],
    },
    {
      order: 14,
      sectionName: "Capital Structure",
      explanation: [
        "1. Capital structure refers to the mix between owners' funds and borrowed funds.",
        "2. It affects both profitability and financial risk of the business.",
        "3. An optimal capital structure is one that maximises the value of equity shares.",
      ],
    },
    {
      order: 15,
      sectionName: "Trading on Equity and EBIT-EPS Analysis",
      explanation: [
        "1. Trading on equity refers to the increase in profit earned by equity shareholders due to the presence of fixed financial charges like interest.",
        "2. EBIT-EPS analysis helps in understanding the impact of debt on earnings per share.",
        "3. Favourable financial leverage raises EPS, while unfavourable financial leverage reduces EPS.",
      ],
    },
    {
      order: 16,
      sectionName: "Factors Affecting the Choice of Capital Structure",
      explanation: [
        "1. Cash flow position",
        "2. Interest coverage ratio (ICR)",
        "3. Debt service coverage ratio (DSCR)",
        "4. Return on investment (ROI)",
        "5. Cost of debt",
        "6. Tax rate",
        "7. Cost of equity",
        "8. Floatation costs",
        "9. Risk consideration",
        "10. Flexibility",
        "11. Control",
        "12. Regulatory framework",
        "13. Stock market conditions",
        "14. Capital structure of other companies",
      ],
    },
    {
      order: 17,
      sectionName: "Fixed and Working Capital",
      explanation: [
        "1. Every company needs funds to finance its fixed assets and current assets.",
        "2. Fixed assets remain in the business for more than one year.",
        "3. Current assets get converted into cash or cash equivalents within one year.",
      ],
    },
    {
      order: 18,
      sectionName: "Management of Fixed Capital",
      explanation: [
        "1. Fixed capital refers to investment in long-term assets.",
        "2. Management of fixed capital involves allocation of firm's capital to projects or assets with long-term implications.",
        "3. These decisions affect growth, profitability, and risk of the business in the long run.",
      ],
    },
    {
      order: 19,
      sectionName: "Factors Affecting the Requirement of Fixed Capital",
      explanation: [
        "1. Nature of business",
        "2. Scale of operations",
        "3. Choice of technique",
        "4. Technology upgradation",
        "5. Growth prospects",
        "6. Diversification",
        "7. Financing alternatives",
        "8. Level of collaboration",
      ],
    },
    {
      order: 20,
      sectionName: "Working Capital",
      explanation: [
        "1. Working capital refers to investment in current assets needed for day-to-day operations of the business.",
        "2. Net working capital is the excess of current assets over current liabilities.",
        "3. A balance is needed between liquidity and profitability.",
      ],
    },
    {
      order: 21,
      sectionName: "Factors Affecting the Working Capital Requirements",
      explanation: [
        "1. Nature of business",
        "2. Scale of operations",
        "3. Business cycle",
        "4. Seasonal factors",
        "5. Production cycle",
        "6. Credit allowed",
        "7. Credit availed",
        "8. Operating efficiency",
        "9. Availability of raw material",
        "10. Growth prospects",
        "11. Level of competition",
        "12. Inflation",
      ],
    },
    {
      order: 22,
      sectionName: "Key Terms",
      explanation: [
        "1. Financial management",
        "2. Wealth maximisation",
        "3. Investment decision",
        "4. Financing decision",
        "5. Dividend decision",
        "6. Capital budgeting",
        "7. Working capital",
        "8. Financial planning",
        "9. Capital structure",
        "10. Trading on equity",
      ],
    },
    {
      order: 23,
      sectionName: "Summary",
      explanation: [],
    },
    {
      order: 24,
      sectionName: "Exercises",
      explanation: [],
    },
    {
      order: 25,
      sectionName: "Top 3 Sample Questions",
      explanation: [
        "1. What is financial management? Explain its objectives.",
        "2. Explain the factors affecting the choice of capital structure.",
        "3. What is working capital? Discuss the factors affecting its requirement.",
      ],
    },
  ],
};

const toKeywords = (explanation = []) =>
  explanation
    .map((item) => String(item).replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);

const syncChapter = async ({ order, chapterName, rows }) => {
  let chapter = await Chapters.findOne({
    subject_of_chapter: subjectId,
    class_of_chapter: classId,
    $or: [{ chapter_name: chapterName }, { order }],
  });

  if (!chapter) {
    chapter = await Chapters.create({
      chapter_name: chapterName,
      sections: [],
      subject_of_chapter: subjectId,
      class_of_chapter: classId,
      order,
    });
  } else {
    chapter.chapter_name = chapterName;
    chapter.order = order;
    await chapter.save();
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

  return {
    chapterId: chapter._id,
    chapterName,
    order,
    replacedSections: existingSections.length,
    createdSections: createdSections.length,
  };
};

await mongoose.connect(process.env.MONGO_URL, { serverSelectionTimeoutMS: 20000 });

const subject = await Single_Subject.findOne({
  _id: subjectId,
  class_of_subject: classId,
});

if (!subject) {
  throw new Error("Target business subject for Class 12 not found");
}

const result = await syncChapter(chapterConfig);

if (!subject.chapters.some((id) => String(id) === String(result.chapterId))) {
  subject.chapters.push(result.chapterId);
}

await subject.save();

console.log(
  JSON.stringify(
    {
      subjectId,
      classId,
      syncedChapter: result,
    },
    null,
    2
  )
);

await mongoose.disconnect();

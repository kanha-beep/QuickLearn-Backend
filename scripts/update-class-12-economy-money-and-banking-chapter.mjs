import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const subjectId = "6a635f0928870dc644b63e09";
const classId = "6a635ca828870dc644b63dc1";

const chapterConfig = {
  order: 3,
  chapterName: "Money and Banking",
  rows: [
    {
      order: 1,
      sectionName: "Money and Banking",
      explanation: [
        "Money is a commonly accepted medium of exchange in market transactions.",
        "Barter exchange is difficult because it requires double coincidence of wants.",
        "Money works as an intermediate good that both sides are willing to accept.",
        "It allows people to sell what they have and buy what they need more easily.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 2,
      sectionName: "Functions of money",
      explanation: [
        "Money acts as a medium of exchange and removes the main difficulty of barter.",
        "Money serves as a unit of account and expresses values in monetary terms.",
        "Changes in general prices affect the purchasing power of money.",
        "Money can store value because it is less perishable and easier to keep than many goods.",
        "A stable value of money is important for its store of value function.",
        "The chapter also mentions the rise of cashless transactions through digital payment systems.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 3,
      sectionName: "Demand for money and supply of money",
      explanation: [
        "The chapter explains both why people want to hold money and how money supply is created in the economy.",
        "Money supply in a modern economy depends on currency and bank deposits.",
        "The money-creating system includes the central bank and the commercial banking system.",
      ],
      keywords: [
        "Demand for money",
        "Supply of money",
        "Central bank",
        "Commercial banks",
      ],
      subsections: [
        {
          subsection_name: "Demand for money",
          subsection_content: [
            "Demand for money explains why people want to hold a certain amount of money.",
            "People hold money mainly to carry out transactions.",
            "Higher income raises the volume of transactions and increases demand for money.",
            "Demand for money also depends on the rate of interest.",
            "When interest rates rise, people prefer interest-earning deposits and hold less money.",
          ],
          order: 1,
        },
        {
          subsection_name: "Supply of money",
          subsection_content: [
            "In a modern economy, money includes cash and bank deposits.",
            "Different measures of money depend on which bank deposits are counted.",
            "Money supply is created through the central bank and the commercial banking system.",
            "Currency issued by the central bank becomes the base for credit creation.",
          ],
          order: 2,
        },
        {
          subsection_name: "Central bank",
          subsection_content: [
            "Central bank is an important institution in a modern economy and India's central bank is the Reserve Bank of India.",
            "It issues currency, controls money supply, acts as banker to the government and keeps foreign exchange reserves.",
            "It also acts as a bank to the banking system.",
            "Currency issued by the central bank is called high-powered money, reserve money or monetary base.",
          ],
          order: 3,
        },
        {
          subsection_name: "Commercial banks",
          subsection_content: [
            "Commercial banks are the other major institutions in the money-creating system.",
            "They accept deposits from the public and lend a part of these funds to borrowers.",
            "Their profit comes from the spread between the rate paid to depositors and the rate charged from borrowers.",
            "The chapter uses the story of Lala the goldsmith to explain how banking creates money.",
          ],
          order: 4,
        },
      ],
    },
    {
      order: 4,
      sectionName: "Money creation by banking system",
      explanation: [
        "Banks create money because all depositors do not withdraw their money at the same time.",
        "When banks give loans, new deposits are created and money supply rises.",
        "A bank balance sheet records assets like reserves and loans, and liabilities like deposits.",
        "Reserves are kept partly as cash and partly with the Reserve Bank of India.",
      ],
      keywords: [
        "Balance sheet of a fictional bank",
        "Limits to credit creation and money multiplier",
      ],
      subsections: [
        {
          subsection_name: "Balance sheet of a fictional bank",
          subsection_content: [
            "A bank's assets include reserves and loans, while its main liability is deposits.",
            "If deposits are Rs 100 and reserves are also Rs 100, money supply is Rs 100 when no currency circulates.",
            "Net worth is the difference between total assets and liabilities.",
          ],
          order: 1,
        },
        {
          subsection_name: "Limits to credit creation and money multiplier",
          subsection_content: [
            "Banks cannot create unlimited credit because the central bank fixes a required reserve ratio.",
            "Cash Reserve Ratio requires banks to keep a fixed percentage of deposits as reserves.",
            "Statutory Liquidity Ratio also requires banks to hold some liquid reserves.",
            "With a 20 per cent reserve ratio, Rs 100 of reserves can support Rs 500 of deposits.",
            "In that case the banking system can create Rs 400 of additional deposits and the money multiplier becomes 5.",
          ],
          order: 2,
        },
      ],
    },
    {
      order: 5,
      sectionName: "Policy tools to control money supply",
      explanation: [
        "1. RBI uses different policy tools to control money supply in the economy.",
        "2. These tools affect liquidity, lending power of banks and overall credit conditions.",
      ],
      keywords: [
        "Lender of last resort",
        "Reserve ratio",
        "Open market operations",
        "Repo rate",
        "Reverse repo rate",
        "Bank Rate",
      ],
      subsections: [
        {
          subsection_name: "Lender of last resort",
          subsection_content: [
              "1. RBI is the lender of last resort because it stands ready to lend to commercial banks.",
              "2. This role supports the banking system when banks face shortage of funds.",
          ],
          order: 1,
        },
        {
          subsection_name: "Reserve ratio",
          subsection_content: [
              "1. A change in reserve ratio affects bank lending, deposits and total money supply.",
              "2. When reserve requirement rises, banks can lend less and money supply contracts.",
              "3. When reserve requirement falls, banks can lend more and money supply expands.",
          ],
          order: 2,
        },
        {
          subsection_name: "Open market operations",
          subsection_content: [
              "1. Open market operations change money supply through buying and selling government bonds.",
              "2. Outright operations change liquidity permanently, while repo and reverse repo operate through repurchase agreements.",
          ],
          order: 3,
        },
        {
          subsection_name: "Repo rate",
          subsection_content: [
              "1. Repo rate is the rate at which RBI lends through repo transactions.",
              "2. Changes in repo rate influence liquidity and the cost of borrowing in the banking system.",
          ],
          order: 4,
        },
        {
          subsection_name: "Reverse repo rate",
          subsection_content: [
              "1. Reverse repo rate is the rate at which RBI absorbs money through reverse repo transactions.",
              "2. It helps RBI withdraw excess liquidity from the banking system.",
          ],
          order: 5,
        },
        {
          subsection_name: "Bank Rate",
          subsection_content: [
              "1. Bank Rate is the rate at which RBI lends to commercial banks and changes in it influence money supply.",
              "2. It affects credit conditions in the economy through its impact on bank borrowing.",
          ],
          order: 6,
        },
      ],
    },
    {
      order: 6,
      sectionName: "Demand and supply for money : A detailed discussion",
      explanation: [
        "Holding money gives liquidity but also involves loss of interest that could be earned elsewhere.",
        "This trade-off is called liquidity preference.",
        "The box explains the transaction motive and speculative motive for holding money.",
      ],
      keywords: ["The transaction motive", "The speculative motive"],
      subsections: [
        {
          subsection_name: "The transaction motive",
          subsection_content: [
            "People hold money because income receipts and spending usually happen at different times.",
            "Average cash balance depends on the value of transactions made over a period.",
            "Transaction demand for money rises with nominal income and price level.",
            "Velocity of circulation shows how many times one unit of money changes hands in a period.",
          ],
          order: 1,
        },
        {
          subsection_name: "The speculative motive",
          subsection_content: [
            "People also hold money because they expect changes in interest rates and bond prices.",
            "Bond prices and market rate of interest move in opposite directions.",
            "If people expect interest rates to rise, they fear capital loss on bonds and prefer money.",
            "Speculative demand for money therefore falls when interest rate is high and rises when interest rate is low.",
            "At very low interest rates, the economy may enter a liquidity trap where speculative demand becomes very high.",
          ],
          order: 2,
        },
      ],
    },
    {
      order: 7,
      sectionName: "The supply of money : Various measures",
      explanation: [
        "Modern money mainly includes currency notes, coins and certain bank deposits.",
        "In India, currency notes are issued by RBI while coins are issued by the Government of India.",
        "Demand deposits are treated as money because cheques drawn on them can settle transactions.",
        "Currency notes and coins are fiat money because their value comes from legal authority, not intrinsic worth.",
        "Currency notes and coins are legal tender, while demand deposits are not legal tender.",
      ],
      keywords: ["Legal definitions: Narrow and broad money"],
      subsections: [
        {
          subsection_name: "Legal definitions: Narrow and broad money",
          subsection_content: [
            "Money supply is the total stock of money in circulation among the public at a point of time.",
            "RBI publishes four measures of money supply: M1, M2, M3 and M4.",
            "M1 and M2 are called narrow money, while M3 and M4 are called broad money.",
            "These measures are arranged in decreasing order of liquidity.",
            "M3 is the most commonly used measure of money supply in India.",
          ],
          order: 1,
        },
      ],
    },
    {
      order: 8,
      sectionName: "Demonetisation",
      explanation: [
        "Demonetisation in November 2016 withdrew old Rs 500 and Rs 1000 notes as legal tender.",
        "The move aimed to tackle corruption, black money, terrorism and fake currency.",
        "New Rs 500 and Rs 2000 notes were introduced and old notes could be deposited within fixed dates.",
        "The policy caused queues and short-term cash shortage, which affected economic activity for some time.",
        "It also increased tax compliance and brought more savings into the formal financial system.",
        "The chapter notes that the move encouraged a shift from cash transactions to electronic payments.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 9,
      sectionName: "Summary",
      explanation: [
        "Barter exchange is exchange without the mediation of money.",
        "Barter suffers from lack of double coincidence of wants.",
        "Money makes exchange easier by acting as a commonly acceptable medium of exchange.",
        "In a modern economy, people hold money mainly for transaction motive and speculative motive.",
        "Supply of money includes currency notes, coins and deposits held with commercial banks.",
        "Money supply is classified into narrow money and broad money in decreasing order of liquidity.",
        "In India, RBI regulates money supply as the monetary authority of the country.",
        "RBI changes money supply through high-powered money, reserve requirements, bank rate and related policy tools.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 10,
      sectionName: "Key concepts",
      explanation: [
        "Barter exchange",
        "Double coincidence of wants",
        "Money",
        "Medium of exchange",
        "Unit of account",
        "Store of value",
        "Bonds",
        "Rate of interest",
        "Liquidity trap",
        "Fiat money",
        "Legal tender",
        "Narrow money",
        "Broad money",
        "Currency deposit ratio",
        "Reserve deposit ratio",
        "High powered money",
        "Money multiplier",
        "Lender of last resort",
        "Open market operation",
        "Bank Rate",
        "Cash Reserve Ratio (CRR)",
        "Repo Rate",
        "Reverse Repo Rate",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 11,
      sectionName: "Exercises",
      explanation: [
        "What is a barter system? What are its drawbacks?",
        "What are the main functions of money? How does money overcome the shortcomings of a barter system?",
        "What is transaction demand for money? How is it related to the value of transactions over a specified period of time?",
        "What are the alternative definitions of money supply in India?",
        "What is a legal tender? What is fiat money?",
        "What is High Powered Money?",
        "Explain the functions of a commercial bank.",
        "What is money multiplier? What determines the value of this multiplier?",
        "What are the instruments of monetary policy of RBI?",
        "Do you consider a commercial bank creator of money in the economy?",
        "What role of RBI is known as lender of last resort?",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 12,
      sectionName: "Appendix 3.1",
      explanation: [
        "Appendix 3.1 explains the sum of an infinite geometric series.",
        "It shows that when 0 is less than r and r is less than 1, the series can be summed as a divided by (1 - r).",
        "This idea is used in the chapter's money multiplier example.",
        "In the example, a equals 1 and r equals 0.4, giving the result 5.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 13,
      sectionName: "Appendix 3.2",
      explanation: [
        "Appendix 3.2 provides a table on Money Supply in India.",
        "It compares M1 as narrow money and M3 as broad money over time.",
        "Both M1 and M3 show a rising trend across the listed years.",
        "The difference between the two columns is mainly because of time deposits held by commercial banks.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 14,
      sectionName: "Appendix 3.3",
      explanation: [
        "Appendix 3.3 gives the components and sources of change in monetary base over time.",
        "It includes currency in circulation, cash with banks, currency with the public and banker’s deposits with RBI.",
        "The appendix shows how the composition of money stock changed over different years.",
        "The data source cited is the Handbook of Statistics on Indian Economy of the Reserve Bank of India.",
      ],
      keywords: [],
      subsections: [],
    },
  ],
};

const toKeywords = (explanation = []) =>
  explanation
    .map((item) => String(item).replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);

const prefixPoints = (items = []) =>
  items
    .map((item) => String(item).replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean)
    .map((item, index) => `${index + 1}. ${item}`);

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
      section_content: prefixPoints(row.explanation),
      keywords: Array.isArray(row.keywords) && row.keywords.length > 0
        ? row.keywords
        : toKeywords(row.explanation),
      subsections: Array.isArray(row.subsections)
        ? row.subsections.map((subsection) => ({
            ...subsection,
            subsection_content: prefixPoints(subsection?.subsection_content || []),
          }))
        : [],
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
  throw new Error("Target economy subject for Class 12 not found");
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

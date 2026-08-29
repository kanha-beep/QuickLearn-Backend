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
  order: 2,
  chapterName: "National income",
  rows: [
    {
      order: 1,
      sectionName: "Some basic concepts of macroeconomics",
      explanation: [
        "1. Economic wealth depends on how resources are used in production, not only on the amount of resources a country owns.",
        "2. Production in a modern economy happens through goods and services made by many enterprises.",
        "3. A final good is meant for final use and does not go through any further stage of production.",
        "4. Consumption goods satisfy direct needs, while capital goods help in producing other goods and services.",
        "5. Intermediate goods are used as inputs in further production and are not counted separately in final output.",
        "6. Final output is measured in money value because different goods cannot be added in physical units.",
        "7. Counting intermediate goods separately leads to double counting because their value is already included in final goods.",
        "8. Flows like income, output and profit are measured over a period of time, while stocks are measured at a point of time.",
        "9. Gross investment includes total capital goods produced, but net investment is gross investment minus depreciation.",
        "10. Depreciation is the yearly fall in value of capital goods due to wear and tear.",
        "11. Producing more capital goods may reduce present consumption, but it increases future productive capacity.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 2,
      sectionName: "Circular flow of income and methods of calculating national income",
      explanation: [
        "1. In a simple economy, firms pay households for factor services and households spend their income on goods and services produced by firms.",
        "2. Income moves between households and firms in a circular way through the product market and factor market.",
        "3. The same aggregate income can be measured as expenditure, output or factor income.",
        "4. Even when the economy becomes more complex, these three methods give the same annual value of national income.",
      ],
      keywords: [
        "The product or value added method",
        "Expenditure method",
        "Income method",
        "Factor cost, basic prices and market prices",
      ],
      subsections: [
        {
          subsection_name: "The product or value added method",
          subsection_content: [
            "1. This method measures national income by adding the value added by each producing unit in the economy.",
            "2. Value added means value of output minus value of intermediate goods used in production.",
            "3. It avoids double counting because only the extra value created at each stage is counted.",
            "4. Changes in inventories are included when output is produced but not fully sold during the year.",
          ],
          order: 1,
        },
        {
          subsection_name: "Expenditure method",
          subsection_content: [
            "1. This method measures national income by adding final expenditure on goods and services.",
            "2. It includes household consumption, investment expenditure, government spending and net exports.",
            "3. Only final expenditure is counted, so spending on intermediate goods is excluded.",
            "4. In a simple economy, aggregate expenditure received by firms equals aggregate national income.",
          ],
          order: 2,
        },
        {
          subsection_name: "Income method",
          subsection_content: [
            "1. This method adds all factor incomes earned in the production process.",
            "2. The main factor incomes are wages, rent, interest and profit.",
            "3. The sum of all factor payments equals the value of final goods and services produced.",
            "4. This method shows national income from the distribution side of production.",
          ],
          order: 3,
        },
        {
          subsection_name: "Factor cost, basic prices and market prices",
          subsection_content: [
            "1. National income measures can be expressed at factor cost, basic prices or market prices.",
            "2. Factor cost shows payments made to the factors of production.",
            "3. Market prices include the effect of indirect taxes and subsidies on prices.",
            "4. Basic prices help distinguish producer receipts from taxes and subsidies linked with production.",
          ],
          order: 4,
        },
      ],
    },
    {
      order: 3,
      sectionName: "Some macroeconomic identities",
      explanation: [
        "1. This section explains the main macroeconomic identities used to move from one income measure to another.",
        "2. It shows how output, national product, depreciation, taxes and personal income measures are linked.",
      ],
      keywords: [
        "Gross Domestic Product",
        "Gross National Product",
        "Net National Product",
        "National Income",
        "Personal Income",
        "Personal Disposable Income",
        "National Disposable Income and Private Income",
      ],
      subsections: [
        {
          subsection_name: "Gross Domestic Product",
          subsection_content: [
            "1. GDP measures the value of final goods and services produced within the domestic territory during a year.",
            "2. It focuses on production taking place inside the country, no matter who owns the factors of production.",
          ],
          order: 1,
        },
        {
          subsection_name: "Gross National Product",
          subsection_content: [
            "1. GNP is GDP plus net factor income from abroad.",
            "2. Net factor income from abroad means factor income earned by domestic factors abroad minus factor income earned by foreign factors in the domestic economy.",
            "3. GNP includes production-related income belonging to the country's residents.",
          ],
          order: 2,
        },
        {
          subsection_name: "Net National Product",
          subsection_content: [
            "1. NNP is GNP minus depreciation.",
            "2. Depreciation is deducted because part of capital gets used up through wear and tear during production.",
          ],
          order: 3,
        },
        {
          subsection_name: "National Income",
          subsection_content: [
            "1. National Income is NNP at market prices minus net indirect taxes.",
            "2. Net indirect taxes are indirect taxes minus subsidies.",
            "3. This gives NNP at factor cost, which shows income actually accruing to factors of production.",
          ],
          order: 4,
        },
        {
          subsection_name: "Personal Income",
          subsection_content: [
            "1. Personal Income is obtained after adjusting National Income for items that do not directly reach households.",
            "2. Undistributed profits, corporate tax and net interest payments by households are deducted.",
            "3. Transfer payments received by households from government and firms are added.",
          ],
          order: 5,
        },
        {
          subsection_name: "Personal Disposable Income",
          subsection_content: [
            "1. Personal Disposable Income is Personal Income minus personal tax payments and non-tax payments.",
            "2. It is the income households can finally use for consumption or saving.",
          ],
          order: 6,
        },
        {
          subsection_name: "National Disposable Income and Private Income",
          subsection_content: [
            "1. National Disposable Income shows the maximum amount of goods and services available to the domestic economy.",
            "2. Private Income includes income accruing to the private sector along with transfers and relevant income flows.",
            "3. These measures are also used in national income accounting in India.",
          ],
          order: 7,
        },
      ],
    },
    {
      order: 4,
      sectionName: "Nominal and real gdp",
      explanation: [
        "1. Nominal GDP measures output at current prices, so it can rise because of higher prices even when production does not rise.",
        "2. Real GDP measures output at constant prices, so it reflects changes in the actual volume of production.",
        "3. The base year is the year whose prices are used for calculating real GDP.",
        "4. GDP deflator is the ratio of nominal GDP to real GDP and shows the change in price level from the base year.",
        "5. Consumer Price Index measures the cost of a fixed basket of goods bought by a representative consumer.",
        "6. Wholesale Price Index measures price changes at the wholesale level rather than the retail level.",
        "7. CPI and GDP deflator may differ because they cover different goods, imported items and different weights.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 5,
      sectionName: "Gdp and welfare",
      explanation: [
        "1. A higher GDP does not always mean higher welfare for all people in a country.",
        "2. If the increase in GDP is concentrated in a few hands, most people may not become better off.",
        "3. Many non-monetary activities like household work and barter exchanges are not fully counted in GDP.",
        "4. Externalities affect welfare but may not be reflected in GDP.",
        "5. Negative externalities like pollution can make GDP overstate welfare.",
        "6. Positive externalities can make GDP understate welfare.",
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
      keywords: Array.isArray(row.keywords) && row.keywords.length > 0 ? row.keywords : toKeywords(row.explanation),
      subsections: Array.isArray(row.subsections) ? row.subsections : [],
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
  throw new Error("Target economy subject for Class 12 Commerce not found");
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

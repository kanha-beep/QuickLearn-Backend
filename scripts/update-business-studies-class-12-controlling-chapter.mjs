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
  order: 8,
  chapterName: "Controlling",
  rows: [
    {
      order: 1,
      sectionName: "Meaning of Controlling",
      explanation: [
        "1. Controlling means ensuring that organisational activities are performed according to plans.",
        "2. It checks whether resources are being used effectively and efficiently to achieve predetermined goals.",
        "3. It is a goal-oriented and pervasive function performed at all levels of management.",
        "4. It brings the management cycle back to planning by finding deviations and improving future plans.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 2,
      sectionName: "Importance of Controlling",
      explanation: [],
      keywords: [
        "Accomplishing organisational goals",
        "Judging accuracy of standards",
        "Making efficient use of resources",
        "Improving employee motivation",
        "Ensuring order and discipline",
        "Facilitating coordination in action",
      ],
      subsections: [
        {
          subsection_name: "Accomplishing organisational goals",
          subsection_content: [
            "1. Controlling measures progress towards organisational goals.",
            "2. It reveals deviations and points to corrective action.",
            "3. It keeps the organisation on the right track.",
          ],
          order: 1,
        },
        {
          subsection_name: "Judging accuracy of standards",
          subsection_content: [
            "1. A good control system checks whether standards are accurate and objective.",
            "2. It tracks internal and external changes affecting performance.",
            "3. It helps management review and revise standards when needed.",
          ],
          order: 2,
        },
        {
          subsection_name: "Making efficient use of resources",
          subsection_content: [
            "1. Control reduces wastage and spoilage of resources.",
            "2. Activities are performed according to predetermined standards and norms.",
            "3. This improves effectiveness and efficiency.",
          ],
          order: 3,
        },
        {
          subsection_name: "Improving employee motivation",
          subsection_content: [
            "1. Employees know in advance what they are expected to do.",
            "2. They also know the standards on which their performance will be judged.",
            "3. This motivates them to perform better.",
          ],
          order: 4,
        },
        {
          subsection_name: "Ensuring order and discipline",
          subsection_content: [
            "1. Controlling creates an atmosphere of order and discipline in the organisation.",
            "2. It keeps a close check on activities and reduces dishonest behaviour.",
            "3. It supports proper conduct at work.",
          ],
          order: 5,
        },
        {
          subsection_name: "Facilitating coordination in action",
          subsection_content: [
            "1. Controlling gives direction to activities and efforts across the organisation.",
            "2. Departments and employees work according to coordinated standards.",
            "3. This helps achieve overall organisational objectives.",
          ],
          order: 6,
        },
      ],
    },
    {
      order: 3,
      sectionName: "Limitations of Controlling",
      explanation: [],
      keywords: [
        "Difficulty in setting quantitative standards",
        "Little control on external factors",
        "Resistance from employees",
        "Costly affair",
      ],
      subsections: [
        {
          subsection_name: "Difficulty in setting quantitative standards",
          subsection_content: [
            "1. Control becomes weaker when standards cannot be expressed in numbers.",
            "2. Areas like morale, job satisfaction, and human behaviour are hard to measure.",
            "3. This makes comparison with actual performance difficult.",
          ],
          order: 1,
        },
        {
          subsection_name: "Little control on external factors",
          subsection_content: [
            "1. An enterprise cannot fully control factors outside the organisation.",
            "2. Government policy, technology, and competition may affect results.",
          ],
          order: 2,
        },
        {
          subsection_name: "Resistance from employees",
          subsection_content: [
            "1. Employees may see control as a restriction on their freedom.",
            "2. They may resist close monitoring such as strict surveillance.",
          ],
          order: 3,
        },
        {
          subsection_name: "Costly affair",
          subsection_content: [
            "1. A control system needs expenditure, time, and effort.",
            "2. Small enterprises may not be able to afford expensive controls.",
            "3. Costs should not exceed the benefits derived.",
          ],
          order: 4,
        },
      ],
    },
    {
      order: 4,
      sectionName: "Relationship between Planning and Controlling",
      explanation: [
        "1. Planning and controlling are inseparable twins of management.",
        "2. Planning provides standards, and controlling checks whether actual performance matches them.",
        "3. Planning without controlling is meaningless, and controlling without planning is blind.",
        "4. Planning is forward-looking and controlling checks past performance, but both help improve future results.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 5,
      sectionName: "Controlling Process",
      explanation: [],
      keywords: [
        "Step 1: Setting Performance Standards",
        "Step 2: Measurement of Actual Performance",
        "Step 3: Comparing Actual Performance with Standards",
        "Step 4: Analysing Deviations",
        "Step 5: Taking Corrective Action",
      ],
      subsections: [
        {
          subsection_name: "Step 1: Setting Performance Standards",
          subsection_content: [
            "1. Standards are the criteria against which actual performance is measured.",
            "2. They can be quantitative or qualitative, but should be clear, realistic, and flexible.",
            "3. Precise standards make comparison easier and improve control.",
          ],
          order: 1,
        },
        {
          subsection_name: "Step 2: Measurement of Actual Performance",
          subsection_content: [
            "1. Actual performance is measured after standards are set.",
            "2. Measurement should be objective, reliable, and in the same units as the standards.",
            "3. Techniques like observation, reports, ratios, and sample checking may be used.",
          ],
          order: 2,
        },
        {
          subsection_name: "Step 3: Comparing Actual Performance with Standards",
          subsection_content: [
            "1. Actual performance is compared with the standard performance.",
            "2. This comparison shows the deviation between desired and actual results.",
            "3. Comparison is easier when standards are stated in quantitative terms.",
          ],
          order: 3,
        },
        {
          subsection_name: "Step 4: Analysing Deviations",
          subsection_content: [
            "1. Deviations should be studied to find out which ones are important and need attention.",
            "2. Managers use critical point control and management by exception to focus on significant deviations.",
            "3. The causes of deviations must be identified before taking action.",
          ],
          order: 4,
        },
        {
          subsection_name: "Step 5: Taking Corrective Action",
          subsection_content: [
            "1. Corrective action is taken when deviations go beyond acceptable limits.",
            "2. It may include training, extra resources, overtime, or revision of standards.",
            "3. The aim is to prevent repeated deviations and achieve standards.",
          ],
          order: 5,
        },
      ],
    },
    {
      order: 6,
      sectionName: "Key Terms",
      explanation: [
        "1. Controlling",
        "2. Critical point control",
        "3. Management by exception",
        "4. Breakeven analysis",
        "5. Budgetary control",
        "6. Return on investment",
        "7. Ratio analysis",
        "8. Responsibility accounting",
        "9. Management audit",
        "10. PERT and CPM",
        "11. Management Information System",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 7,
      sectionName: "Summary",
      explanation: [
        "1. Controlling ensures that actual activities conform to planned activities.",
        "2. It helps in achieving goals, judging standards, using resources efficiently, improving morale, ensuring discipline, and coordinating action.",
        "3. Controlling has limits such as difficulty in setting quantitative standards, weak control over external factors, employee resistance, and cost.",
        "4. The process of control includes setting standards, measuring performance, comparing results, analysing deviations, and taking corrective action.",
        "5. Planning and controlling are inseparable because plans provide the basis of control and control improves future plans.",
        "6. Traditional techniques of control include personal observation, statistical reports, breakeven analysis, and budgetary control.",
        "7. Modern techniques include return on investment, ratio analysis, responsibility accounting, management audit, PERT and CPM, and Management Information System.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 8,
      sectionName: "Exercises",
      explanation: [],
      keywords: [
        "Very Short Answer Type",
        "Short Answer Type",
        "Long Answer Type",
      ],
      subsections: [
        {
          subsection_name: "Very Short Answer Type",
          subsection_content: [
            "1. State the meaning of controlling.",
            "2. Name the principle used for dealing with deviations effectively and state one case where control loses effectiveness.",
            "3. State one situation in which an organisation's control system loses its effectiveness.",
            "4. Give any two standards for evaluating the performance of the Finance & Accounting department.",
            "5. Name the term used for the difference between standard performance and actual performance.",
          ],
          order: 1,
        },
        {
          subsection_name: "Short Answer Type",
          subsection_content: [
            "1. 'Planning is looking ahead and controlling is looking back.' Comment.",
            "2. 'An effort to control everything may end up in controlling nothing.' Explain.",
            "3. Explain how management audit serves as an effective technique of controlling.",
            "4. In the Writewell Products Ltd. case, explain the principle of management control MsVasundhara should use while taking her decision.",
          ],
          order: 2,
        },
        {
          subsection_name: "Long Answer Type",
          subsection_content: [
            "1. Explain the various steps involved in the process of control.",
            "2. Explain the techniques of managerial control.",
            "3. Explain the importance of controlling in an organisation and the problems in implementing an effective control system.",
            "4. Discuss the relationship between planning and controlling.",
            "5. In the 'M' limited case, explain the benefits of a good control system, the link between planning and control, and the steps in the control process.",
            "6. In Mr Shantanu's case, describe any two features of controlling and explain any four points of its importance.",
          ],
          order: 3,
        },
      ],
    },
  ],
};

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
      keywords: Array.isArray(row.keywords) ? row.keywords : [],
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

import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const subjectId = "6a635f0128870dc644b63e03";
const classId = "6a635ca828870dc644b63dc1";
const chapterOrder = 4;
const chapterName = "Planning";

const rows = [
  {
    order: 1,
    sectionName: "Concept",
    explanation: [
      "1. Planning means deciding in advance what to do and how to do it.",
      "2. It involves setting objectives, identifying courses of action, and choosing the best alternative.",
      "3. Planning connects present actions with future goals and gives direction to managerial decisions.",
    ],
  },
  {
    order: 2,
    sectionName: "Importance of Planning",
    explanation: [],
    keywords: [
      "Planning provides directions",
      "Planning reduces the risks of uncertainty",
      "Planning reduces overlapping and wasteful activities",
      "Planning promotes innovative ideas",
      "Planning facilitates decision making",
      "Planning establishes standards for controlling",
    ],
    subsections: [
      {
        subsection_name: "Planning provides directions",
        subsection_content: [
          "Planning tells people in advance what work has to be done and in which direction they should move. Clear goals help departments and employees work together instead of moving in different directions.",
        ],
        order: 1,
      },
      {
        subsection_name: "Planning reduces the risks of uncertainty",
        subsection_content: [
          "Planning helps managers look ahead and prepare for future changes or uncertain events. It cannot remove change, but it helps the organisation anticipate it and respond in a better way.",
        ],
        order: 2,
      },
      {
        subsection_name: "Planning reduces overlapping and wasteful activities",
        subsection_content: [
          "Planning coordinates the work of different departments and people, so confusion and duplication are reduced. It removes unnecessary work and makes it easier to identify inefficiency and fix it.",
        ],
        order: 3,
      },
      {
        subsection_name: "Planning promotes innovative ideas",
        subsection_content: [
          "Since planning is the first function of management, it creates space for new ideas to become real action plans. It guides future work and supports the growth and progress of the business.",
        ],
        order: 4,
      },
      {
        subsection_name: "Planning facilitates decision making",
        subsection_content: [
          "Planning makes managers think about the future and compare different alternatives before choosing one. This helps them take rational decisions after evaluating the available options.",
        ],
        order: 5,
      },
      {
        subsection_name: "Planning establishes standards for controlling",
        subsection_content: [
          "Planning sets goals and standards, and actual performance is later compared with them. If there is any deviation, managers can correct it, so planning becomes the base of control.",
        ],
        order: 6,
      },
    ],
  },
  {
    order: 3,
    sectionName: "Features of Planning",
    explanation: [],
    keywords: [
      "Planning focuses on achieving objectives",
      "Planning is a primary function of management",
      "Planning is pervasive",
      "Planning is continuous",
      "Planning is futuristic",
      "Planning involves decision making",
      "Planning is a mental exercise",
    ],
    subsections: [
      {
        subsection_name: "Planning focuses on achieving objectives",
        subsection_content: [
          "Planning is done to achieve specific organisational goals. It has value only when it helps the organisation reach its predetermined objectives.",
        ],
        order: 1,
      },
      {
        subsection_name: "Planning is a primary function of management",
        subsection_content: [
          "Planning comes before the other functions of management and gives them a base. Organising, staffing, directing and controlling all work within the framework set by planning.",
        ],
        order: 2,
      },
      {
        subsection_name: "Planning is pervasive",
        subsection_content: [
          "Planning is needed at every level of management and in every department. Its scope changes from one level or department to another, but it is required throughout the organisation.",
        ],
        order: 3,
      },
      {
        subsection_name: "Planning is continuous",
        subsection_content: [
          "Plans are made for a fixed period, and once that period ends, new plans are needed. So planning goes on repeatedly as one plan is followed by another.",
        ],
        order: 4,
      },
      {
        subsection_name: "Planning is futuristic",
        subsection_content: [
          "Planning looks ahead and prepares the organisation for future events and conditions. It depends on forecasting so that the firm can act in advance and gain advantage.",
        ],
        order: 5,
      },
      {
        subsection_name: "Planning involves decision making",
        subsection_content: [
          "Planning means choosing one course of action from many alternatives. Managers study and evaluate the options and then select the most suitable one.",
        ],
        order: 6,
      },
      {
        subsection_name: "Planning is a mental exercise",
        subsection_content: [
          "Planning is mainly an intellectual activity that uses foresight, imagination and judgement. It requires logical and systematic thinking, not guesswork or wishful thinking.",
        ],
        order: 7,
      },
    ],
  },
  {
    order: 4,
    sectionName: "Limitations of Planning",
    explanation: [],
    keywords: [
      "Planning leads to rigidity",
      "Planning may not work in a dynamic environment",
      "Planning reduces creativity",
      "Planning involves huge costs",
      "Planning is a time-consuming process",
      "Planning does not guarantee success",
    ],
    subsections: [
      {
        subsection_name: "Planning leads to rigidity",
        subsection_content: [
          "Once a plan is fixed with clear goals and time limits, managers may find it hard to change it. This rigidity can create problems when circumstances change and flexibility is needed.",
        ],
        order: 1,
      },
      {
        subsection_name: "Planning may not work in a dynamic environment",
        subsection_content: [
          "Business conditions keep changing because of economic, political, legal, social and natural factors. Since planning cannot predict everything accurately, it may become difficult to make fully effective plans.",
        ],
        order: 2,
      },
      {
        subsection_name: "Planning reduces creativity",
        subsection_content: [
          "Planning is usually done by top management, while others mainly carry it out. Because of this, initiative and new thinking among lower levels may decrease.",
        ],
        order: 3,
      },
      {
        subsection_name: "Planning involves huge costs",
        subsection_content: [
          "Making detailed plans takes a lot of time and money for data collection, calculations, meetings and expert advice. Sometimes these costs may be more than the benefits received.",
        ],
        order: 4,
      },
      {
        subsection_name: "Planning is a time-consuming process",
        subsection_content: [
          "Preparing plans may take so much time that very little time is left for actual implementation. This can delay action and reduce effectiveness.",
        ],
        order: 5,
      },
      {
        subsection_name: "Planning does not guarantee success",
        subsection_content: [
          "A plan gives direction, but success depends on proper implementation and many other factors. Even a previously successful plan may fail if managers rely on it blindly.",
        ],
        order: 6,
      },
    ],
  },
  {
    order: 5,
    sectionName: "Planning Process",
    explanation: [],
    keywords: [
      "Setting Objectives",
      "Developing Premises",
      "Identifying alternative courses of action",
      "Evaluating alternative courses",
      "Selecting an alternative",
      "Implementing the plan",
      "Follow-up action",
    ],
    subsections: [
      {
        subsection_name: "Setting Objectives",
        subsection_content: [
          "The first step is to decide clearly what the organisation and each department want to achieve. Clear objectives guide all levels and help everyone understand how their work supports the final goal.",
        ],
        order: 1,
      },
      {
        subsection_name: "Developing Premises",
        subsection_content: [
          "Managers make assumptions about future conditions before preparing plans. These premises may include forecasts, existing plans and past policies, and all planners should use the same assumptions.",
        ],
        order: 2,
      },
      {
        subsection_name: "Identifying alternative courses of action",
        subsection_content: [
          "After setting objectives and premises, managers identify different possible ways to achieve the goals. These alternatives may be routine or innovative and should be discussed properly.",
        ],
        order: 3,
      },
      {
        subsection_name: "Evaluating alternative courses",
        subsection_content: [
          "Each alternative is examined by comparing its positive and negative points. Managers judge them in terms of feasibility, consequences and their fit with the objective.",
        ],
        order: 4,
      },
      {
        subsection_name: "Selecting an alternative",
        subsection_content: [
          "At this stage, the best available plan is chosen for action. The choice depends on feasibility, profit, low negative effects, and sometimes also on judgement, experience or intuition.",
        ],
        order: 5,
      },
      {
        subsection_name: "Implementing the plan",
        subsection_content: [
          "The selected plan is put into action in this step. It may require support from other functions like organising resources, arranging labour and buying machinery.",
        ],
        order: 6,
      },
      {
        subsection_name: "Follow-up action",
        subsection_content: [
          "Managers check whether the plan is being carried out properly and on time. Regular monitoring helps ensure that objectives are actually being achieved.",
        ],
        order: 7,
      },
    ],
  },
  {
    order: 6,
    sectionName: "Types of Plans",
    explanation: [],
    keywords: [
      "Single-use Plan",
      "Standing Plan",
      "objectIves",
      "strategy",
      "polIcy",
      "procedure",
      "m ethod",
      "rule",
      "programme",
      "budget",
    ],
    subsections: [
      {
        subsection_name: "Single-use Plan",
        subsection_content: [
          "A single-use plan is made for a one-time event or project and is not meant to be repeated. It may cover a short period and includes things like budgets, programmes and projects with detailed responsibilities.",
        ],
        order: 1,
      },
      {
        subsection_name: "Standing Plan",
        subsection_content: [
          "A standing plan is used for repeated activities over time and helps routine decisions run smoothly. It is created once, updated when needed, and includes policies, procedures, methods and rules.",
        ],
        order: 2,
      },
      {
        subsection_name: "objectIves",
        subsection_content: [
          "Objectives are the desired future results that management wants to achieve. They act as the end point of planning, guide overall business planning, and should be stated clearly and measurably within a time period.",
        ],
        order: 3,
      },
      {
        subsection_name: "strategy",
        subsection_content: [
          "A strategy is a broad and comprehensive plan for achieving organisational objectives in the long run. It includes setting long-term goals, choosing a course of action and allocating resources while considering the business environment.",
        ],
        order: 4,
      },
      {
        subsection_name: "polIcy",
        subsection_content: [
          "Policies are general statements that guide thinking and decisions in a particular direction. They help managers interpret strategy and deal with situations consistently within broad limits.",
        ],
        order: 5,
      },
      {
        subsection_name: "procedure",
        subsection_content: [
          "Procedures are routine steps arranged in chronological order for doing work in a particular situation. They explain exactly how activities should be carried out to enforce policy and achieve objectives.",
        ],
        order: 6,
      },
      {
        subsection_name: "m ethod",
        subsection_content: [
          "Methods describe the specific way in which one task or one step of a procedure should be performed. A suitable method saves time, money and effort and improves efficiency.",
        ],
        order: 7,
      },
      {
        subsection_name: "rule",
        subsection_content: [
          "Rules are clear statements telling exactly what must or must not be done. They allow no flexibility or discretion unless the policy itself is changed.",
        ],
        order: 8,
      },
      {
        subsection_name: "programme",
        subsection_content: [
          "Programmes are detailed statements for a project that include objectives, policies, procedures, rules, tasks, resources and budget. They cover the full set of activities needed to carry out a course of action.",
        ],
        order: 9,
      },
      {
        subsection_name: "budget",
        subsection_content: [
          "A budget is a numerical statement of expected results and future estimates. It helps compare actual performance with expected figures and also acts as a useful control device.",
        ],
        order: 10,
      },
    ],
  },
  {
    order: 7,
    sectionName: "Key Terms",
    explanation: [
      "1. Planning",
      "2. Objectives",
      "3. Goals",
      "4. Decisions",
      "5. Standards",
      "6. Controlling",
      "7. Premises",
      "8. Assumptions",
      "9. Alternatives",
      "10. Strategy",
      "11. Policy",
      "12. Procedure",
      "13. Rule",
      "14. Programme",
      "15. Budget",
    ],
  },
  {
    order: 8,
    sectionName: "Summary",
    explanation: [],
  },
  {
    order: 9,
    sectionName: "Exercises",
    explanation: [],
  },
  {
    order: 10,
    sectionName: "Top 3 Sample Questions",
    explanation: [
      "1. What is planning? Explain its features.",
      "2. Explain the importance and limitations of planning.",
      "3. Describe the steps in the planning process and the different types of plans.",
    ],
  },
];

const toKeywords = (explanation = []) =>
  explanation
    .map((item) => String(item).replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);

const syncChapter = async () => {
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
      keywords: Array.isArray(row.keywords) ? row.keywords : toKeywords(row.explanation),
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
    order: chapterOrder,
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

const result = await syncChapter();

if (!subject.chapters.some((id) => String(id) === String(result.chapterId))) {
  subject.chapters.push(result.chapterId);
  await subject.save();
}

console.log(JSON.stringify({ subjectId, classId, syncedChapter: result }, null, 2));

await mongoose.disconnect();

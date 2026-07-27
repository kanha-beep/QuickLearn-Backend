import dotenv from "dotenv";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";

dotenv.config({ path: fileURLToPath(new URL("../.env", import.meta.url)) });

const subjectId = "6a635f0128870dc644b63e03";
const classId = "6a635ca828870dc644b63dc1";

const chaptersToSync = [
  {
    order: 5,
    chapterName: "Organising",
    rows: [
      {
        order: 1,
        sectionName: "Meaning",
        explanation: [
          "1. Organising is the process of identifying and grouping work to be performed.",
          "2. It defines and delegates responsibility and authority.",
          "3. It establishes relationships so people can work effectively together.",
          "4. It helps in implementing plans and achieving objectives.",
        ],
      },
      {
        order: 2,
        sectionName: "Steps in the Process of Organising",
        explanation: [
          "1. Identification and division of work",
          "2. Departmentalisation",
          "3. Assignment of duties",
          "4. Establishing reporting relationships",
        ],
      },
      {
        order: 3,
        sectionName: "Importance of Organising",
        explanation: [
          "1. Benefits of specialisation",
          "2. Clarity in working relationships",
          "3. Optimum utilisation of resources",
          "4. Adaptation to change",
          "5. Effective administration",
          "6. Development of personnel",
          "7. Expansion and growth",
        ],
      },
      {
        order: 4,
        sectionName: "Organisation Structure",
        explanation: [
          "1. Organisation structure is the framework within which managerial and operating tasks are performed.",
          "2. It specifies relationships among people, work, and resources.",
          "3. It helps in coordination, communication, and control.",
        ],
      },
      {
        order: 5,
        sectionName: "Types of Organisation Structure",
        explanation: [
          "1. Functional structure",
          "2. Divisional structure",
        ],
      },
      {
        order: 6,
        sectionName: "Functional Structure",
        explanation: [
          "1. Advantages of functional structure",
          "2. Disadvantages of functional structure",
          "3. Suitability of functional structure",
        ],
      },
      {
        order: 7,
        sectionName: "Divisional Structure",
        explanation: [
          "1. Advantages of divisional structure",
          "2. Disadvantages of divisional structure",
          "3. Suitability of divisional structure",
        ],
      },
      {
        order: 8,
        sectionName: "Formal and Informal Organisation",
        explanation: [
          "1. Formal organisation",
          "2. Features of formal organisation",
          "3. Advantages of formal organisation",
          "4. Disadvantages of formal organisation",
          "5. Informal organisation",
          "6. Advantages of informal organisation",
          "7. Disadvantages of informal organisation",
          "8. Formal and informal organisation: a comparative view",
        ],
      },
      {
        order: 9,
        sectionName: "Delegation",
        explanation: [
          "1. Elements of delegation",
          "2. Authority",
          "3. Responsibility",
          "4. Accountability",
          "5. Importance of delegation",
          "6. Effective management",
          "7. Employee development",
          "8. Motivation of employees",
          "9. Facilitation of growth",
          "10. Basis of management hierarchy",
          "11. Better coordination",
        ],
      },
      {
        order: 10,
        sectionName: "Decentralisation",
        explanation: [
          "1. Centralisation and decentralisation",
          "2. Importance of decentralisation",
          "3. Develops initiative among subordinates",
          "4. Develops managerial talent for the future",
          "5. Quick decision making",
          "6. Relief to top management",
          "7. Facilitates growth",
          "8. Better control",
          "9. Delegation and decentralisation: a comparative view",
        ],
      },
      {
        order: 11,
        sectionName: "Key Terms",
        explanation: [
          "1. Organising",
          "2. Organisational structure",
          "3. Departmentalisation",
          "4. Delegation",
          "5. Authority",
          "6. Responsibility",
          "7. Accountability",
          "8. Functional structure",
          "9. Divisional structure",
          "10. Formal organisation",
          "11. Informal organisation",
          "12. Span of management",
          "13. Centralisation",
          "14. Decentralisation",
        ],
      },
      {
        order: 12,
        sectionName: "Summary",
        explanation: [],
      },
      {
        order: 13,
        sectionName: "Exercises",
        explanation: [],
      },
      {
        order: 14,
        sectionName: "Top 3 Sample Questions",
        explanation: [
          "1. What is organising? Explain its importance.",
          "2. Explain the steps in the process of organising.",
          "3. Differentiate between delegation and decentralisation.",
        ],
      },
    ],
  },
  {
    order: 6,
    chapterName: "Staffing",
    rows: [
      {
        order: 1,
        sectionName: "Introduction",
        explanation: [
          "1. Foundation of every organisation is talented and hardworking people.",
          "2. Growth of an organisation requires continual infusion of quality staff.",
          "3. An organisation achieves its objectives only when it has the right persons in the right positions.",
        ],
      },
      {
        order: 2,
        sectionName: "Meaning",
        explanation: [
          "1. Staffing means putting people to jobs.",
          "2. It includes recruitment, selection, training, development, promotion, compensation, and performance appraisal.",
          "3. It is concerned with obtaining, utilising, and maintaining a satisfactory and satisfied workforce.",
          "4. It is the managerial function of filling and keeping filled the positions in the organisation structure.",
        ],
      },
      {
        order: 3,
        sectionName: "Importance of Staffing",
        explanation: [
          "1. Helps in discovering and obtaining competent personnel.",
          "2. Makes for higher performance by putting the right person on the right job.",
          "3. Ensures continuous survival and growth of the enterprise through succession planning.",
          "4. Helps in optimum utilisation of human resources.",
          "5. Improves job satisfaction and morale of employees.",
        ],
      },
      {
        order: 4,
        sectionName: "Staffing as Part of Human Resource Management",
        explanation: [
          "1. Staffing is a generic function of management closely linked to organising.",
          "2. All managers need to place the right person on the right job and develop employee abilities.",
          "3. In large organisations a separate human resource department is formed.",
          "4. Human Resource Management includes recruitment, job analysis, compensation, training, labour relations, grievance handling, employee welfare, and legal compliance.",
        ],
      },
      {
        order: 5,
        sectionName: "Evolution of Human Resource Management",
        explanation: [
          "1. Human Resource Management replaced the traditional concept of labour welfare and personnel management.",
          "2. It evolved through industrial growth, labour welfare measures, trade unionism, and increasing complexity of workforce management.",
          "3. It reflects a broader focus on development and effective use of human resources.",
        ],
      },
      {
        order: 6,
        sectionName: "Staffing Process",
        explanation: [
          "1. Estimating manpower requirements",
          "2. Recruitment",
          "3. Selection",
          "4. Placement and orientation",
          "5. Training and development",
          "6. Performance appraisal",
          "7. Promotion and career planning",
          "8. Compensation",
        ],
      },
      {
        order: 7,
        sectionName: "Aspects of Staffing",
        explanation: [
          "1. Recruitment",
          "2. Selection",
          "3. Placement and orientation",
          "4. Training and development",
          "5. Performance appraisal",
          "6. Promotion and career planning",
          "7. Compensation",
        ],
      },
      {
        order: 8,
        sectionName: "Sources of Recruitment",
        explanation: [
          "1. Internal sources",
          "2. Merits of internal sources",
          "3. Limitations of internal sources",
          "4. External sources",
          "5. Merits of external sources",
          "6. Limitations of external sources",
        ],
      },
      {
        order: 9,
        sectionName: "Selection",
        explanation: [
          "1. Selection is the process of identifying and choosing the best person out of a number of prospective candidates for a job.",
          "2. It involves a series of tests and interviews to choose the most suitable applicant.",
        ],
      },
      {
        order: 10,
        sectionName: "Process of Selection",
        explanation: [
          "1. Preliminary screening",
          "2. Selection tests",
          "3. Employment interview",
          "4. Reference and background checks",
          "5. Selection decision",
          "6. Medical examination",
          "7. Job offer",
          "8. Contract of employment",
        ],
      },
      {
        order: 11,
        sectionName: "Training and Development",
        explanation: [
          "1. Training and development improve current and future employee performance through learning.",
          "2. They increase an employee's ability to perform by changing attitudes or increasing skills and knowledge.",
        ],
      },
      {
        order: 12,
        sectionName: "Importance of Training and Development",
        explanation: [
          "1. Benefits to the organisation",
          "2. Benefits to the employee",
          "3. Training, development and education",
        ],
      },
      {
        order: 13,
        sectionName: "Training Methods",
        explanation: [
          "1. On the job methods",
          "2. Off the job methods",
        ],
      },
      {
        order: 14,
        sectionName: "On the Job Methods",
        explanation: [
          "1. Apprenticeship programmes",
          "2. Coaching",
          "3. Internship training",
          "4. Job rotation",
        ],
      },
      {
        order: 15,
        sectionName: "Off the Job Methods",
        explanation: [
          "1. Class room lectures or conferences",
          "2. Films",
          "3. Case study",
          "4. Computer modelling",
          "5. Vestibule training",
          "6. Programmed instruction",
        ],
      },
      {
        order: 16,
        sectionName: "Key Terms",
        explanation: [
          "1. Staffing",
          "2. Personnel management",
          "3. Human resource management",
          "4. Recruitment",
          "5. Selection",
          "6. Training",
          "7. Development",
          "8. Performance appraisal",
          "9. Assessment tests",
        ],
      },
      {
        order: 17,
        sectionName: "Summary",
        explanation: [],
      },
      {
        order: 18,
        sectionName: "Exercises",
        explanation: [],
      },
      {
        order: 19,
        sectionName: "Top 3 Sample Questions",
        explanation: [
          "1. What is staffing? Explain its importance.",
          "2. Explain the staffing process.",
          "3. Differentiate between recruitment and selection.",
        ],
      },
    ],
  },
  {
    order: 7,
    chapterName: "Directing",
    rows: [
      {
        order: 1,
        sectionName: "Content Structure",
        explanation: [
          "1. Meaning of directing",
          "2. Characteristics of directing",
          "3. Importance of directing",
          "4. Principles of directing",
          "5. Maximum individual contribution",
          "6. Harmony of objectives",
          "7. Unity of command",
          "8. Appropriateness of direction technique",
          "9. Managerial communication",
          "10. Use of informal organisation",
          "11. Leadership",
          "12. Follow through",
          "13. Elements of directing",
          "14. Supervision",
          "15. Motivation",
          "16. Leadership as element",
          "17. Communication",
        ],
      },
      {
        order: 2,
        sectionName: "Chapter Focus",
        explanation: [
          "This chapter explains how managers make plans work through people. It focuses on guiding, motivating, supervising, leading, and communicating so employees perform effectively.",
        ],
      },
      {
        order: 3,
        sectionName: "Core Idea",
        explanation: [
          "Directing is the managerial function that turns plans into action. It works through four main elements: supervision, motivation, leadership, and communication.",
        ],
      },
      {
        order: 4,
        sectionName: "Top 3 Sample Questions",
        explanation: [
          "1. What is directing? Explain its importance in management.",
          "Sample points: Directing means instructing, guiding, counselling, motivating, and leading employees. It initiates action, integrates employee efforts, helps employees realise their potential, facilitates change, and brings stability.",
          "2. Explain Maslow's Need Hierarchy Theory of motivation.",
          "Sample points: Human needs are arranged in a hierarchy: physiological, safety, social, esteem, and self-actualisation. Lower needs are generally satisfied first, and managers can motivate employees by identifying the level of need affecting them.",
          "3. What are the barriers to effective communication? Suggest measures to overcome them.",
          "Sample points: Barriers include semantic, psychological, organisational, and personal barriers. Measures include clarifying ideas, communicating as per receiver's level, consulting before communicating, ensuring feedback, following up, and being a good listener.",
        ],
      },
    ],
  },
  {
    order: 8,
    chapterName: "Controlling",
    rows: [
      {
        order: 1,
        sectionName: "Content Structure",
        explanation: [
          "1. Meaning of controlling",
          "2. Importance of controlling",
          "3. Limitations of controlling",
          "4. Relationship between planning and controlling",
          "5. Controlling process",
          "6. Setting performance standards",
          "7. Measurement of actual performance",
          "8. Comparing actual performance with standards",
          "9. Analysing deviations",
          "10. Taking corrective action",
          "11. Principles used in control",
          "12. Critical point control",
          "13. Management by exception",
          "14. Techniques of controlling",
          "15. Traditional techniques",
          "16. Modern techniques",
        ],
      },
      {
        order: 2,
        sectionName: "Chapter Focus",
        explanation: [
          "This chapter explains how managers ensure that actual work is done according to plans. It shows how performance is measured, compared, and corrected so organisational goals are achieved.",
        ],
      },
      {
        order: 3,
        sectionName: "Core Idea",
        explanation: [
          "Controlling is the managerial function of ensuring that actual performance matches planned performance and taking corrective action whenever needed.",
        ],
      },
      {
        order: 4,
        sectionName: "Top 3 Sample Questions",
        explanation: [
          "1. What is controlling? Explain its importance.",
          "Sample points: Controlling means ensuring that activities are performed according to plans. It helps in achieving organisational goals, checking the accuracy of standards, ensuring efficient use of resources, improving motivation, discipline, and coordination.",
          "2. Explain the relationship between planning and controlling.",
          "Sample points: Planning sets standards and goals. Controlling checks whether actual performance matches those standards. Planning without controlling is meaningless, and controlling without planning is blind.",
          "3. Explain the steps in the controlling process.",
          "Sample points: Set performance standards, measure actual performance, compare actual performance with standards, analyse deviations, and take corrective action.",
        ],
      },
    ],
  },
];

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

const results = [];

for (const chapterConfig of chaptersToSync) {
  const result = await syncChapter(chapterConfig);
  results.push(result);

  if (!subject.chapters.some((id) => String(id) === String(result.chapterId))) {
    subject.chapters.push(result.chapterId);
  }
}

await subject.save();

console.log(
  JSON.stringify(
    {
      subjectId,
      classId,
      syncedChapters: results,
    },
    null,
    2
  )
);

await mongoose.disconnect();

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
          "1. Functional structure groups jobs of similar nature under major functions and treats those functions as separate departments.",
        ],
        keywords: ["Advantages", "Disadvantages"],
        subsections: [
          {
            subsection_name: "Advantages",
            subsection_content: [
              "Functional structure creates occupational specialisation because people keep doing similar work in the same department. It improves control, coordination, efficiency, training, and gives proper attention to each function while reducing duplication of effort and cost.",
            ],
            order: 1,
          },
          {
            subsection_name: "Disadvantages",
            subsection_content: [
              "Functional structure can make departments focus too much on their own goals instead of the organisation's overall goals. It may create coordination problems, conflicts between departments, inflexibility, and limited managerial development because employees often develop a narrow functional outlook.",
            ],
            order: 2,
          },
        ],
      },
      {
        order: 7,
        sectionName: "Divisional Structure",
        explanation: [
          "1. Divisional structure groups activities on the basis of products and creates self-contained divisions for each major product line.",
        ],
        keywords: ["Advantages", "Disadvantages"],
        subsections: [
          {
            subsection_name: "Advantages",
            subsection_content: [
              "Divisional structure helps each product division focus on its own results and customer needs. It improves coordination within the division, increases accountability, allows flexibility, encourages initiative, and makes diversification and growth easier.",
            ],
            order: 1,
          },
          {
            subsection_name: "Disadvantages",
            subsection_content: [
              "Divisional structure can be costly because similar activities may be repeated in different divisions. It may create conflicts among divisions, reduce overall organisational focus, and increase the need for capable general managers at the divisional level.",
            ],
            order: 2,
          },
        ],
      },
      {
        order: 8,
        sectionName: "Formal organisation",
        explanation: [
          "1. Formal organisation is the structure deliberately designed by management to achieve organisational goals through clearly defined jobs, authority, and reporting relationships.",
        ],
        keywords: ["Advantages", "Disadvantages"],
        subsections: [
          {
            subsection_name: "Advantages",
            subsection_content: [
              "Formal organisation clearly fixes responsibility, removes role confusion, supports unity of command, and helps work move in an orderly way. Because duties and authority are defined in advance, organisational goals can be achieved more systematically.",
            ],
            order: 1,
          },
          {
            subsection_name: "Disadvantages",
            subsection_content: [
              "Formal organisation can create delays because everything follows prescribed procedures and official channels. It may not recognise creativity adequately and its rigid boundaries can limit initiative and flexibility.",
            ],
            order: 2,
          },
        ],
      },
      {
        order: 9,
        sectionName: "Informal organisation",
        explanation: [
          "1. Informal organisation arises from personal interaction among people at work and develops naturally within the formal structure.",
        ],
        keywords: ["Advantages", "Disadvantages"],
        subsections: [
          {
            subsection_name: "Advantages",
            subsection_content: [
              "Informal organisation helps information move quickly, supports social needs, and fills gaps left by the formal structure. It can improve cooperation and make the workplace more supportive and responsive.",
            ],
            order: 1,
          },
          {
            subsection_name: "Disadvantages",
            subsection_content: [
              "Informal organisation can become a disruptive force if group pressure goes against organisational goals. It may resist change, spread rumours, and sometimes give more importance to group interest than organisational interest.",
            ],
            order: 2,
          },
        ],
      },
      {
        order: 10,
        sectionName: "Delegation",
        explanation: [
          "1. Delegation refers to the downward transfer of authority from a superior to a subordinate.",
          "2. It helps a manager extend work through others while still remaining accountable for the final result.",
        ],
        keywords: ["Authority", "Responsibility", "Accountability"],
        subsections: [
          {
            subsection_name: "Authority",
            subsection_content: [
              "Authority means the right of a manager to command subordinates and take decisions within the scope of the position. It flows from top to bottom, helps maintain order, and is limited by laws, rules, and organisational regulations.",
            ],
            order: 1,
          },
          {
            subsection_name: "Responsibility",
            subsection_content: [
              "Responsibility means the obligation of a subordinate to properly perform the duty assigned by the superior. It arises from the superior-subordinate relationship and flows upward because the subordinate remains responsible to the superior.",
            ],
            order: 2,
          },
          {
            subsection_name: "Accountability",
            subsection_content: [
              "Accountability means being answerable for the final outcome of the assigned task. It cannot be delegated, flows upward, and the superior remains accountable even after authority has been granted to a subordinate.",
            ],
            order: 3,
          },
        ],
      },
      {
        order: 11,
        sectionName: "Importance of delegation",
        explanation: [
          "1. Delegation reduces the manager's workload and helps the organisation work more effectively through shared authority and responsibility.",
        ],
        keywords: [
          "Effective management",
          "Employee development",
          "Motivation of employees",
          "Facilitation of growth",
          "Basis of management hierarchy",
          "Better coordination",
        ],
        subsections: [
          {
            subsection_name: "Effective management",
            subsection_content: [
              "Delegation reduces the manager's routine workload and gives more time for important matters. This helps managers work more efficiently and concentrate on higher-level responsibilities.",
            ],
            order: 1,
          },
          {
            subsection_name: "Employee development",
            subsection_content: [
              "Delegation gives employees opportunities to use their abilities, gain experience, and handle more complex work. It helps prepare them for higher roles and future leadership.",
            ],
            order: 2,
          },
          {
            subsection_name: "Motivation of employees",
            subsection_content: [
              "Delegation builds trust, confidence, and self-esteem in employees. When responsibility is given to them, they feel encouraged and usually try to improve their performance further.",
            ],
            order: 3,
          },
          {
            subsection_name: "Facilitation of growth",
            subsection_content: [
              "Delegation creates a trained workforce that can take up leading positions in new ventures and branches. This supports expansion and helps the organisation grow more smoothly.",
            ],
            order: 4,
          },
          {
            subsection_name: "Basis of management hierarchy",
            subsection_content: [
              "Delegation creates superior-subordinate relationships and makes reporting lines clear. It helps decide who reports to whom and how authority is distributed in the organisation.",
            ],
            order: 5,
          },
          {
            subsection_name: "Better coordination",
            subsection_content: [
              "Delegation clearly defines powers, duties, and answerability at different levels. This reduces overlap and duplication of effort and improves coordination across departments and functions.",
            ],
            order: 6,
          },
        ],
      },
      {
        order: 12,
        sectionName: "decentraliSation",
        explanation: [
          "1. Decentralisation refers to delegation of authority throughout all the levels of the organisation.",
          "2. Decision making authority is shared with lower levels and placed nearer to the points of action.",
        ],
        keywords: ["Centralisation and Decentralisation"],
        subsections: [
          {
            subsection_name: "Centralisation and Decentralisation",
            subsection_content: [
              "Centralisation means decision-making authority is retained by higher management, while decentralisation means authority is shared with lower levels. In practice, every organisation keeps a balance between both rather than being completely centralised or completely decentralised.",
            ],
            order: 1,
          },
        ],
      },
      {
        order: 13,
        sectionName: "Importance of decentralisation",
        explanation: [
          "1. Decentralisation is a philosophy of selectively dispersing authority to lower levels while keeping major policy decisions at higher levels.",
        ],
        keywords: [
          "Develops initiative among subordinates",
          "Develops managerial talent for the future",
          "Quick decision making",
          "Relief to top management",
          "Facilitates growth",
          "Better control",
        ],
        subsections: [
          {
            subsection_name: "Develops initiative among subordinates",
            subsection_content: [
              "Decentralisation gives lower-level managers freedom to make decisions on their own. This builds self-reliance, confidence, and problem-solving ability.",
            ],
            order: 1,
          },
          {
            subsection_name: "Develops managerial talent for the future",
            subsection_content: [
              "Decentralisation gives subordinates practical experience in handling assignments independently. This helps prepare capable people for higher positions in the future.",
            ],
            order: 2,
          },
          {
            subsection_name: "Quick decision making",
            subsection_content: [
              "When decisions are taken closer to the point of action, less time is wasted in moving through many levels. This makes the organisation faster and more responsive.",
            ],
            order: 3,
          },
          {
            subsection_name: "Relief to top management",
            subsection_content: [
              "Decentralisation reduces the burden of direct supervision on top management. Senior managers get more time to focus on major policy decisions instead of routine operational matters.",
            ],
            order: 4,
          },
          {
            subsection_name: "Facilitates growth",
            subsection_content: [
              "Greater autonomy at lower levels improves initiative and department performance. This raises productivity and helps the organisation expand more effectively.",
            ],
            order: 5,
          },
          {
            subsection_name: "Better control",
            subsection_content: [
              "Decentralisation makes it easier to evaluate each department's performance separately. Feedback from different levels helps improve control and overall operations.",
            ],
            order: 6,
          },
        ],
      },
      {
        order: 14,
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
        order: 15,
        sectionName: "Summary",
        explanation: [],
      },
      {
        order: 16,
        sectionName: "Exercises",
        explanation: [],
      },
      {
        order: 17,
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
        sectionName: "IntroductIon",
        explanation: [
          "1. Talented and hardworking people are the principal assets of any organisation.",
          "2. Growth of an organisation needs a continual supply of quality staff.",
          "3. An organisation can achieve its objectives only when it has the right persons in the right positions.",
        ],
      },
      {
        order: 2,
        sectionName: "MeanIng",
        explanation: [
          "1. Staffing is 'putting people to jobs'.",
          "2. It includes workforce planning, recruitment, selection, training, development, promotion, compensation and performance appraisal.",
          "3. It is concerned with obtaining, utilising and maintaining a satisfactory and satisfied work force.",
          "4. It is the managerial function of filling and keeping filled the positions in the organisation structure.",
        ],
      },
      {
        order: 3,
        sectionName: "IMportance  of StaffIng",
        explanation: [
          "1. Staffing is a fundamental and critical drive of organisational performance.",
          "2. The quality of human resources decides how far an organisation can achieve its goals.",
        ],
        keywords: [
          "helps in discovering and obtaining competent personnel for various jobs",
          "makes for higher performance, by putting right person on the right job",
          "ensures the continuous survival and growth of the enterprise through the succession planning for managers",
          "helps to ensure optimum utilisation of the human resources",
          "improves job satisfaction and morale of employees through objective assessment and fair reward for their contribution",
        ],
        subsections: [
          {
            subsection_name: "helps in discovering and obtaining competent personnel for various jobs",
            subsection_content: [
              "1. Staffing helps the organisation find suitable people for different jobs.",
              "2. It improves the chances of appointing capable and qualified employees.",
            ],
            order: 1,
          },
          {
            subsection_name: "makes for higher performance, by putting right person on the right job",
            subsection_content: [
              "1. Proper staffing matches people with jobs that fit their ability and skill.",
              "2. This improves efficiency, output and overall performance.",
            ],
            order: 2,
          },
          {
            subsection_name: "ensures the continuous survival and growth of the enterprise through the succession planning for managers",
            subsection_content: [
              "1. Staffing prepares people to take up future managerial roles.",
              "2. This supports continuity, stability and growth of the enterprise.",
            ],
            order: 3,
          },
          {
            subsection_name: "helps to ensure optimum utilisation of the human resources",
            subsection_content: [
              "1. Staffing helps avoid both overmanning and understaffing.",
              "2. It reduces waste, lowers labour cost and prevents disruption of work.",
            ],
            order: 4,
          },
          {
            subsection_name: "improves job satisfaction and morale of employees through objective assessment and fair reward for their contribution",
            subsection_content: [
              "1. Fair assessment and proper rewards increase employee satisfaction.",
              "2. Better morale encourages stronger commitment and performance.",
            ],
            order: 5,
          },
        ],
      },
      {
        order: 4,
        sectionName: "Staffing as part of Human Resource Management",
        explanation: [
          "1. Staffing is a generic function of management and is closely linked to organising.",
          "2. All managers have to deal with selecting, placing, training and developing people.",
          "3. In large organisations a separate human resource department is formed for specialised work.",
        ],
        keywords: [
          "Recruitment",
          "Analysing jobs",
          "Developing compensation and incentive plans",
          "Training and development of employees for efficient performance and career growth",
          "Maintaining labour relations and union management relations",
          "Handling grievances and complaints",
          "Providing for social security and welfare of employees",
          "Defending the company in law suits and avoiding legal complications",
        ],
        subsections: [
          {
            subsection_name: "Recruitment",
            subsection_content: [
              "1. HRM searches for qualified people to fill organisational positions.",
              "2. It helps build the manpower base needed by the enterprise.",
            ],
            order: 1,
          },
          {
            subsection_name: "Analysing jobs",
            subsection_content: [
              "1. HRM studies jobs and collects information to prepare job descriptions.",
              "2. This helps match the right person with the right work.",
            ],
            order: 2,
          },
          {
            subsection_name: "Developing compensation and incentive plans",
            subsection_content: [
              "1. HRM designs pay and reward systems for employees.",
              "2. These plans support motivation, fairness and retention.",
            ],
            order: 3,
          },
          {
            subsection_name: "Training and development of employees for efficient performance and career growth",
            subsection_content: [
              "1. HRM improves employee skill, knowledge and career readiness.",
              "2. This helps employees perform better now and in future roles.",
            ],
            order: 4,
          },
          {
            subsection_name: "Maintaining labour relations and union management relations",
            subsection_content: [
              "1. HRM manages relations between the organisation, workers and unions.",
              "2. Good relations support stability and smoother working.",
            ],
            order: 5,
          },
          {
            subsection_name: "Handling grievances and complaints",
            subsection_content: [
              "1. HRM listens to employee complaints and tries to resolve them fairly.",
              "2. This reduces conflict and improves morale.",
            ],
            order: 6,
          },
          {
            subsection_name: "Providing for social security and welfare of employees",
            subsection_content: [
              "1. HRM arranges welfare and security measures for employees.",
              "2. These measures improve well-being and support a safer workplace.",
            ],
            order: 7,
          },
          {
            subsection_name: "Defending the company in law suits and avoiding legal complications",
            subsection_content: [
              "1. HRM helps the organisation follow labour rules and legal requirements.",
              "2. This reduces legal risk and protects the company.",
            ],
            order: 8,
          },
        ],
      },
      {
        order: 5,
        sectionName: "evolutIon  of HuMan reSource  ManageMent",
        explanation: [
          "1. Human resource management replaced the older ideas of labour welfare and personnel management.",
          "2. It evolved through industrial revolution, trade union movement, factory system and the human relations approach.",
          "3. People came to be seen as a valuable resource that can be developed further.",
        ],
      },
      {
        order: 6,
        sectionName: "StaffIng proceSS",
        explanation: [
          "1. Staffing starts with understanding manpower requirements and ends with development and compensation of employees.",
          "2. It aims at timely fulfillment of manpower needs in the organisation.",
        ],
        keywords: [
          "Estimating the Manpower Requirements",
          "Recruitment",
          "Selection",
          "Placement and Orientation",
          "Training and Development",
          "Performance Appraisal",
          "Promotion and career planning",
          "Compensation",
        ],
        subsections: [
          {
            subsection_name: "Estimating the Manpower Requirements",
            subsection_content: [
              "1. The organisation decides how many people are needed and what type of people are required.",
              "2. Workload analysis and workforce analysis help identify shortage, surplus or proper staffing.",
            ],
            order: 1,
          },
          {
            subsection_name: "Recruitment",
            subsection_content: [
              "1. Recruitment searches for prospective employees and encourages them to apply.",
              "2. It begins after job requirements and candidate profiles are identified.",
            ],
            order: 2,
          },
          {
            subsection_name: "Selection",
            subsection_content: [
              "1. Selection chooses the best person from among the applicants.",
              "2. It uses tests, interviews and checks to find the most suitable candidate.",
            ],
            order: 3,
          },
          {
            subsection_name: "Placement and Orientation",
            subsection_content: [
              "1. Placement puts the selected person on the assigned job.",
              "2. Orientation helps the employee understand the organisation and build a good first impression.",
            ],
            order: 4,
          },
          {
            subsection_name: "Training and Development",
            subsection_content: [
              "1. Employees are trained to improve skill, knowledge and performance.",
              "2. Development prepares them for future responsibilities and growth.",
            ],
            order: 5,
          },
          {
            subsection_name: "Performance Appraisal",
            subsection_content: [
              "1. Employee performance is reviewed against expected standards.",
              "2. This helps in feedback, improvement and future decisions.",
            ],
            order: 6,
          },
          {
            subsection_name: "Promotion and career planning",
            subsection_content: [
              "1. Promotion moves employees to higher positions with more responsibility.",
              "2. Career planning helps employees prepare for long-term growth in the organisation.",
            ],
            order: 7,
          },
          {
            subsection_name: "Compensation",
            subsection_content: [
              "1. Compensation includes wages, salary and other benefits given to employees.",
              "2. A proper pay system supports fairness, motivation and retention.",
            ],
            order: 8,
          },
        ],
      },
      {
        order: 7,
        sectionName: "aSpectS of StaffIng",
        explanation: [
          "1. There are three aspects of staffing: recruitment, selection and training.",
          "2. These aspects help the organisation attract, choose and develop people.",
        ],
      },
      {
        order: 8,
        sectionName: "recruItMent",
        explanation: [
          "1. Recruitment is the process of finding possible candidates for a job or a function.",
          "2. It searches for prospective employees and stimulates them to apply for jobs in the organisation.",
        ],
      },
      {
        order: 9,
        sectionName: "Sources of Recruitment",
        explanation: [
          "1. The requisite positions may be filled up from within the organisation or from outside.",
          "2. Thus, there are two sources of recruitment - Internal and External.",
        ],
        keywords: ["Internal Sources", "External Sources"],
        subsections: [
          {
            subsection_name: "Internal Sources",
            subsection_content: [
              "1. Internal recruitment fills vacancies from within the organisation.",
              "2. The main internal sources mentioned are transfers and promotions.",
            ],
            order: 1,
          },
          {
            subsection_name: "External Sources",
            subsection_content: [
              "1. External recruitment fills vacancies by bringing candidates from outside the organisation.",
              "2. It provides wider choice and introduces fresh talent.",
            ],
            order: 2,
          },
        ],
      },
      {
        order: 10,
        sectionName: "Internal Sources",
        explanation: [
          "1. There are two important sources of internal recruitment, namely, transfers and promotions.",
        ],
        keywords: [
          "Transfers",
          "Promotions",
          "Merits of Internal Sources",
          "Limitations of Internal  Sources",
        ],
        subsections: [
          {
            subsection_name: "Transfers",
            subsection_content: [
              "1. Transfer shifts an employee from one job, department or shift to another without a major change in status.",
              "2. It helps fill vacancies, solve staffing imbalance and train employees in different jobs.",
            ],
            order: 1,
          },
          {
            subsection_name: "Promotions",
            subsection_content: [
              "1. Promotion moves an employee to a higher position with more responsibility, status and pay.",
              "2. It improves motivation, loyalty and satisfaction among employees.",
            ],
            order: 2,
          },
          {
            subsection_name: "Merits of Internal Sources",
            subsection_content: [
              "1. Internal recruitment motivates employees and makes selection easier and cheaper.",
              "2. It supports training through transfer and helps shift staff from surplus areas to shortage areas.",
            ],
            order: 3,
          },
          {
            subsection_name: "Limitations of Internal  Sources",
            subsection_content: [
              "1. Internal recruitment reduces the entry of fresh talent and may weaken competition.",
              "2. Frequent transfers and overdependence on internal promotions can reduce productivity and flexibility.",
            ],
            order: 4,
          },
        ],
      },
      {
        order: 11,
        sectionName: "External Sources",
        explanation: [
          "1. External recruitment is used when vacancies cannot be filled through internal sources.",
          "2. It gives wider choice and brings new blood into the organisation.",
        ],
        keywords: [
          "Direct Recruitment",
          "Casual Callers",
          "Advertisement",
          "Employment Exchange",
          "Placement Agencies and Management Consultants",
          "Campus Recruitment",
          "Recommendations of Employees",
          "Labour Contractors",
          "Advertising on Television",
          "Web Publishing",
          "Merits of External Sources",
          "Limitations of External Sources",
        ],
        subsections: [
          {
            subsection_name: "Direct Recruitment",
            subsection_content: [
              "1. A notice is placed at the workplace and applicants gather on the specified date.",
              "2. It is commonly used for casual vacancies of unskilled or semi-skilled jobs.",
            ],
            order: 1,
          },
          {
            subsection_name: "Casual Callers",
            subsection_content: [
              "1. Organisations keep records of unsolicited applicants for future use.",
              "2. This source reduces recruitment cost and provides quick access to candidates.",
            ],
            order: 2,
          },
          {
            subsection_name: "Advertisement",
            subsection_content: [
              "1. Jobs are advertised in newspapers, trade journals or professional journals for wider reach.",
              "2. It gives wide choice but may also attract many unsuitable applications.",
            ],
            order: 3,
          },
          {
            subsection_name: "Employment Exchange",
            subsection_content: [
              "1. Government employment exchanges help match employers with job-seekers.",
              "2. They are useful for skilled and unskilled operative jobs, though records may not always be up to date.",
            ],
            order: 4,
          },
          {
            subsection_name: "Placement Agencies and Management Consultants",
            subsection_content: [
              "1. Private agencies and consultants help recruit technical, professional and managerial personnel.",
              "2. They keep candidate data and are useful where wider search and screening are needed.",
            ],
            order: 5,
          },
          {
            subsection_name: "Campus Recruitment",
            subsection_content: [
              "1. Colleges and institutes are used to recruit technical, professional and managerial talent.",
              "2. Organisations maintain links with educational institutions to hire qualified people.",
            ],
            order: 6,
          },
          {
            subsection_name: "Recommendations of Employees",
            subsection_content: [
              "1. Present employees recommend friends or relatives for jobs.",
              "2. This source is useful because employees know both the company and the candidate.",
            ],
            order: 7,
          },
          {
            subsection_name: "Labour Contractors",
            subsection_content: [
              "1. Labour contractors provide unskilled workers at short notice.",
              "2. This is useful for quick hiring, but dependence on the contractor can create risk.",
            ],
            order: 8,
          },
          {
            subsection_name: "Advertising on Television",
            subsection_content: [
              "1. Vacant posts are publicised through television along with job and organisation details.",
              "2. This helps reach a wider audience quickly.",
            ],
            order: 9,
          },
          {
            subsection_name: "Web Publishing",
            subsection_content: [
              "1. Internet websites are used to share information about jobs and job-seekers.",
              "2. This has become a common and convenient source of recruitment.",
            ],
            order: 10,
          },
          {
            subsection_name: "Merits of External Sources",
            subsection_content: [
              "1. External sources bring qualified personnel, wider choice, fresh talent and competitive spirit.",
              "2. They help the organisation access people who may not be available internally.",
            ],
            order: 11,
          },
          {
            subsection_name: "Limitations of External Sources",
            subsection_content: [
              "1. External recruitment may create dissatisfaction among existing staff and takes more time.",
              "2. It is also a costly process because of advertising and application processing expenses.",
            ],
            order: 12,
          },
        ],
      },
      {
        order: 12,
        sectionName: "SelectIon",
        explanation: [
          "1. Selection is the process of identifying and choosing the best person out of a number of prospective candidates for a job.",
          "2. It uses tests, interviews and checks to judge the performance potential of candidates.",
        ],
      },
      {
        order: 13,
        sectionName: "Process of Selection",
        explanation: [
          "1. The process of selection removes unsuitable candidates step by step and chooses the best one.",
          "2. It continues through screening, testing, interview, checks and final appointment steps.",
        ],
        keywords: [
          "Preliminary Screening",
          "Selection Tests",
          "Employment Interview",
          "Reference and Background Checks",
          "Selection Decision",
          "Medical Examination",
          "Job Offer",
          "Contract of Employment",
        ],
        subsections: [
          {
            subsection_name: "Preliminary Screening",
            subsection_content: [
              "1. Preliminary screening removes clearly unfit or unqualified applicants.",
              "2. It uses the application form and initial interaction to reject obvious misfits.",
            ],
            order: 1,
          },
          {
            subsection_name: "Selection Tests",
            subsection_content: [
              "1. Selection tests measure characteristics like aptitude, intelligence, personality, trade skill and interest.",
              "2. They help assess whether the candidate is suitable for the job.",
            ],
            order: 2,
          },
          {
            subsection_name: "Employment Interview",
            subsection_content: [
              "1. The interview is a formal in-depth conversation to evaluate suitability for the job.",
              "2. It helps both the employer and the applicant exchange useful information.",
            ],
            order: 3,
          },
          {
            subsection_name: "Reference and Background Checks",
            subsection_content: [
              "1. References are used to verify the candidate's information and background.",
              "2. Previous employers, teachers and known persons may provide added information.",
            ],
            order: 4,
          },
          {
            subsection_name: "Selection Decision",
            subsection_content: [
              "1. The final choice is made from among candidates who clear the earlier stages.",
              "2. The concerned manager's view is usually important in this decision.",
            ],
            order: 5,
          },
          {
            subsection_name: "Medical Examination",
            subsection_content: [
              "1. The selected candidate undergoes a medical fitness test before job offer.",
              "2. The offer is made only after the candidate is declared fit.",
            ],
            order: 6,
          },
          {
            subsection_name: "Job Offer",
            subsection_content: [
              "1. The job offer is given to candidates who pass all earlier stages.",
              "2. The appointment letter usually mentions the joining date and related details.",
            ],
            order: 7,
          },
          {
            subsection_name: "Contract of Employment",
            subsection_content: [
              "1. After accepting the offer, the employer and candidate complete formal documents and service terms.",
              "2. The contract records duties, pay, hours, leave, rules and other employment conditions.",
            ],
            order: 8,
          },
        ],
      },
      {
        order: 14,
        sectionName: "traInIng  and developMent",
        explanation: [
          "1. Training and Development improves current or future employee performance through learning.",
          "2. It raises ability by changing attitude or increasing skills and knowledge.",
        ],
      },
      {
        order: 15,
        sectionName: "Importance of Training and Development",
        explanation: [
          "1. As jobs become more complex, the importance of training increases.",
          "2. Training and development help both the organisation and the individual.",
        ],
        keywords: [
          "Benefits to the organisation",
          "Benefits to the Employee",
          "Training, Development and  Education",
        ],
        subsections: [
          {
            subsection_name: "Benefits to the organisation",
            subsection_content: [
              "1. Training improves productivity, reduces waste and prepares future managers.",
              "2. It raises morale, lowers absenteeism and helps the organisation respond to change.",
            ],
            order: 1,
          },
          {
            subsection_name: "Benefits to the Employee",
            subsection_content: [
              "1. Training improves skills, knowledge, career prospects and earning ability.",
              "2. It also makes employees safer, more confident and more satisfied with their work.",
            ],
            order: 2,
          },
          {
            subsection_name: "Training, Development and  Education",
            subsection_content: [
              "1. Training improves skill for present jobs, development supports overall growth, and education broadens understanding.",
              "2. These three are related but different in scope and purpose.",
            ],
            order: 3,
          },
        ],
      },
      {
        order: 16,
        sectionName: "traInIng  MetHodS",
        explanation: [
          "1. Training methods are broadly grouped into On-the-Job and Off-the-Job methods.",
          "2. One means learning while doing, and the other means learning before doing.",
        ],
      },
      {
        order: 17,
        sectionName: "on tHe Job MetHodS",
        explanation: [
          "1. On-the-Job methods are used at the workplace while the employee is actually working.",
        ],
        keywords: [
          "Apprenticeship Programmes",
          "Coaching",
          "Internship Training",
          "Job Rotation",
        ],
        subsections: [
          {
            subsection_name: "Apprenticeship Programmes",
            subsection_content: [
              "1. Trainees work under the guidance of a master worker to learn a skilled job.",
              "2. It is commonly used for trades that require a high level of practical skill.",
            ],
            order: 1,
          },
          {
            subsection_name: "Coaching",
            subsection_content: [
              "1. The superior guides, instructs and reviews the trainee's progress directly.",
              "2. It prepares the trainee through practical experience and continuous feedback.",
            ],
            order: 2,
          },
          {
            subsection_name: "Internship Training",
            subsection_content: [
              "1. Educational institutions and business firms jointly train selected candidates.",
              "2. It combines regular study with practical workplace experience.",
            ],
            order: 3,
          },
          {
            subsection_name: "Job Rotation",
            subsection_content: [
              "1. The trainee is moved from one job or department to another.",
              "2. This builds wider understanding of the organisation and improves cooperation.",
            ],
            order: 4,
          },
        ],
      },
      {
        order: 18,
        sectionName: "off tHe Job MetHodS",
        explanation: [
          "1. Off-the-Job methods are used away from the workplace before actual performance on the job.",
        ],
        keywords: [
          "Class Room Lectures/Conferences",
          "Films",
          "Case Study",
          "Computer Modelling",
          "Vestibule Training",
          "Programmed Instruction",
        ],
        subsections: [
          {
            subsection_name: "Class Room Lectures/Conferences",
            subsection_content: [
              "1. Formal classroom sessions are used to explain rules, procedures and methods.",
              "2. Audio-visual aids and demonstrations can make learning clearer and more interesting.",
            ],
            order: 1,
          },
          {
            subsection_name: "Films",
            subsection_content: [
              "1. Films provide information and demonstrate skills visually.",
              "2. They are especially useful when used with discussion.",
            ],
            order: 2,
          },
          {
            subsection_name: "Case Study",
            subsection_content: [
              "1. Trainees study real organisational problems and think through solutions.",
              "2. This improves analysis, judgment and decision-making ability.",
            ],
            order: 3,
          },
          {
            subsection_name: "Computer Modelling",
            subsection_content: [
              "1. Computer modelling simulates job situations in a safe learning environment.",
              "2. It allows practice without the high cost or risk of real mistakes.",
            ],
            order: 4,
          },
          {
            subsection_name: "Vestibule Training",
            subsection_content: [
              "1. Training is given on the same equipment employees will use, but away from the actual work floor.",
              "2. It is useful when employees must learn to handle sophisticated machinery or equipment.",
            ],
            order: 5,
          },
          {
            subsection_name: "Programmed Instruction",
            subsection_content: [
              "1. Information is broken into small logical units and learnt step by step.",
              "2. The trainee progresses by answering questions or filling blanks in sequence.",
            ],
            order: 6,
          },
        ],
      },
      {
        order: 19,
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
        order: 20,
        sectionName: "Summary",
        explanation: [],
      },
      {
        order: 21,
        sectionName: "Exercises",
        explanation: [],
      },
      {
        order: 22,
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
        sectionName: "Introduction",
        explanation: [
          "1. Directing involves leading, motivating, and communicating with subordinates.",
          "2. Business organisations need managers who can inspire others and guide action.",
          "3. The various ways managers lead, motivate, and communicate are collectively called directing.",
        ],
      },
      {
        order: 2,
        sectionName: "Meaning",
        explanation: [
          "1. Directing means instructing, guiding, counselling, motivating, and leading people in the organisation.",
          "2. It is not merely communication but includes supervision, motivation, and leadership.",
          "3. It is a key managerial function performed by every manager throughout the life of the organisation.",
        ],
        keywords: [
          "Directing initiates action",
          "Directing takes place at every level of management",
          "Directing is a continuous process",
          "Directing flows from top to bottom",
        ],
        subsections: [
          {
            subsection_name: "Directing initiates action",
            subsection_content: [
              "Directing starts actual work in the organisation after planning, organising, and staffing have prepared the setting.",
              "It turns plans into action by guiding people on what to do and how to do it.",
            ],
            order: 1,
          },
          {
            subsection_name: "Directing takes place at every level of management",
            subsection_content: [
              "Every manager performs directing wherever superior-subordinate relationships exist.",
              "From top managers to supervisors, each level guides the people working under it.",
            ],
            order: 2,
          },
          {
            subsection_name: "Directing is a continuous process",
            subsection_content: [
              "Directing goes on throughout the life of the organisation and does not stop after one instruction.",
              "Managers may change, but the need to guide and coordinate people continues.",
            ],
            order: 3,
          },
          {
            subsection_name: "Directing flows from top to bottom",
            subsection_content: [
              "Direction begins at higher levels and moves downward through the organisational hierarchy.",
              "Each manager directs immediate subordinates and also receives direction from a higher authority.",
            ],
            order: 4,
          },
        ],
      },
      {
        order: 3,
        sectionName: "Importance of Directing",
        explanation: [],
        keywords: [
          "Directing helps to initiate action",
          "Directing integrates employees efforts",
          "Directing guides employees to realise their potential and capabilities",
          "Directing facilitates introduction of needed changes in the organisation",
          "Effective directing helps to bring stability and balance in the organisation",
        ],
        subsections: [
          {
            subsection_name: "Directing helps to initiate action",
            subsection_content: [
              "Directing moves people to start work toward organisational goals.",
              "Clear guidance and removal of doubts help employees perform their tasks better.",
            ],
            order: 1,
          },
          {
            subsection_name: "Directing integrates employees efforts",
            subsection_content: [
              "Directing aligns individual efforts with organisational objectives.",
              "It helps people work as a team instead of acting in isolated ways.",
            ],
            order: 2,
          },
          {
            subsection_name: "Directing guides employees to realise their potential and capabilities",
            subsection_content: [
              "Good directing motivates employees and helps them use their abilities fully.",
              "Leadership helps managers identify potential and encourage higher performance.",
            ],
            order: 3,
          },
          {
            subsection_name: "Directing facilitates introduction of needed changes in the organisation",
            subsection_content: [
              "People often resist change, so managers use communication, motivation, and leadership to reduce resistance.",
              "Proper direction creates cooperation when new systems or methods are introduced.",
            ],
            order: 4,
          },
          {
            subsection_name: "Effective directing helps to bring stability and balance in the organisation",
            subsection_content: [
              "Directing builds cooperation and commitment among people and departments.",
              "It helps maintain balance across activities and supports smooth functioning.",
            ],
            order: 5,
          },
        ],
      },
      {
        order: 4,
        sectionName: "Principles of Directing",
        explanation: [],
        keywords: [
          "Maximum individual contribution",
          "Harmony of objectives",
          "Unity of command",
          "Appropriateness of direction technique",
          "Managerial communication",
          "Use of informal organisation",
          "Leadership",
          "Follow through",
        ],
        subsections: [
          {
            subsection_name: "Maximum individual contribution",
            subsection_content: [
              "Directing should help each employee contribute to the best of his or her ability.",
              "Good motivation and suitable rewards can bring out unused energy and effort.",
            ],
            order: 1,
          },
          {
            subsection_name: "Harmony of objectives",
            subsection_content: [
              "Managers should align personal goals of employees with organisational goals.",
              "Direction is effective when employees understand that better work and better rewards support each other.",
            ],
            order: 2,
          },
          {
            subsection_name: "Unity of command",
            subsection_content: [
              "A person should receive instructions from one superior only.",
              "This avoids confusion, conflict, and disorder in the organisation.",
            ],
            order: 3,
          },
          {
            subsection_name: "Appropriateness of direction technique",
            subsection_content: [
              "Managers should choose motivational and leadership techniques according to employee needs and situations.",
              "A method that works for one person may not work equally well for another.",
            ],
            order: 4,
          },
          {
            subsection_name: "Managerial communication",
            subsection_content: [
              "Clear communication across all levels makes direction effective.",
              "Feedback helps managers confirm that instructions are properly understood.",
            ],
            order: 5,
          },
          {
            subsection_name: "Use of informal organisation",
            subsection_content: [
              "Managers should recognise informal groups inside the formal structure.",
              "Using these groups wisely can improve acceptance and speed of direction.",
            ],
            order: 6,
          },
          {
            subsection_name: "Leadership",
            subsection_content: [
              "Directing becomes stronger when managers influence people positively through good leadership.",
              "Leadership helps gain cooperation without creating dissatisfaction.",
            ],
            order: 7,
          },
          {
            subsection_name: "Follow through",
            subsection_content: [
              "Giving orders alone is not enough; managers must review whether they are carried out properly.",
              "If problems appear, directions should be modified in time.",
            ],
            order: 8,
          },
        ],
      },
      {
        order: 5,
        sectionName: "Elements of Direction",
        explanation: [
          "1. Supervision",
          "2. Motivation",
          "3. Leadership",
          "4. Communication",
        ],
      },
      {
        order: 6,
        sectionName: "Supervision",
        explanation: [
          "1. Supervision is both an element of directing and a function performed by supervisors.",
          "2. It means overseeing the work of subordinates, guiding them, and helping achieve targets.",
          "3. At the operative level, the supervisor has direct contact with workers and plays a vital role in performance.",
        ],
      },
      {
        order: 7,
        sectionName: "Importance of Supervision",
        explanation: [],
        keywords: [
          "Supervisor maintains day-to-day contact and maintains friendly relations with workers",
          "Supervisor acts as a link between workers and management",
          "Supervisor plays a key role in maintaining group unity among workers placed under his control",
          "Supervisor ensures performance of work according to the targets set",
          "Supervisor provides good on-the-job training to the workers and employees",
          "Supervisory leadership plays a key role in influencing the workers in the organisation",
          "A good supervisor analyses the work performed and gives feedback to the workers",
        ],
        subsections: [
          {
            subsection_name: "Supervisor maintains day-to-day contact and maintains friendly relations with workers",
            subsection_content: [
              "A supervisor stays closely connected with workers and understands their daily issues.",
              "This helps build trust and healthy working relationships.",
            ],
            order: 1,
          },
          {
            subsection_name: "Supervisor acts as a link between workers and management",
            subsection_content: [
              "The supervisor carries management instructions to workers and workers' problems back to management.",
              "This reduces misunderstanding and conflict between both sides.",
            ],
            order: 2,
          },
          {
            subsection_name: "Supervisor plays a key role in maintaining group unity among workers placed under his control",
            subsection_content: [
              "The supervisor settles internal differences and promotes harmony in the group.",
              "Unity in the work group supports smoother performance.",
            ],
            order: 3,
          },
          {
            subsection_name: "Supervisor ensures performance of work according to the targets set",
            subsection_content: [
              "The supervisor takes responsibility for achieving work targets.",
              "He or she motivates workers and ensures tasks are completed as required.",
            ],
            order: 4,
          },
          {
            subsection_name: "Supervisor provides good on-the-job training to the workers and employees",
            subsection_content: [
              "A skilled supervisor teaches workers practical methods while they work.",
              "This improves efficiency and helps build a capable team.",
            ],
            order: 5,
          },
          {
            subsection_name: "Supervisory leadership plays a key role in influencing the workers in the organisation",
            subsection_content: [
              "Good leadership by the supervisor raises morale and willingness to work.",
              "Workers respond better when they feel supported and guided well.",
            ],
            order: 6,
          },
          {
            subsection_name: "A good supervisor analyses the work performed and gives feedback to the workers",
            subsection_content: [
              "Feedback helps workers understand their strengths and improve weak areas.",
              "It also supports skill development and better future performance.",
            ],
            order: 7,
          },
        ],
      },
      {
        order: 8,
        sectionName: "Motivation",
        explanation: [
          "1. Motivation means inducement to act and, in organisations, it means making subordinates act in a desired manner.",
          "2. It is used to improve willingness, effort, and goal-directed behaviour.",
        ],
        keywords: ["Motive", "Motivation", "Motivators"],
        subsections: [
          {
            subsection_name: "Motive",
            subsection_content: [
              "A motive is an inner state that energises and directs behaviour toward goals.",
              "Motives arise from needs such as hunger, security, comfort, or recognition.",
            ],
            order: 1,
          },
          {
            subsection_name: "Motivation",
            subsection_content: [
              "Motivation is the process of stimulating people to act for achieving desired goals.",
              "It depends on understanding and satisfying human needs.",
            ],
            order: 2,
          },
          {
            subsection_name: "Motivators",
            subsection_content: [
              "Motivators are techniques used by managers to influence people.",
              "Examples include pay, bonus, promotion, praise, and responsibility.",
            ],
            order: 3,
          },
        ],
      },
      {
        order: 9,
        sectionName: "Features of Motivation",
        explanation: [],
        keywords: [
          "Motivation is an internal feeling",
          "Motivation produces goal directed behaviour",
          "Motivation can be either positive or negative",
          "Motivation is a complex process",
        ],
        subsections: [
          {
            subsection_name: "Motivation is an internal feeling",
            subsection_content: [
              "Urges, desires, and aspirations arise within the individual.",
              "These inner feelings influence how a person behaves at work.",
            ],
            order: 1,
          },
          {
            subsection_name: "Motivation produces goal directed behaviour",
            subsection_content: [
              "Motivation encourages people to act in ways that help achieve specific goals.",
              "Desired rewards often shape the direction of employee effort.",
            ],
            order: 2,
          },
          {
            subsection_name: "Motivation can be either positive or negative",
            subsection_content: [
              "Positive motivation uses rewards like promotion, recognition, and better pay.",
              "Negative motivation uses fear, punishment, or threat to induce action.",
            ],
            order: 3,
          },
          {
            subsection_name: "Motivation is a complex process",
            subsection_content: [
              "People differ in their expectations, perceptions, and reactions.",
              "So the same motivational method does not affect everyone in the same way.",
            ],
            order: 4,
          },
        ],
      },
      {
        order: 10,
        sectionName: "Motivation Process",
        explanation: [
          "1. An unsatisfied need creates tension and activates drives in the individual.",
          "2. These drives lead to search behaviour to satisfy the need.",
          "3. When the need is satisfied, tension is reduced and the person feels relieved.",
        ],
      },
      {
        order: 11,
        sectionName: "Importance of Motivation",
        explanation: [],
        keywords: [
          "Motivation helps to improve performance levels of employees",
          "Motivation helps to change negative or indifferent attitudes of employee to positive attitudes",
          "Motivation helps to reduce employee turnover",
          "Motivation helps to reduce absenteeism in the organisation",
          "Motivation helps managers to introduce changes smoothly",
        ],
        subsections: [
          {
            subsection_name: "Motivation helps to improve performance levels of employees",
            subsection_content: [
              "Satisfied and motivated employees put more energy into their work.",
              "This improves individual and organisational performance.",
            ],
            order: 1,
          },
          {
            subsection_name: "Motivation helps to change negative or indifferent attitudes of employee to positive attitudes",
            subsection_content: [
              "Suitable rewards and encouragement can improve employee attitude toward work.",
              "Positive attitudes support better discipline and involvement.",
            ],
            order: 2,
          },
          {
            subsection_name: "Motivation helps to reduce employee turnover",
            subsection_content: [
              "When needs are understood and incentives are suitable, employees are less likely to leave.",
              "This saves recruitment and training costs for the organisation.",
            ],
            order: 3,
          },
          {
            subsection_name: "Motivation helps to reduce absenteeism in the organisation",
            subsection_content: [
              "Good motivation makes work more satisfying and reduces avoidance of work.",
              "Better attendance helps maintain continuity and productivity.",
            ],
            order: 4,
          },
          {
            subsection_name: "Motivation helps managers to introduce changes smoothly",
            subsection_content: [
              "Employees accept change more readily when they see personal and organisational benefits.",
              "Motivation reduces resistance and improves cooperation during change.",
            ],
            order: 5,
          },
        ],
      },
      {
        order: 12,
        sectionName: "Maslow’s Need Hierarchy Theory of Motivation",
        explanation: [
          "1. Maslow explained motivation through a hierarchy of human needs.",
          "2. Lower level needs are generally satisfied first, and then higher level needs become stronger motivators.",
        ],
        keywords: [
          "Basic Physiological Needs",
          "Safety/Security Needs",
          "Affiliation/Belonging Needs",
          "Esteem Needs",
          "Self Actualisation Needs",
        ],
        subsections: [
          {
            subsection_name: "Basic Physiological Needs",
            subsection_content: [
              "These are the most basic needs such as food, shelter, rest, and other primary requirements.",
              "In the organisational context, salary helps satisfy these needs.",
            ],
            order: 1,
          },
          {
            subsection_name: "Safety/Security Needs",
            subsection_content: [
              "These needs relate to protection from physical and emotional harm.",
              "Job security, stable income, and pension plans are examples in organisations.",
            ],
            order: 2,
          },
          {
            subsection_name: "Affiliation/Belonging Needs",
            subsection_content: [
              "These needs include affection, acceptance, friendship, and a sense of belonging.",
              "Healthy workplace relationships help satisfy them.",
            ],
            order: 3,
          },
          {
            subsection_name: "Esteem Needs",
            subsection_content: [
              "These include self-respect, status, recognition, and attention.",
              "Promotion and respect in the organisation help satisfy esteem needs.",
            ],
            order: 4,
          },
          {
            subsection_name: "Self Actualisation Needs",
            subsection_content: [
              "This is the highest need level and relates to growth, self-fulfilment, and achievement of one's full potential.",
              "It reflects the desire to become what one is capable of becoming.",
            ],
            order: 5,
          },
        ],
      },
      {
        order: 13,
        sectionName: "Financial and Non-Financial Incentives",
        explanation: [
          "1. Incentives are measures used to motivate people to improve performance.",
          "2. They are broadly classified as financial and non-financial incentives.",
        ],
      },
      {
        order: 14,
        sectionName: "Financial Incentives",
        explanation: [],
        keywords: [
          "Pay and allowances",
          "Productivity linked wage incentives",
          "Bonus",
          "Profit Sharing",
          "Co-partnership/ Stock option",
          "Retirement Benefits",
          "Perquisites",
        ],
        subsections: [
          {
            subsection_name: "Pay and allowances",
            subsection_content: [
              "Salary, dearness allowance, and other allowances are the basic monetary incentives for employees.",
              "In some organisations, increments are linked with performance.",
            ],
            order: 1,
          },
          {
            subsection_name: "Productivity linked wage incentives",
            subsection_content: [
              "These plans connect wages with higher productivity.",
              "They may be given at the individual or group level.",
            ],
            order: 2,
          },
          {
            subsection_name: "Bonus",
            subsection_content: [
              "Bonus is an additional payment given over and above wages or salary.",
              "It acts as a reward for better contribution.",
            ],
            order: 3,
          },
          {
            subsection_name: "Profit Sharing",
            subsection_content: [
              "Employees receive a share in the profits of the organisation.",
              "This encourages them to improve performance and support profit growth.",
            ],
            order: 4,
          },
          {
            subsection_name: "Co-partnership/ Stock option",
            subsection_content: [
              "Employees may receive company shares, often at a price lower than market price.",
              "This creates a feeling of ownership and long-term interest in the organisation.",
            ],
            order: 5,
          },
          {
            subsection_name: "Retirement Benefits",
            subsection_content: [
              "Benefits like provident fund, pension, and gratuity provide future financial security.",
              "They motivate employees while they are still in service.",
            ],
            order: 6,
          },
          {
            subsection_name: "Perquisites",
            subsection_content: [
              "Fringe benefits like housing, medical aid, car allowance, or children's education support employees.",
              "These add value beyond regular salary.",
            ],
            order: 7,
          },
        ],
      },
      {
        order: 15,
        sectionName: "Non-Financial Incentives",
        explanation: [],
        keywords: [
          "Status",
          "Organisational Climate",
          "Career Advancement Opportunity",
          "Job Enrichment",
          "Employee Recognition programmes",
          "Job security",
          "Employee participation",
          "Employee Empowerment",
        ],
        subsections: [
          {
            subsection_name: "Status",
            subsection_content: [
              "Status reflects the rank, authority, responsibility, and prestige attached to a position.",
              "It satisfies social and esteem needs of employees.",
            ],
            order: 1,
          },
          {
            subsection_name: "Organisational Climate",
            subsection_content: [
              "The work environment and culture of the organisation influence employee behaviour.",
              "A positive climate improves motivation and cooperation.",
            ],
            order: 2,
          },
          {
            subsection_name: "Career Advancement Opportunity",
            subsection_content: [
              "Employees want chances to grow, develop skills, and move to higher positions.",
              "Promotion opportunities encourage better performance.",
            ],
            order: 3,
          },
          {
            subsection_name: "Job Enrichment",
            subsection_content: [
              "Enriched jobs offer variety, autonomy, responsibility, and meaningful work.",
              "The job itself becomes a source of motivation.",
            ],
            order: 4,
          },
          {
            subsection_name: "Employee Recognition programmes",
            subsection_content: [
              "People want their work to be noticed and appreciated.",
              "Awards, certificates, public praise, and recognition improve morale.",
            ],
            order: 5,
          },
          {
            subsection_name: "Job security",
            subsection_content: [
              "Employees prefer stability in income and continuity of employment.",
              "A secure job reduces worry and supports focused work.",
            ],
            order: 6,
          },
          {
            subsection_name: "Employee participation",
            subsection_content: [
              "Participation means involving employees in decisions connected with their work.",
              "It strengthens commitment and sense of belonging.",
            ],
            order: 7,
          },
          {
            subsection_name: "Employee Empowerment",
            subsection_content: [
              "Empowerment gives more autonomy and decision-making power to subordinates.",
              "It makes employees feel trusted and increases responsible use of skills.",
            ],
            order: 8,
          },
        ],
      },
      {
        order: 16,
        sectionName: "Leadership",
        explanation: [
          "1. Leadership is the process of influencing people to strive willingly for group objectives.",
          "2. It reflects the ability to maintain good interpersonal relations and inspire contribution toward organisational goals.",
          "3. Leadership depends on both the leader and the acceptance of followers.",
        ],
      },
      {
        order: 17,
        sectionName: "Features of leadership",
        explanation: [],
        keywords: [
          "Leadership indicates ability of an individual to influence others",
          "Leadership tries to bring change in the behaviour of others",
          "Leadership indicates interpersonal relations between leaders and followers",
          "Leadership is exercised to achieve common goals of the organisation",
          "Leadership is a continuous process",
        ],
        subsections: [
          {
            subsection_name: "Leadership indicates ability of an individual to influence others",
            subsection_content: [
              "A leader affects the actions and attitudes of other people.",
              "Influence is central to leadership.",
            ],
            order: 1,
          },
          {
            subsection_name: "Leadership tries to bring change in the behaviour of others",
            subsection_content: [
              "Leadership guides people toward desired behaviour and action.",
              "It encourages willing effort toward goals.",
            ],
            order: 2,
          },
          {
            subsection_name: "Leadership indicates interpersonal relations between leaders and followers",
            subsection_content: [
              "Leadership works through relationships, not through isolation.",
              "Both leader and followers play important roles in the process.",
            ],
            order: 3,
          },
          {
            subsection_name: "Leadership is exercised to achieve common goals of the organisation",
            subsection_content: [
              "Leadership is not personal display; it is used to achieve shared objectives.",
              "It unites people around common organisational aims.",
            ],
            order: 4,
          },
          {
            subsection_name: "Leadership is a continuous process",
            subsection_content: [
              "Leadership is needed repeatedly as situations and people keep changing.",
              "It remains active throughout organisational life.",
            ],
            order: 5,
          },
        ],
      },
      {
        order: 18,
        sectionName: "Importance of Leadership",
        explanation: [],
        keywords: [
          "Leadership influences the behaviour of people",
          "A leader maintains personal relations and helps followers in fulfilling their needs",
          "Leader plays a key role in introducing required changes in the organisation",
          "A leader handles conflicts effectively",
          "Leader provides training to their subordinates",
        ],
        subsections: [
          {
            subsection_name: "Leadership influences the behaviour of people",
            subsection_content: [
              "Good leaders encourage people to contribute their energy positively.",
              "They achieve better results through willing cooperation of followers.",
            ],
            order: 1,
          },
          {
            subsection_name: "A leader maintains personal relations and helps followers in fulfilling their needs",
            subsection_content: [
              "Leaders provide support, confidence, and encouragement to followers.",
              "This creates a healthy and cooperative work environment.",
            ],
            order: 2,
          },
          {
            subsection_name: "Leader plays a key role in introducing required changes in the organisation",
            subsection_content: [
              "Leaders explain, persuade, and inspire people to accept change.",
              "This reduces resistance and helps implement change with less discontent.",
            ],
            order: 3,
          },
          {
            subsection_name: "A leader handles conflicts effectively",
            subsection_content: [
              "Leaders allow expression of disagreement but guide people toward resolution.",
              "This prevents conflict from damaging the organisation.",
            ],
            order: 4,
          },
          {
            subsection_name: "Leader provides training to their subordinates",
            subsection_content: [
              "A good leader develops people and prepares future successors.",
              "Training and guidance support long-term organisational strength.",
            ],
            order: 5,
          },
        ],
      },
      {
        order: 19,
        sectionName: "Leadership Style",
        explanation: [],
        keywords: [
          "Autocratic or Authoritarian leader",
          "Democratic or Participative leader",
          "Laissez faire or Free-rein leader",
        ],
        subsections: [
          {
            subsection_name: "Autocratic or Authoritarian leader",
            subsection_content: [
              "This leader gives orders and expects subordinates to obey them.",
              "It supports quick decisions but leaves little participation for subordinates.",
            ],
            order: 1,
          },
          {
            subsection_name: "Democratic or Participative leader",
            subsection_content: [
              "This leader consults subordinates and encourages participation in decision-making.",
              "It usually improves commitment, respect, and better performance.",
            ],
            order: 2,
          },
          {
            subsection_name: "Laissez faire or Free-rein leader",
            subsection_content: [
              "This leader gives followers a high degree of freedom in setting and carrying out work.",
              "The manager mainly supports and supplies information when needed.",
            ],
            order: 3,
          },
        ],
      },
      {
        order: 20,
        sectionName: "Communication",
        explanation: [
          "1. Communication is the process of exchange of ideas, views, facts, feelings, and information to create common understanding.",
          "2. It is central to managerial activities and organisational coordination.",
        ],
      },
      {
        order: 21,
        sectionName: "Elements of Communication Process",
        explanation: [],
        keywords: [
          "Sender",
          "Message",
          "Encoding",
          "Media",
          "Decoding",
          "Receiver",
          "Feedback",
          "Noise",
        ],
        subsections: [
          {
            subsection_name: "Sender",
            subsection_content: [
              "The sender is the person who starts communication by conveying ideas to others.",
              "The sender is the source of the message.",
            ],
            order: 1,
          },
          {
            subsection_name: "Message",
            subsection_content: [
              "The message is the content to be communicated, such as ideas, feelings, instructions, or suggestions.",
              "It is the main subject of communication.",
            ],
            order: 2,
          },
          {
            subsection_name: "Encoding",
            subsection_content: [
              "Encoding means converting the message into words, signs, symbols, or gestures.",
              "It prepares the message for transmission.",
            ],
            order: 3,
          },
          {
            subsection_name: "Media",
            subsection_content: [
              "Media is the channel through which the encoded message travels.",
              "Examples include speech, writing, phone, and internet.",
            ],
            order: 4,
          },
          {
            subsection_name: "Decoding",
            subsection_content: [
              "Decoding is the process of interpreting the received symbols.",
              "It helps the receiver derive meaning from the message.",
            ],
            order: 5,
          },
          {
            subsection_name: "Receiver",
            subsection_content: [
              "The receiver is the person for whom the message is intended.",
              "Communication is complete only when the receiver gets the message.",
            ],
            order: 6,
          },
          {
            subsection_name: "Feedback",
            subsection_content: [
              "Feedback is the response that shows whether the message has been received and understood.",
              "It helps the sender judge communication success.",
            ],
            order: 7,
          },
          {
            subsection_name: "Noise",
            subsection_content: [
              "Noise is any obstacle that disturbs communication or changes meaning.",
              "It may arise from the sender, the message, the channel, or the receiver.",
            ],
            order: 8,
          },
        ],
      },
      {
        order: 22,
        sectionName: "Importance of Communication",
        explanation: [],
        keywords: [
          "Acts as basis of coordination",
          "Helps in smooth working of an enterprise",
          "Acts as basis of decision making",
          "Increases managerial efficiency",
          "Promotes cooperation and industrial peace",
          "Establishes effective leadership",
          "Boosts morale and provides motivation",
        ],
        subsections: [
          {
            subsection_name: "Acts as basis of coordination",
            subsection_content: [
              "Communication connects departments, people, and activities around common goals.",
              "It helps everyone understand relationships and responsibilities clearly.",
            ],
            order: 1,
          },
          {
            subsection_name: "Helps in smooth working of an enterprise",
            subsection_content: [
              "Organisational activity depends on communication for coordinated action.",
              "Without it, regular functioning of the enterprise becomes difficult.",
            ],
            order: 2,
          },
          {
            subsection_name: "Acts as basis of decision making",
            subsection_content: [
              "Managers need relevant information before taking meaningful decisions.",
              "Communication supplies that information.",
            ],
            order: 3,
          },
          {
            subsection_name: "Increases managerial efficiency",
            subsection_content: [
              "Managerial functions like planning, organising, directing, and controlling depend on communication.",
              "Clear communication speeds up performance and reduces confusion.",
            ],
            order: 4,
          },
          {
            subsection_name: "Promotes cooperation and industrial peace",
            subsection_content: [
              "Two-way communication improves understanding between management and workers.",
              "This supports cooperation and reduces conflict.",
            ],
            order: 5,
          },
          {
            subsection_name: "Establishes effective leadership",
            subsection_content: [
              "Leaders need strong communication to influence and guide people effectively.",
              "It is a foundation of successful leadership.",
            ],
            order: 6,
          },
          {
            subsection_name: "Boosts morale and provides motivation",
            subsection_content: [
              "Good communication helps employees adjust better and feel involved.",
              "It improves morale and supports participative management.",
            ],
            order: 7,
          },
        ],
      },
      {
        order: 23,
        sectionName: "Formal and Informal Communication",
        explanation: [
          "1. Communication within an organisation is broadly classified as formal and informal communication.",
          "2. Formal communication follows official channels, while informal communication develops naturally through social interaction.",
        ],
      },
      {
        order: 24,
        sectionName: "Formal Communication",
        explanation: [
          "1. Formal communication flows through the official channels designed in the organisation chart.",
          "2. It may move upward, downward, or horizontally and is usually recorded in some form.",
        ],
        keywords: [
          "Single chain",
          "Wheel",
          "Circular",
          "Free flow",
          "Inverted V",
        ],
        subsections: [
          {
            subsection_name: "Single chain",
            subsection_content: [
              "Communication passes from superior to subordinate through one formal chain.",
              "It follows hierarchy closely and is common in structured organisations.",
            ],
            order: 1,
          },
          {
            subsection_name: "Wheel",
            subsection_content: [
              "All subordinates communicate through one central superior.",
              "The superior acts like the hub of the network.",
            ],
            order: 2,
          },
          {
            subsection_name: "Circular",
            subsection_content: [
              "Each person communicates with the two adjoining people in a circular pattern.",
              "The flow of communication is usually slower in this network.",
            ],
            order: 3,
          },
          {
            subsection_name: "Free flow",
            subsection_content: [
              "Each person may communicate freely with others in the network.",
              "This allows quick sharing of information.",
            ],
            order: 4,
          },
          {
            subsection_name: "Inverted V",
            subsection_content: [
              "A subordinate can communicate with the immediate superior and also with the superior's superior in a limited way.",
              "Only prescribed communication takes place at the higher level.",
            ],
            order: 5,
          },
        ],
      },
      {
        order: 25,
        sectionName: "Informal Communication",
        explanation: [
          "1. Informal communication takes place without following official lines of communication.",
          "2. It is often called the grapevine and spreads quickly through personal contacts.",
          "3. It can be useful for quick reactions, but it may also spread rumours and distorted information.",
        ],
      },
      {
        order: 26,
        sectionName: "Grapevine Network",
        explanation: [],
        keywords: [
          "Single strand network",
          "Gossip network",
          "Probability network",
          "Cluster network",
        ],
        subsections: [
          {
            subsection_name: "Single strand network",
            subsection_content: [
              "One person communicates to another in sequence.",
              "Information moves step by step through individuals.",
            ],
            order: 1,
          },
          {
            subsection_name: "Gossip network",
            subsection_content: [
              "One person tells many others on a non-selective basis.",
              "It spreads information widely and quickly.",
            ],
            order: 2,
          },
          {
            subsection_name: "Probability network",
            subsection_content: [
              "People communicate randomly with others.",
              "The flow is irregular and depends on chance contacts.",
            ],
            order: 3,
          },
          {
            subsection_name: "Cluster network",
            subsection_content: [
              "People communicate mainly with those they trust.",
              "This is one of the most common informal patterns in organisations.",
            ],
            order: 4,
          },
        ],
      },
      {
        order: 27,
        sectionName: "Barriers to Communication",
        explanation: [
          "1. Communication barriers may block, distort, or delay meaning in the organisation.",
          "2. They are broadly grouped as semantic, psychological, organisational, and personal barriers.",
        ],
      },
      {
        order: 28,
        sectionName: "Semantic barriers",
        explanation: [],
        keywords: [
          "Badly expressed message",
          "Symbols with different meanings",
          "Faulty translations",
          "Unclarified assumptions",
          "Technical jargon",
          "Body language and gesture decoding",
        ],
        subsections: [
          {
            subsection_name: "Badly expressed message",
            subsection_content: [
              "Poor vocabulary, wrong words, or missing details can distort meaning.",
              "The receiver may not understand the message as intended.",
            ],
            order: 1,
          },
          {
            subsection_name: "Symbols with different meanings",
            subsection_content: [
              "The same word or symbol can carry different meanings in different contexts.",
              "This may create misunderstanding between sender and receiver.",
            ],
            order: 2,
          },
          {
            subsection_name: "Faulty translations",
            subsection_content: [
              "When a message is translated poorly from one language to another, its meaning can change.",
              "This creates confusion in communication.",
            ],
            order: 3,
          },
          {
            subsection_name: "Unclarified assumptions",
            subsection_content: [
              "Some messages rely on assumptions that the receiver may interpret differently.",
              "If assumptions are not clear, the final action may go wrong.",
            ],
            order: 4,
          },
          {
            subsection_name: "Technical jargon",
            subsection_content: [
              "Specialised terms used by experts may not be understood by non-specialists.",
              "This reduces clarity and effectiveness.",
            ],
            order: 5,
          },
          {
            subsection_name: "Body language and gesture decoding",
            subsection_content: [
              "Mismatch between spoken words and body language can confuse the receiver.",
              "Gestures and posture also affect interpretation.",
            ],
            order: 6,
          },
        ],
      },
      {
        order: 29,
        sectionName: "Psychological barriers",
        explanation: [],
        keywords: [
          "Premature evaluation",
          "Lack of attention",
          "Loss by transmission and poor retention",
          "Distrust",
        ],
        subsections: [
          {
            subsection_name: "Premature evaluation",
            subsection_content: [
              "People may judge the message before it is fully conveyed.",
              "This blocks objective understanding.",
            ],
            order: 1,
          },
          {
            subsection_name: "Lack of attention",
            subsection_content: [
              "A preoccupied or inattentive receiver may not listen properly.",
              "Important parts of the message may be missed.",
            ],
            order: 2,
          },
          {
            subsection_name: "Loss by transmission and poor retention",
            subsection_content: [
              "Messages can lose accuracy when passed through many levels.",
              "People may also forget information if they are not attentive or interested.",
            ],
            order: 3,
          },
          {
            subsection_name: "Distrust",
            subsection_content: [
              "If communicators do not trust each other, the message is not accepted in its true sense.",
              "Distrust weakens effective understanding.",
            ],
            order: 4,
          },
        ],
      },
      {
        order: 30,
        sectionName: "Organisational barriers",
        explanation: [],
        keywords: [
          "Organisational policy",
          "Rules and regulations",
          "Status",
          "Complexity in organisation structure",
          "Organisational facilities",
        ],
        subsections: [
          {
            subsection_name: "Organisational policy",
            subsection_content: [
              "Policies that do not support open communication can limit message flow.",
              "Highly centralised systems often create this problem.",
            ],
            order: 1,
          },
          {
            subsection_name: "Rules and regulations",
            subsection_content: [
              "Rigid procedures and prescribed channels can slow communication.",
              "Unnecessary formality may reduce effectiveness.",
            ],
            order: 2,
          },
          {
            subsection_name: "Status",
            subsection_content: [
              "Status differences between superiors and subordinates may create distance.",
              "This can stop people from speaking freely.",
            ],
            order: 3,
          },
          {
            subsection_name: "Complexity in organisation structure",
            subsection_content: [
              "Many managerial levels increase chances of delay and distortion.",
              "Each level can become a filtering point.",
            ],
            order: 4,
          },
          {
            subsection_name: "Organisational facilities",
            subsection_content: [
              "Lack of meetings, suggestion systems, and transparent processes can hamper communication.",
              "Supportive facilities improve smooth and timely message flow.",
            ],
            order: 5,
          },
        ],
      },
      {
        order: 31,
        sectionName: "Personal barriers",
        explanation: [],
        keywords: [
          "Fear of challenge to authority",
          "Lack of confidence of superior on his subordinates",
          "Unwillingness to communicate",
          "Lack of proper incentives",
        ],
        subsections: [
          {
            subsection_name: "Fear of challenge to authority",
            subsection_content: [
              "A superior may suppress information if it seems to threaten authority.",
              "This prevents open communication.",
            ],
            order: 1,
          },
          {
            subsection_name: "Lack of confidence of superior on his subordinates",
            subsection_content: [
              "When superiors do not trust subordinates' competence, they may ignore their opinions.",
              "This blocks useful upward communication.",
            ],
            order: 2,
          },
          {
            subsection_name: "Unwillingness to communicate",
            subsection_content: [
              "Subordinates may avoid communication if they fear harm to their interests.",
              "This leads to silence even when information is important.",
            ],
            order: 3,
          },
          {
            subsection_name: "Lack of proper incentives",
            subsection_content: [
              "If good suggestions or communication efforts are not appreciated, people lose initiative.",
              "Motivation is needed to encourage communication.",
            ],
            order: 4,
          },
        ],
      },
      {
        order: 32,
        sectionName: "Improving Communication Effectiveness",
        explanation: [],
        keywords: [
          "Clarify the ideas before communication",
          "Communicate according to the needs of receiver",
          "Consult others before communicating",
          "Be aware of languages, tone and content of message",
          "Convey things of help and value to listeners",
          "Ensure proper feedback",
          "Communicate for present as well as future",
          "Follow up communications",
          "Be a good listener",
        ],
        subsections: [
          {
            subsection_name: "Clarify the ideas before communication",
            subsection_content: [
              "The communicator should understand the problem clearly before speaking or writing.",
              "Clear thinking leads to clearer communication.",
            ],
            order: 1,
          },
          {
            subsection_name: "Communicate according to the needs of receiver",
            subsection_content: [
              "The message should match the receiver's understanding and background.",
              "Managers should adjust communication to the listener's level.",
            ],
            order: 2,
          },
          {
            subsection_name: "Consult others before communicating",
            subsection_content: [
              "Involving others in communication planning improves acceptance and cooperation.",
              "Participation often makes the message easier to implement.",
            ],
            order: 3,
          },
          {
            subsection_name: "Be aware of languages, tone and content of message",
            subsection_content: [
              "Language should be understandable and the tone should not hurt listeners.",
              "The message should be appropriate and capable of evoking response.",
            ],
            order: 4,
          },
          {
            subsection_name: "Convey things of help and value to listeners",
            subsection_content: [
              "Messages are more effective when they relate to the interests and needs of listeners.",
              "Useful communication gets better response.",
            ],
            order: 5,
          },
          {
            subsection_name: "Ensure proper feedback",
            subsection_content: [
              "The communicator should check whether the message has been understood properly.",
              "Feedback helps improve communication quality.",
            ],
            order: 6,
          },
          {
            subsection_name: "Communicate for present as well as future",
            subsection_content: [
              "Communication should address current needs while also supporting future goals.",
              "This keeps action consistent and forward-looking.",
            ],
            order: 7,
          },
          {
            subsection_name: "Follow up communications",
            subsection_content: [
              "Managers should review whether instructions are being implemented properly.",
              "Follow-up helps remove hurdles in execution.",
            ],
            order: 8,
          },
          {
            subsection_name: "Be a good listener",
            subsection_content: [
              "Patient and attentive listening is essential for effective communication.",
              "Managers should show interest when others speak.",
            ],
            order: 9,
          },
        ],
      },
      {
        order: 33,
        sectionName: "Key Terms",
        explanation: [
          "1. Directing",
          "2. Supervision",
          "3. Motives",
          "4. Motivation",
          "5. Incentives",
          "6. Self actualisation",
          "7. Egoistic needs",
          "8. Leadership",
          "9. Trait approach",
          "10. Communication",
          "11. Encoding",
          "12. Decoding",
          "13. Feedback",
          "14. Semanticism",
          "15. Formal communication",
          "16. Informal communication",
          "17. Profit sharing",
          "18. Copartnership",
          "19. Quality circles",
          "20. Stock options",
        ],
      },
      {
        order: 34,
        sectionName: "Summary",
        explanation: [],
      },
      {
        order: 35,
        sectionName: "Exercises",
        explanation: [],
      },
      {
        order: 36,
        sectionName: "Top 3 Sample Questions",
        explanation: [
          "1. What is directing? Explain its importance in management.",
          "2. Explain Maslow's Need Hierarchy Theory of motivation.",
          "3. What are the barriers to effective communication? Suggest measures to overcome them.",
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
        sectionName: "Meaning of Controlling",
        explanation: [
          "1. Controlling means ensuring that organisational activities are performed according to plans.",
          "2. It checks whether resources are being used effectively and efficiently to achieve predetermined goals.",
          "3. It is a goal-oriented and pervasive function performed at all levels of management.",
          "4. It brings the management cycle back to planning by finding deviations and improving future plans.",
        ],
      },
      {
        order: 2,
        sectionName: "Importance of Controlling",
        explanation: [
          "1. Control is an indispensable function of management.",
          "2. A good control system helps the organisation stay on track and improve performance.",
        ],
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
        explanation: [
          "1. Controlling is important, but it has practical limits.",
          "2. Its effectiveness depends on the nature of standards, people, and operating conditions.",
        ],
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
      },
      {
        order: 5,
        sectionName: "Controlling Process",
        explanation: [
          "1. Controlling is a systematic process.",
          "2. It follows five connected steps from standard setting to corrective action.",
        ],
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

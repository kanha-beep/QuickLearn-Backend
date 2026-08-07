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
      sectionName: "inTroducTion",
      explanation: [
        "1. Finance is essential for running a business and arranging it on time and at low cost matters a lot.",
        "2. Financial planning, capital structure, risk, profitability and working capital all affect business decisions.",
        "3. These decisions influence shareholders, employees and the future of the enterprise.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 2,
      sectionName: "Meaning oF BuSineSS Finance",
      explanation: [
        "1. Business finance means the money needed for carrying out business activities.",
        "2. It is required to start, run, modernise, expand and diversify a business.",
        "3. Finance is used for assets like machinery, buildings, patents and technical know-how.",
        "4. It is also needed for daily operations like buying materials, paying salaries and collecting cash.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 3,
      sectionName: "Financial ManageMenT",
      explanation: [
        "1. Financial management is concerned with optimal procurement and proper use of finance.",
        "2. It compares sources on cost and risk and invests funds where returns are higher than cost.",
        "3. It aims to reduce cost of funds, control risk and ensure effective deployment.",
        "4. It also tries to keep enough funds available and avoid idle finance.",
      ],
      keywords: ["Importance"],
      subsections: [
        {
          subsection_name: "Importance",
          subsection_content: [
            "1. Financial management directly affects the financial health of a business.",
            "2. It influences fixed assets, current assets, long-term and short-term funds, and the debt-equity mix.",
            "3. It also affects profit and loss items like interest, dividends and depreciation through earlier decisions.",
            "4. Good financial management mobilises funds at lower cost and uses them in more rewarding activities.",
          ],
          order: 1,
        },
      ],
    },
    {
      order: 4,
      sectionName: "oBjecTiveS",
      explanation: [
        "1. The primary aim of financial management is to maximise shareholders' wealth.",
        "2. It focuses on increasing the current market price of equity shares.",
        "3. A financial decision is good when its benefit is more than its cost and it adds value.",
        "4. Efficient choice among alternatives helps increase shareholders' gains.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 5,
      sectionName: "Financial deciSionS",
      explanation: [
        "1. Financial management deals with three broad decisions in the firm's financial operations.",
        "2. These decisions relate to investment, financing and dividend.",
        "3. The aim is to choose the best alternative in each area.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 6,
      sectionName: "investment Decision",
      explanation: [
        "1. Investment decision decides how the firm's funds will be invested in different assets.",
        "2. Long-term investment decision is called capital budgeting decision and affects earning capacity in the long run.",
        "3. Short-term investment decision deals with cash, inventory and receivables under working capital management.",
        "4. These decisions are important because they are large, risky and difficult to reverse.",
      ],
      keywords: [
        "Cash flows of the project",
        "The rate of return",
        "The investment criteria involved",
      ],
      subsections: [
        {
          subsection_name: "Cash flows of the project",
          subsection_content: [
            "1. A project should be judged by the cash receipts and payments it is expected to generate.",
            "2. These cash flows over the life of the investment must be analysed carefully before selection.",
          ],
          order: 1,
        },
        {
          subsection_name: "The rate of return",
          subsection_content: [
            "1. The expected rate of return is a major basis for choosing a project.",
            "2. Between projects with similar risk, the one with higher return is normally preferred.",
          ],
          order: 2,
        },
        {
          subsection_name: "The investment criteria involved",
          subsection_content: [
            "1. Capital budgeting needs calculations about investment amount, interest rate, cash flows and return.",
            "2. Different capital budgeting techniques are applied to compare proposals before choosing one project.",
          ],
          order: 3,
        },
      ],
    },
    {
      order: 7,
      sectionName: "Financing Decision",
      explanation: [
        "1. Financing decision decides how much money should be raised and from which long-term source.",
        "2. The main choices are shareholders' funds like equity and retained earnings, and borrowed funds like debt.",
        "3. Debt is usually cheaper but brings compulsory interest, repayment and financial risk.",
        "4. This decision fixes the cost of capital and the financial risk of the enterprise.",
      ],
      keywords: [
        "Cost",
        "Risk",
        "Floatation Costs",
        "Cash Flow Position of the Company",
        "Fixed Operating Costs",
        "Control Considerations",
        "State of Capital Market",
      ],
      subsections: [
        {
          subsection_name: "Cost",
          subsection_content: [
            "1. Different sources of funds have different costs.",
            "2. A careful financial manager generally prefers the cheaper source.",
          ],
          order: 1,
        },
        {
          subsection_name: "Risk",
          subsection_content: [
            "1. Each source of finance carries a different level of risk.",
            "2. This risk must be balanced with the expected advantage of using that source.",
          ],
          order: 2,
        },
        {
          subsection_name: "Floatation Costs",
          subsection_content: [
            "1. Raising funds involves issue and transaction expenses.",
            "2. Higher floatation cost makes a source less attractive.",
          ],
          order: 3,
        },
        {
          subsection_name: "Cash Flow Position of the Company",
          subsection_content: [
            "1. A strong cash flow position makes debt financing easier to manage.",
            "2. Firms with weaker cash flow may find equity safer than debt.",
          ],
          order: 4,
        },
        {
          subsection_name: "Fixed Operating Costs",
          subsection_content: [
            "1. Firms with high fixed operating costs should avoid adding heavy fixed financing costs.",
            "2. When operating fixed costs are low, a higher use of debt may be possible.",
          ],
          order: 5,
        },
        {
          subsection_name: "Control Considerations",
          subsection_content: [
            "1. Issue of more equity can dilute management control.",
            "2. Debt does not usually affect control in the same way, so some firms prefer it.",
          ],
          order: 6,
        },
        {
          subsection_name: "State of Capital Market",
          subsection_content: [
            "1. A rising stock market makes equity issue easier.",
            "2. In a weak market, companies may find it harder to raise equity and may turn to debt.",
          ],
          order: 7,
        },
      ],
    },
    {
      order: 8,
      sectionName: "Dividend Decision",
      explanation: [
        "1. Dividend is the part of profit distributed to shareholders.",
        "2. Dividend decision decides how much profit will be distributed and how much will be retained.",
        "3. Retained earnings support future earning capacity and reduce outside fund needs.",
        "4. This decision should support the overall aim of maximising shareholders' wealth.",
      ],
      keywords: [
        "Amount of Earnings",
        "Stability Earnings",
        "Stability of Dividends",
        "Growth Opportunities",
        "Cash Flow Position",
        "Shareholders’ Preference",
        "Taxation Policy",
        "Stock Market Reaction",
        "Access to Capital Market",
        "Legal Constraints",
        "Contractual Constraints",
      ],
      subsections: [
        {
          subsection_name: "Amount of Earnings",
          subsection_content: [
            "1. Dividend is paid out of current and past earnings.",
            "2. Higher earnings usually make dividend payment easier.",
          ],
          order: 1,
        },
        {
          subsection_name: "Stability Earnings",
          subsection_content: [
            "1. Firms with stable earnings can declare higher dividends more confidently.",
            "2. Unstable earnings usually lead to smaller dividend payments.",
          ],
          order: 2,
        },
        {
          subsection_name: "Stability of Dividends",
          subsection_content: [
            "1. Companies usually try to keep dividend per share stable.",
            "2. They raise dividend only when they believe the higher earning level can continue.",
          ],
          order: 3,
        },
        {
          subsection_name: "Growth Opportunities",
          subsection_content: [
            "1. Companies with good growth prospects retain more earnings for investment.",
            "2. Because of this, growth companies often pay lower dividends.",
          ],
          order: 4,
        },
        {
          subsection_name: "Cash Flow Position",
          subsection_content: [
            "1. Dividend payment needs cash outflow, not just accounting profit.",
            "2. A company short of cash may find it difficult to declare dividend.",
          ],
          order: 5,
        },
        {
          subsection_name: "Shareholders’ Preference",
          subsection_content: [
            "1. Management should consider what shareholders generally expect as dividend.",
            "2. Some shareholders depend on regular income from their investment.",
          ],
          order: 6,
        },
        {
          subsection_name: "Taxation Policy",
          subsection_content: [
            "1. Tax treatment of dividend and capital gain can influence dividend policy.",
            "2. When dividend becomes more tax-friendly, shareholders may prefer higher payouts.",
          ],
          order: 7,
        },
        {
          subsection_name: "Stock Market Reaction",
          subsection_content: [
            "1. Increase in dividend is often seen as good news in the stock market.",
            "2. Reduction in dividend can affect share prices negatively.",
          ],
          order: 8,
        },
        {
          subsection_name: "Access to Capital Market",
          subsection_content: [
            "1. Large and reputed companies can raise outside funds more easily.",
            "2. Because of this, they may rely less on retained earnings and pay higher dividends.",
          ],
          order: 9,
        },
        {
          subsection_name: "Legal Constraints",
          subsection_content: [
            "1. Companies Act provisions put limits on dividend distribution.",
            "2. Dividend decisions must follow these legal rules.",
          ],
          order: 10,
        },
        {
          subsection_name: "Contractual Constraints",
          subsection_content: [
            "1. Loan agreements may place restrictions on future dividend payments.",
            "2. A company must ensure its dividend policy does not violate such terms.",
          ],
          order: 11,
        },
      ],
    },
    {
      order: 9,
      sectionName: "Financial Planning",
      explanation: [
        "1. Financial planning is the preparation of a financial blueprint of future operations.",
        "2. It focuses on matching fund requirements with fund availability at the right time.",
        "3. It is different from financial management because it supports smooth operations through planning of funds.",
        "4. It covers both short-term and long-term planning and often begins with a sales forecast.",
      ],
      keywords: [
        "To ensure availability of funds whenever required",
        "To see that the firm does not raise resources unnecessarily",
        "iMPorTance",
      ],
      subsections: [
        {
          subsection_name: "To ensure availability of funds whenever required",
          subsection_content: [
            "1. Financial planning estimates how much money is needed for fixed assets and day-to-day expenses.",
            "2. It also plans the timing and possible sources of those funds.",
          ],
          order: 1,
        },
        {
          subsection_name: "To see that the firm does not raise resources unnecessarily",
          subsection_content: [
            "1. Excess funds can be as harmful as shortage because they increase cost and may encourage waste.",
            "2. Good planning makes sure surplus funds are not raised without need and are used well if available.",
          ],
          order: 2,
        },
        {
          subsection_name: "iMPorTance",
          subsection_content: [
            "1. Financial planning helps the firm prepare for different future business situations and avoid shocks.",
            "2. It supports coordination among business functions and reduces waste, duplication and planning gaps.",
            "3. It links present actions with future needs and connects investment with financing decisions.",
            "4. It makes performance evaluation easier by setting clear objectives for different business areas.",
          ],
          order: 3,
        },
      ],
    },
    {
      order: 10,
      sectionName: "caPiTal STrucTure",
      explanation: [
        "1. Capital structure means the mix of owners' funds and borrowed funds used in the business.",
        "2. Debt is usually cheaper than equity but it increases fixed financial obligations and risk.",
        "3. An optimal capital structure is the one that raises the value of equity shares and shareholders' wealth.",
        "4. Financial leverage and EBIT-EPS analysis show how debt can raise or reduce EPS depending on return on investment.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 11,
      sectionName: "Factors affecting the choice of capital structure",
      explanation: [],
      keywords: [
        "cash Flow Position",
        "interest c overage r atio ( icr )",
        "Debt s ervice c overage r atio (Dscr )",
        "r eturn on investment ( r oi)",
        "c ost of debt",
        "t ax r ate",
        "c ost of e quity",
        "Floatation c osts",
        "r isk consideration",
        "Flexibility",
        "c ontrol",
        "r egulatory Framework",
        "stock Market conditions",
        "c apital s tructure of other companies",
      ],
      subsections: [
        {
          subsection_name: "cash Flow Position",
          subsection_content: [
            "1. Projected cash flows should be enough to cover normal operations, investment needs and debt servicing.",
            "2. A company should borrow only when it has a safe cash buffer.",
          ],
          order: 1,
        },
        {
          subsection_name: "interest c overage r atio ( icr )",
          subsection_content: [
            "1. ICR shows how many times EBIT covers interest obligation.",
            "2. A higher ratio means lower risk of failing to pay interest, though cash balance must also be checked.",
          ],
          order: 2,
        },
        {
          subsection_name: "Debt s ervice c overage r atio (Dscr )",
          subsection_content: [
            "1. DSCR compares cash profits with total cash needed for debt and preference commitments.",
            "2. A higher DSCR shows better ability to meet cash obligations and take more debt.",
          ],
          order: 3,
        },
        {
          subsection_name: "r eturn on investment ( r oi)",
          subsection_content: [
            "1. When ROI is higher than cost of debt, trading on equity can increase EPS.",
            "2. Low ROI reduces the firm's ability to use debt profitably.",
          ],
          order: 4,
        },
        {
          subsection_name: "c ost of debt",
          subsection_content: [
            "1. A firm that can borrow at a lower rate can use more debt comfortably.",
            "2. Lower borrowing cost increases the attraction of debt in capital structure.",
          ],
          order: 5,
        },
        {
          subsection_name: "t ax r ate",
          subsection_content: [
            "1. Since interest is tax-deductible, higher tax rate makes debt relatively cheaper.",
            "2. This can make debt more attractive than equity.",
          ],
          order: 6,
        },
        {
          subsection_name: "c ost of e quity",
          subsection_content: [
            "1. More debt increases financial risk for equity holders and they may demand higher return.",
            "2. Beyond a point, rising cost of equity can reduce share price even if EPS rises.",
          ],
          order: 7,
        },
        {
          subsection_name: "Floatation c osts",
          subsection_content: [
            "1. Raising funds through public issue involves issue expenses.",
            "2. These costs influence the choice between debt and equity.",
          ],
          order: 8,
        },
        {
          subsection_name: "r isk consideration",
          subsection_content: [
            "1. More debt increases financial risk because fixed charges must be paid.",
            "2. Total risk depends on both business risk and financial risk.",
          ],
          order: 9,
        },
        {
          subsection_name: "Flexibility",
          subsection_content: [
            "1. If a firm fully uses its debt capacity, it loses freedom to borrow later.",
            "2. Some borrowing capacity should remain for unforeseen needs.",
          ],
          order: 10,
        },
        {
          subsection_name: "c ontrol",
          subsection_content: [
            "1. Debt normally does not dilute control, while equity issue may reduce management holding.",
            "2. This matters especially in firms where management control is already limited.",
          ],
          order: 11,
        },
        {
          subsection_name: "r egulatory Framework",
          subsection_content: [
            "1. Every company raises funds within legal and regulatory rules.",
            "2. Ease of meeting these rules can affect the preferred source of finance.",
          ],
          order: 12,
        },
        {
          subsection_name: "stock Market conditions",
          subsection_content: [
            "1. Bullish markets make equity shares easier to sell at better prices.",
            "2. In bearish conditions, companies may prefer debt over equity.",
          ],
          order: 13,
        },
        {
          subsection_name: "c apital s tructure of other companies",
          subsection_content: [
            "1. Industry debt-equity patterns give a useful guideline for planning capital structure.",
            "2. A firm should still adjust its decision to its own business risk and not copy industry norms blindly.",
          ],
          order: 14,
        },
      ],
    },
    {
      order: 12,
      sectionName: "Fixed and  Working  caPiTal",
      explanation: [
        "1. Every business needs funds for both fixed assets and current assets.",
        "2. Fixed assets stay in the business for more than one year and usually need large investment.",
        "3. Current assets are expected to turn into cash or cash equivalents within one year.",
        "4. Investment in fixed assets is linked with capital budgeting decisions.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 13,
      sectionName: "Management of Fixed capital",
      explanation: [
        "1. Fixed capital means investment in long-term assets and projects with long-term business impact.",
        "2. It should be financed through long-term sources like equity, preference shares, debentures, long-term loans and retained earnings.",
        "3. These decisions include acquisition, expansion, modernisation and replacement of long-term assets.",
      ],
      keywords: [
        "Long-term growth",
        "Large amount of funds involved",
        "Risk involved",
        "Irreversible decisions",
      ],
      subsections: [
        {
          subsection_name: "Long-term growth",
          subsection_content: [
            "1. Investment in fixed capital affects future returns and long-term growth of the business.",
            "2. These decisions shape the firm's future prospects.",
          ],
          order: 1,
        },
        {
          subsection_name: "Large amount of funds involved",
          subsection_content: [
            "1. Fixed capital decisions block a large part of funds in long-term projects.",
            "2. Because the amount is high, detailed analysis is necessary before investing.",
          ],
          order: 2,
        },
        {
          subsection_name: "Risk involved",
          subsection_content: [
            "1. Large long-term investment affects the returns of the whole firm.",
            "2. So fixed capital decisions influence the overall business risk.",
          ],
          order: 3,
        },
        {
          subsection_name: "Irreversible decisions",
          subsection_content: [
            "1. Once taken, these decisions are hard to reverse without heavy loss.",
            "2. Wrong investment can cause serious financial damage.",
          ],
          order: 4,
        },
      ],
    },
    {
      order: 14,
      sectionName: "Factors affecting the r equirement of Fixed capital",
      explanation: [],
      keywords: [
        "n ature of b usiness",
        "s cale of Operations",
        "c hoice of t echnique",
        "t echnology Upgradation",
        "g rowth Prospects",
        "Diversification",
        "Financing alternatives",
        "Level of collaboration",
      ],
      subsections: [
        {
          subsection_name: "n ature of b usiness",
          subsection_content: [
            "1. Manufacturing concerns usually need more fixed capital than trading concerns.",
            "2. Trading firms need less plant and machinery investment.",
          ],
          order: 1,
        },
        {
          subsection_name: "s cale of Operations",
          subsection_content: [
            "1. Larger organisations need bigger plants, more space and more equipment.",
            "2. So a higher scale of operations increases fixed capital need.",
          ],
          order: 2,
        },
        {
          subsection_name: "c hoice of t echnique",
          subsection_content: [
            "1. Capital-intensive techniques require more investment in plant and machinery.",
            "2. Labour-intensive techniques require comparatively less fixed capital.",
          ],
          order: 3,
        },
        {
          subsection_name: "t echnology Upgradation",
          subsection_content: [
            "1. In some industries assets become obsolete quickly and need faster replacement.",
            "2. This raises the requirement of fixed capital.",
          ],
          order: 4,
        },
        {
          subsection_name: "g rowth Prospects",
          subsection_content: [
            "1. Higher expected growth leads to higher investment in fixed assets.",
            "2. Firms may create extra capacity in advance to meet future demand.",
          ],
          order: 5,
        },
        {
          subsection_name: "Diversification",
          subsection_content: [
            "1. When a firm enters new lines of business, it usually needs more fixed assets.",
            "2. So diversification tends to increase fixed capital requirement.",
          ],
          order: 6,
        },
        {
          subsection_name: "Financing alternatives",
          subsection_content: [
            "1. Leasing can reduce the need for large upfront investment in fixed assets.",
            "2. Availability of such alternatives can lower fixed capital requirement.",
          ],
          order: 7,
        },
        {
          subsection_name: "Level of collaboration",
          subsection_content: [
            "1. Firms may share facilities with other organisations.",
            "2. Such collaboration reduces the fixed asset investment needed by each participant.",
          ],
          order: 8,
        },
      ],
    },
    {
      order: 15,
      sectionName: "Working  caPiTal",
      explanation: [
        "1. Working capital is the investment made in current assets for smooth day-to-day operations.",
        "2. Current assets are liquid and are expected to convert into cash within one year.",
        "3. Too little current asset investment can create payment difficulty, but too much lowers profitability.",
        "4. Net working capital is the excess of current assets over current liabilities.",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 16,
      sectionName: "FacTorS  aFFecTing The  Working  caPiTal requireMenTS",
      explanation: [],
      keywords: [
        "nature of business",
        "scale of Operations",
        "business cycle",
        "seasonal Factors",
        "Production c ycle",
        "c redit allowed",
        "c redit a vailed",
        "Operating e fficiency",
        "availabilit y of r aw Material",
        "g rowth Prospects",
        "Level of competition",
        "inflation",
      ],
      subsections: [
        {
          subsection_name: "nature of business",
          subsection_content: [
            "1. Trading and service firms usually need less working capital than manufacturing firms.",
            "2. Manufacturing businesses need more because goods must be processed before sale.",
          ],
          order: 1,
        },
        {
          subsection_name: "scale of Operations",
          subsection_content: [
            "1. Higher scale of operation usually needs more inventory and debtors.",
            "2. So bigger organisations require more working capital.",
          ],
          order: 2,
        },
        {
          subsection_name: "business cycle",
          subsection_content: [
            "1. During boom, higher production and sales increase working capital need.",
            "2. During depression, the requirement becomes lower.",
          ],
          order: 3,
        },
        {
          subsection_name: "seasonal Factors",
          subsection_content: [
            "1. Seasonal businesses need more working capital in peak season.",
            "2. The need falls during the lean season.",
          ],
          order: 4,
        },
        {
          subsection_name: "Production c ycle",
          subsection_content: [
            "1. Longer production cycle keeps funds tied up for a longer time in materials and processing.",
            "2. So firms with longer production cycle need more working capital.",
          ],
          order: 5,
        },
        {
          subsection_name: "c redit allowed",
          subsection_content: [
            "1. Liberal credit to customers increases debtors.",
            "2. This raises the requirement of working capital.",
          ],
          order: 6,
        },
        {
          subsection_name: "c redit a vailed",
          subsection_content: [
            "1. Credit received from suppliers reduces the firm's own working capital need.",
            "2. Purchase credit therefore lowers funds blocked in operations.",
          ],
          order: 7,
        },
        {
          subsection_name: "Operating e fficiency",
          subsection_content: [
            "1. Efficient handling of materials, receivables and finished goods reduces funds tied up in current assets.",
            "2. Better operating efficiency lowers working capital requirement.",
          ],
          order: 8,
        },
        {
          subsection_name: "availabilit y of r aw Material",
          subsection_content: [
            "1. Easy and regular supply of raw material allows smaller stock levels.",
            "2. Irregular supply or longer lead time requires higher stock and more working capital.",
          ],
          order: 9,
        },
        {
          subsection_name: "g rowth Prospects",
          subsection_content: [
            "1. Higher growth expectation requires more working capital to support larger production and sales.",
            "2. Growing firms therefore keep a larger working capital base.",
          ],
          order: 10,
        },
        {
          subsection_name: "Level of competition",
          subsection_content: [
            "1. Strong competition may force firms to hold larger finished stock and give liberal credit.",
            "2. Both increase the need for working capital.",
          ],
          order: 11,
        },
        {
          subsection_name: "inflation",
          subsection_content: [
            "1. Rising prices increase the amount needed to maintain the same level of production and sales.",
            "2. So inflation generally increases working capital requirement.",
          ],
          order: 12,
        },
      ],
    },
    {
      order: 17,
      sectionName: "key TerMS",
      explanation: [
        "1. Financial Management",
        "2. Wealth Maximisation",
        "3. Investment Decision",
        "4. Financing Decision",
        "5. Dividend Decision",
        "6. Capital Budgeting",
        "7. Working Capital",
        "8. Financial Planning",
        "9. Capital Structure",
        "10. Trading on e quity",
      ],
      keywords: [],
      subsections: [],
    },
    {
      order: 18,
      sectionName: "sUMMar Y",
      explanation: [],
      keywords: [],
      subsections: [],
    },
    {
      order: 19,
      sectionName: "eXercises",
      explanation: [],
      keywords: [],
      subsections: [],
    },
    {
      order: 20,
      sectionName: "Top 3 Sample Questions",
      explanation: [
        "1. What are the objectives of financial management?",
        "2. Explain the factors affecting the choice of capital structure.",
        "3. What is working capital? Discuss the factors affecting its requirement.",
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

import { Chapters } from "../Models/Chapter.Models.js";
import { ChapterTest } from "../Models/ChapterTest.Models.js";
import { ChapterTestSubmission } from "../Models/ChapterTestSubmission.Models.js";
import { Sections } from "../Models/Section.Models.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";
import { User } from "../Models/User.Models.js";
import { generateChapterTestFromPrompt } from "../Services/ChapterTestAI.Service.js";
import { retrieveRelevantPyqContext } from "../Services/PyqCorpus.Service.js";
import { evaluateChapterTest } from "../Utils/EvaluateChapterTest.js";

const buildChapterPayload = (sections = []) =>
    sections.map((section) => ({
        sectionId: String(section._id),
        sectionName: section.section_name,
        summary: (section.section_content || []).filter(Boolean),
        subsections: (section.subsections || []).map((subsection) => ({
            subsectionId: String(subsection._id || ""),
            subsectionName: subsection.subsection_name,
            summary: (subsection.subsection_content || []).filter(Boolean),
        })),
    }));

const buildHolisticThemes = (sections = []) =>
    sections.map((section) => ({
        sectionId: String(section._id),
        sectionName: section.section_name,
        keyIdeas: uniqueStrings([
            ...(section.section_content || []).slice(0, 3),
            ...(section.subsections || []).map((subsection) => subsection.subsection_name),
            ...(section.subsections || []).flatMap((subsection) => (subsection.subsection_content || []).slice(0, 2)),
        ]).slice(0, 6),
    }));

const uniqueStrings = (items = []) =>
    Array.from(new Set(items.map((item) => String(item || "").trim()).filter(Boolean)));

const buildRecentTestsDigest = (tests = []) =>
    tests.map((test) => ({
        title: test.title,
        description: test.description,
        prompts: (test.questions || []).map((question) => question.prompt).slice(0, 12),
        subjects: uniqueStrings((test.questions || []).map((question) => question.subject)).slice(0, 8),
    }));

const buildChapterPrompt = ({
    subjectName = "",
    chapterName = "",
    sections = [],
    pyqContext = null,
    recentTests = [],
}) => {
    const promptParts = [
        `Subject: ${subjectName}`,
        `Chapter: ${chapterName}`,
        "Create a holistic chapter test, not a narrow one-point test.",
        "Cover the whole chapter topic from multiple angles such as constitutional basis, powers, limitations, procedure, exceptions, comparison, current relevance, and conceptual traps when relevant.",
        "Use section summaries and subsection summaries as the primary answer base.",
        "If chapter content is thin, use the retrieved PYQ context to generate additional diverse questions, but still map every question to the nearest relevant section.",
        "Do not repeat the same exact question patterns, wording, or focus areas from recent tests for this chapter.",
        "Each question must map to one section and optionally one subsection, but the question itself can be broader than the section title.",
        "Keep answers grounded in the provided chapter summaries. PYQ context should mainly improve framing, diversity, and exam pattern.",
        `Chapter data JSON: ${JSON.stringify(buildChapterPayload(sections))}`,
        `Holistic chapter themes JSON: ${JSON.stringify(buildHolisticThemes(sections))}`,
    ];

    if (pyqContext?.matchedTopics?.length) {
        promptParts.push(`Matched PYQ topics: ${pyqContext.matchedTopics.join(", ")}`);
    }

    if (pyqContext?.snippets?.length) {
        promptParts.push(
            `Relevant PYQ snippets JSON: ${JSON.stringify(pyqContext.snippets)}`
        );
    }

    if (recentTests.length > 0) {
        promptParts.push(`Avoid repeating these recent test patterns JSON: ${JSON.stringify(buildRecentTestsDigest(recentTests))}`);
    }

    return promptParts.join("\n");
};

const sanitizeQuestion = (question, sections, index) => {
    const section = sections.find((item) => String(item._id) === String(question?.sectionId));
    if (!section) return null;

    const subsection = (section.subsections || []).find(
        (item) => String(item._id || "") === String(question?.subsectionId || "")
    );

    const options = Array.isArray(question?.options)
        ? question.options
            .map((option) => ({
                key: String(option?.key || "").trim(),
                text: String(option?.text || "").trim(),
            }))
            .filter((option) => option.key && option.text)
        : [];

    if (options.length !== 4) return null;

    const correctOption = String(question?.correctOption || "").trim();
    if (!options.some((option) => option.key === correctOption)) return null;

    return {
        number: index + 1,
        prompt: String(question?.prompt || "").trim(),
        subject: String(question?.subject || section.section_name || "Chapter Test").trim(),
        difficulty: ["Easy", "Medium", "Hard"].includes(question?.difficulty) ? question.difficulty : "Medium",
        sectionId: section._id,
        subsectionId: subsection?._id ? String(subsection._id) : "",
        options,
        correctOption,
        explanation: String(question?.explanation || "").trim() || "Review the relevant chapter summary again.",
    };
};

const buildFallbackQuestion = (section, index, sections, chapterName = "", pyqContext = null) => {
    const subsection = (section.subsections || []).find(
        (item) => Array.isArray(item?.subsection_content) && item.subsection_content.length > 0
    );
    const sourceLines = uniqueStrings([
        ...(section.section_content || []).slice(0, 3),
        ...(subsection?.subsection_content || []).slice(0, 2),
    ]);
    const pyqLine = pyqContext?.snippets?.[index % (pyqContext.snippets.length || 1)]?.excerpt || "";
    const basePrompt = sourceLines.slice(0, 2).join(" ").trim();
    const prompt = basePrompt
        ? `With reference to ${chapterName || "this chapter"}, consider the following idea: ${basePrompt}`
        : pyqLine
            ? `With reference to ${chapterName || section.section_name}, consider the PYQ-style issue: ${pyqLine.slice(0, 180)}`
            : `With reference to ${chapterName || section.section_name}, identify the most relevant concept.`;

    const distractors = sections
        .map((item) => item.section_name)
        .filter((name) => name && name !== section.section_name)
        .slice(0, 3);

    const optionTexts = [section.section_name, ...distractors].slice(0, 4);
    while (optionTexts.length < 4) {
        optionTexts.push(`Option ${String.fromCharCode(65 + optionTexts.length)}`);
    }

    return {
        number: index + 1,
        prompt,
        subject: chapterName || section.section_name,
        difficulty: "Medium",
        sectionId: section._id,
        subsectionId: subsection?._id ? String(subsection._id) : "",
        options: optionTexts.map((text, optionIndex) => ({
            key: String.fromCharCode(65 + optionIndex),
            text,
        })),
        correctOption: "A",
        explanation: "The answer is taken from the chapter summary for this section.",
    };
};

const getChapterProgress = (user, chapterId) =>
    user?.chapterTestProgress?.find((progress) => String(progress.chapterId) === String(chapterId)) || null;

export const generateChapterTest = async (req, res) => {
    const { subjectId, chapterId } = req.params;

    const [chapter, subject, sections, recentTests] = await Promise.all([
        Chapters.findById(chapterId),
        Single_Subject.findById(subjectId),
        Sections.find({ subject_of_section: subjectId, chapter_of_section: chapterId }).sort({ order: 1 }),
        ChapterTest.find({ subjectId, chapterId }).sort({ createdAt: -1 }).limit(3).lean(),
    ]);

    if (!chapter || !subject) {
        return res.status(404).json({ message: "Chapter or subject not found" });
    }

    if (sections.length === 0) {
        return res.status(400).json({ message: "No sections found for this chapter" });
    }

    try {
        const pyqContext = await retrieveRelevantPyqContext({
            subjectName: subject.subject_name,
            chapterName: chapter.chapter_name,
            sections,
        });

        const generated = await generateChapterTestFromPrompt(
            buildChapterPrompt({
                subjectName: subject.subject_name,
                chapterName: chapter.chapter_name,
                sections,
                pyqContext,
                recentTests,
            })
        );

        const sanitizedQuestions = (generated?.questions || [])
            .map((question, index) => sanitizeQuestion(question, sections, index))
            .filter(Boolean);

        const mappedSectionIds = new Set(sanitizedQuestions.map((question) => String(question.sectionId)));
        const fallbackQuestions = sections
            .filter((section) => !mappedSectionIds.has(String(section._id)))
            .map((section, index) =>
                buildFallbackQuestion(
                    section,
                    sanitizedQuestions.length + index,
                    sections,
                    chapter.chapter_name,
                    pyqContext
                )
            );

        const questions = [...sanitizedQuestions, ...fallbackQuestions];

        const test = await ChapterTest.create({
            createdBy: req.user?._id && req.user._id !== "admin" ? req.user._id : null,
            chapterId,
            subjectId,
            title: generated?.title || `${chapter.chapter_name} Test`,
            description: generated?.description || `AI-generated test for ${chapter.chapter_name}`,
            durationMinutes: generated?.durationMinutes || Math.max(10, questions.length * 2),
            totalMarks: questions.length,
            instructions:
                generated?.instructions?.length
                    ? generated.instructions
                    : [
                        "Each question has one correct answer.",
                        "Use chapter summaries and subsection summaries to solve the paper.",
                        "Review the AI notes after submission to strengthen weak topics.",
                    ],
            questions,
        });

        return res.status(201).json({
            _id: test._id,
            title: test.title,
            description: test.description,
            durationMinutes: test.durationMinutes,
            totalMarks: test.totalMarks,
            totalQuestions: test.questions.length,
            instructions: test.instructions,
            createdAt: test.createdAt,
        });
    } catch (error) {
        return res.status(502).json({
            message: error.message || "Failed to generate chapter test",
        });
    }
};

export const listChapterTests = async (req, res) => {
    const { subjectId, chapterId } = req.params;

    const tests = await ChapterTest.find({ subjectId, chapterId })
        .sort({ createdAt: -1 })
        .select("title description durationMinutes totalMarks questions instructions createdAt")
        .lean();

    return res.json(
        tests.map((test) => ({
            _id: test._id,
            title: test.title,
            description: test.description,
            durationMinutes: test.durationMinutes,
            totalMarks: test.totalMarks,
            totalQuestions: test.questions.length,
            instructions: test.instructions,
            createdAt: test.createdAt,
        }))
    );
};

export const getChapterTestById = async (req, res) => {
    const { subjectId, chapterId, testId } = req.params;

    const test = await ChapterTest.findOne({ _id: testId, subjectId, chapterId }).lean();
    if (!test) {
        return res.status(404).json({ message: "Test not found" });
    }

    return res.json({
        _id: test._id,
        title: test.title,
        description: test.description,
        durationMinutes: test.durationMinutes,
        totalMarks: test.totalMarks,
        totalQuestions: test.questions.length,
        instructions: test.instructions,
        questions: test.questions.map((question) => ({
            _id: question._id,
            number: question.number,
            prompt: question.prompt,
            subject: question.subject,
            difficulty: question.difficulty,
            options: question.options,
            sectionId: question.sectionId,
            subsectionId: question.subsectionId || "",
        })),
    });
};

export const submitChapterTestAttempt = async (req, res) => {
    const { subjectId, chapterId, testId } = req.params;
    const { candidateName, answers } = req.body;

    const test = await ChapterTest.findOne({ _id: testId, subjectId, chapterId });
    if (!test) {
        return res.status(404).json({ message: "Test not found" });
    }

    const payloadAnswers = Array.isArray(answers) ? answers : [];
    const evaluation = evaluateChapterTest(test, payloadAnswers);

    const submission = await ChapterTestSubmission.create({
        testId: test._id,
        chapterId,
        subjectId,
        userId: req.user?._id && req.user._id !== "admin" ? req.user._id : null,
        candidateName: candidateName?.trim() || "Guest Candidate",
        answers: payloadAnswers,
        score: evaluation.score,
        summary: evaluation.summary,
        wrongSectionIds: evaluation.wrongSectionIds,
        wrongSubsectionIds: evaluation.wrongSubsectionIds,
        evaluatedAnswers: evaluation.evaluatedAnswers,
    });

    if (req.user?._id && req.user._id !== "admin") {
        const user = await User.findById(req.user._id);
        if (user) {
            const progress = getChapterProgress(user, chapterId);
            if (progress) {
                progress.wrongSectionIds = evaluation.wrongSectionIds;
                progress.wrongSubsectionIds = evaluation.wrongSubsectionIds;
                progress.lastSubmittedAt = new Date();
            } else {
                user.chapterTestProgress.push({
                    chapterId,
                    wrongSectionIds: evaluation.wrongSectionIds,
                    wrongSubsectionIds: evaluation.wrongSubsectionIds,
                    generatedQuestions: [],
                    lastSubmittedAt: new Date(),
                });
            }
            await user.save();
        }
    }

    return res.status(201).json({
        submissionId: submission._id,
        testId: test._id,
        candidateName: submission.candidateName,
        score: submission.score,
        summary: submission.summary,
        submittedAt: submission.createdAt,
        wrongSectionIds: evaluation.wrongSectionIds,
        wrongSubsectionIds: evaluation.wrongSubsectionIds,
    });
};

export const listChapterSubmissions = async (req, res) => {
    const { subjectId, chapterId } = req.params;
    const candidateName = req.query.candidateName?.trim();

    const filter = { subjectId, chapterId };
    if (candidateName) {
        filter.candidateName = candidateName;
    }

    const submissions = await ChapterTestSubmission.find(filter)
        .sort({ createdAt: -1 })
        .populate("testId", "title totalMarks durationMinutes")
        .lean();

    return res.json(
        submissions.map((submission) => ({
            _id: submission._id,
        candidateName: submission.candidateName,
        score: submission.score,
        summary: submission.summary,
        submittedAt: submission.createdAt,
        test: submission.testId,
        wrongSubsectionIds: submission.wrongSubsectionIds,
    }))
    );
};

export const getChapterSubmissionById = async (req, res) => {
    const { subjectId, chapterId, submissionId } = req.params;

    const submission = await ChapterTestSubmission.findOne({
        _id: submissionId,
        subjectId,
        chapterId,
    })
        .populate("testId", "title totalMarks durationMinutes")
        .lean();

    if (!submission) {
        return res.status(404).json({ message: "Submission not found" });
    }

    return res.json({
        _id: submission._id,
        candidateName: submission.candidateName,
        score: submission.score,
        summary: submission.summary,
        submittedAt: submission.createdAt,
        test: submission.testId,
        wrongSectionIds: submission.wrongSectionIds,
        wrongSubsectionIds: submission.wrongSubsectionIds,
        evaluatedAnswers: submission.evaluatedAnswers,
    });
};

export const getChapterHighlights = async (req, res) => {
    const { chapterId } = req.params;

    if (!req.user?._id || req.user._id === "admin") {
        return res.json({ wrongSectionIds: [], wrongSubsectionIds: [] });
    }

    const user = await User.findById(req.user._id);
    const progress = getChapterProgress(user, chapterId);

    return res.json({
        wrongSectionIds: (progress?.wrongSectionIds || []).map((id) => String(id)),
        wrongSubsectionIds: progress?.wrongSubsectionIds || [],
    });
};

export const getUserChapterTestDashboard = async (req, res) => {
    if (!req.user?._id || req.user._id === "admin") {
        return res.json({ createdTests: [], submissions: [] });
    }

    const [createdTests, submissions] = await Promise.all([
        ChapterTest.find({ createdBy: req.user._id })
            .sort({ createdAt: -1 })
            .limit(24)
            .populate("chapterId", "chapter_name order")
            .populate({
                path: "subjectId",
                select: "subject_name class_of_subject",
                populate: {
                    path: "class_of_subject",
                    select: "class_name order",
                },
            })
            .lean(),
        ChapterTestSubmission.find({ userId: req.user._id })
            .sort({ createdAt: -1 })
            .limit(24)
            .populate({
                path: "testId",
                select: "title totalMarks durationMinutes chapterId subjectId createdAt",
                populate: [
                    { path: "chapterId", select: "chapter_name order" },
                    {
                        path: "subjectId",
                        select: "subject_name class_of_subject",
                        populate: {
                            path: "class_of_subject",
                            select: "class_name order",
                        },
                    },
                ],
            })
            .lean(),
    ]);

    return res.json({
        createdTests: createdTests.map((test) => ({
            _id: test._id,
            title: test.title,
            description: test.description,
            durationMinutes: test.durationMinutes,
            totalMarks: test.totalMarks,
            totalQuestions: test.questions?.length || 0,
            createdAt: test.createdAt,
            chapter: test.chapterId
                ? {
                    _id: test.chapterId._id,
                    chapter_name: test.chapterId.chapter_name,
                    order: test.chapterId.order,
                }
                : null,
            subject: test.subjectId
                ? {
                    _id: test.subjectId._id,
                    subject_name: test.subjectId.subject_name,
                }
                : null,
            classRoom: test.subjectId?.class_of_subject
                ? {
                    _id: test.subjectId.class_of_subject._id,
                    class_name: test.subjectId.class_of_subject.class_name,
                    order: test.subjectId.class_of_subject.order,
                }
                : null,
        })),
        submissions: submissions.map((submission) => ({
            _id: submission._id,
            candidateName: submission.candidateName,
            score: submission.score,
            summary: submission.summary,
            submittedAt: submission.createdAt,
            test: submission.testId
                ? {
                    _id: submission.testId._id,
                    title: submission.testId.title,
                    totalMarks: submission.testId.totalMarks,
                    durationMinutes: submission.testId.durationMinutes,
                }
                : null,
            chapter: submission.testId?.chapterId
                ? {
                    _id: submission.testId.chapterId._id,
                    chapter_name: submission.testId.chapterId.chapter_name,
                    order: submission.testId.chapterId.order,
                }
                : null,
            subject: submission.testId?.subjectId
                ? {
                    _id: submission.testId.subjectId._id,
                    subject_name: submission.testId.subjectId.subject_name,
                }
                : null,
            classRoom: submission.testId?.subjectId?.class_of_subject
                ? {
                    _id: submission.testId.subjectId.class_of_subject._id,
                    class_name: submission.testId.subjectId.class_of_subject.class_name,
                    order: submission.testId.subjectId.class_of_subject.order,
                }
                : null,
        })),
    });
};

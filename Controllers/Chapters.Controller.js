import { ExpressError } from "../Middlewares/ExpressError.js";
import { Chapters } from "../Models/Chapter.Models.js";
import { Sections } from "../Models/Section.Models.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";
import { Subjects } from "../Models/Subjects.Models.js";
import { User } from "../Models/User.Models.js";
import { generateChapterTestFromPrompt } from "../Services/ChapterTestAI.Service.js";

const buildQuestionPrompt = (section) => {
    const subsectionContent = (section?.subsections || [])
        .flatMap((subsection) => subsection?.subsection_content || [])
        .filter(Boolean);
    const sourceContent = section?.section_content?.length
        ? section.section_content
        : subsectionContent;
    const promptLines = sourceContent.slice(0, 3);

    return promptLines.length
        ? promptLines.join(" ")
        : `Identify the correct section for "${section?.section_name}".`;
};

const shuffleOptions = (options = []) => {
    const cloned = [...options];

    for (let index = cloned.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [cloned[index], cloned[swapIndex]] = [cloned[swapIndex], cloned[index]];
    }

    return cloned;
};

const buildChapterQuestions = (sections = []) => {
    const sectionNames = sections.map((section) => section.section_name).filter(Boolean);

    return sections.map((section, index) => {
        const distractors = sectionNames
            .filter((name) => name !== section.section_name)
            .slice(0, 3);
        const options = shuffleOptions([section.section_name, ...distractors]);

        return {
            questionId: section._id,
            sectionId: section._id,
            order: index + 1,
            prompt: buildQuestionPrompt(section),
            options,
        };
    });
};

const buildSectionContext = (section) => {
    const sectionContent = (section?.section_content || []).filter(Boolean);
    const subsectionBlocks = (section?.subsections || []).map((subsection) => ({
        subsectionName: subsection?.subsection_name || "",
        summaryPoints: (subsection?.subsection_content || []).filter(Boolean).slice(0, 4),
    }));

    return {
        sectionId: String(section._id),
        sectionName: section.section_name,
        sectionSummary: sectionContent.slice(0, 4),
        subsectionSummaries: subsectionBlocks,
    };
};

const buildChapterTestPrompt = ({ subjectName = "", chapterName = "", sections = [] }) => {
    const sectionPayload = sections.map(buildSectionContext);

    return [
        `Subject: ${subjectName || "Unknown Subject"}`,
        `Chapter: ${chapterName || "Untitled Chapter"}`,
        "Create a revision test using the chapter content below.",
        "Use the section summaries and subsection summaries as extra context in each prompt and explanation.",
        "Return one question for every section and keep the correct answer tied to that exact section.",
        `Sections JSON: ${JSON.stringify(sectionPayload)}`,
    ].join("\n");
};

const sanitizeGeneratedQuestions = (generatedQuestions = [], sections = []) => {
    const sectionMap = new Map(sections.map((section) => [String(section._id), section]));
    const fallbackQuestions = buildChapterQuestions(sections).map((question) => ({
        ...question,
        correctAnswer: sections.find((section) => String(section._id) === String(question.sectionId))?.section_name || "",
        explanation: "",
    }));

    const sanitized = generatedQuestions
        .map((question, index) => {
            const section = sectionMap.get(String(question?.sectionId));
            if (!section) return null;

            const optionTexts = Array.isArray(question?.options)
                ? question.options.map((option) => String(option?.text || option).trim()).filter(Boolean)
                : [];

            const normalizedOptions = Array.from(new Set(optionTexts));
            if (!normalizedOptions.includes(section.section_name)) {
                normalizedOptions.unshift(section.section_name);
            }

            while (normalizedOptions.length < 4) {
                const fallbackSectionName = sections
                    .map((item) => item.section_name)
                    .find((name) => name && !normalizedOptions.includes(name));

                if (!fallbackSectionName) break;
                normalizedOptions.push(fallbackSectionName);
            }

            const trimmedOptions = normalizedOptions.slice(0, 4);

            if (trimmedOptions.length !== 4) return null;

            return {
                questionId: `${section._id}-${index + 1}`,
                sectionId: String(section._id),
                order: index + 1,
                prompt: String(question?.prompt || buildQuestionPrompt(section)).trim(),
                options: trimmedOptions,
                correctAnswer: section.section_name,
                explanation: String(question?.explanation || "").trim(),
            };
        })
        .filter(Boolean);

    return sanitized.length === sections.length ? sanitized : fallbackQuestions;
};

const findChapterProgress = (user, chapterId) => {
    if (!user || !Array.isArray(user.chapterTestProgress)) return null;

    return (
        user.chapterTestProgress.find(
            (progress) => String(progress.chapterId) === String(chapterId)
        ) || null
    );
};

export const addChapters = async (req, res) => {
    const { subjectId} = req.params;
    const { chapters, classId } = req.body;
    const getSingleSubject = await Single_Subject.findById(subjectId);
    if (!getSingleSubject) return res.status(404).json({ msg: "Subject not found" });

    const normalizedChapters = (chapters || [])
        .map((chapter, index) => {
            if (typeof chapter === "string") {
                return {
                    chapter_name: chapter,
                    order: index + 1,
                };
            }

            return {
                chapter_name: chapter?.chapter_name || "",
                order: chapter?.order ?? index + 1,
            };
        })
        .filter((chapter) => chapter.chapter_name);

    if (normalizedChapters.length === 0) {
        return res.status(400).json({ msg: "At least one valid chapter is required" });
    }

    const newChapters = await Chapters.insertMany(
        normalizedChapters.map((chapter) => ({
            chapter_name: chapter.chapter_name,
            subject_of_chapter: subjectId,
            class_of_chapter: classId,
            order: chapter.order,
        }))
    );

    getSingleSubject.chapters.push(...newChapters.map((chapter) => chapter._id));
    await getSingleSubject.save();

    return res.status(201).json({
        msg: "Chapters added successfully",
        subject: getSingleSubject,
        chapters: newChapters,
    });
}
export const allChapters = async (req, res) => {
    // console.log("Subject id", req.params);
    const { subjectId } = req.params;
    // console.log("Subject id",subjectId);
    const subjectName = await Single_Subject.findById(subjectId);
    // console.log("subject name: ", subjectName.subject_name);
    const chaptersList = await Chapters.find({ subject_of_chapter: subjectId }).sort({order:1});
    // console.log("chaptersList: ", chaptersList);
    // console.log("classId: ", classId)
    // // const chaptersLists = await Single_Subject.findById(subjectId).populate("chapters");
    // console.log("addtions at")
    // const finalChapters = chaptersList.map(ch => ({
    //     ...ch.toObject(),
    //     class_of_chapter: classId,
    // }));
    // console.log("chapters controller: ", finalChapters)
    return res.status(200).json({
        chaptersList: chaptersList,
        chaptersCount: chaptersList.length,
        subjectName: subjectName,
    });
    // console.log(getSingleSubject);
}
export const singleChapters = async (req, res) => {
    const { chapterId } = req.params;
    const chapter = await Chapters.findById(chapterId);
    if (!chapter) return next(new ExpressError(404, "Chapter not found"));
    console.log("got the chapter in single chapter controller")
    return res.status(200).json({ chapter: chapter });
}
export const editChapters = async (req, res, next) => {
    const { chapterId } = req.params;
    const { chapterName , order} = req.body;
    const chapterToUpdate = await Chapters.findById(chapterId);
    if (!chapterToUpdate) return next(new ExpressError(404, "Chapter not found"));
    chapterToUpdate.chapter_name = chapterName || chapterToUpdate.chapter_name;
    chapterToUpdate.order = order || chapterToUpdate.order;
    await chapterToUpdate.save();
    return res.status(200).json({ msg: "Chapter updated successfully", chapter: chapterToUpdate });
}

export const getChapterTest = async (req, res, next) => {
    const { chapterId, subjectId } = req.params;
    const mode = String(req.query?.mode || "generate");

    const sections = await Sections.find({
        chapter_of_section: chapterId,
        subject_of_section: subjectId,
    }).sort({ order: 1 });

    if (sections.length === 0) {
        return res.status(200).json({
            questions: [],
            wrongSectionIds: [],
            chapterId,
        });
    }

    let wrongSectionIds = [];
    let storedQuestions = [];
    let user = null;

    if (req.user?._id && req.user._id !== "admin") {
        user = await User.findById(req.user._id);
        const progress = findChapterProgress(user, chapterId);
        wrongSectionIds = (progress?.wrongSectionIds || []).map((id) => String(id));
        storedQuestions = (progress?.generatedQuestions || []).map((question) => ({
            questionId: question.questionId,
            sectionId: String(question.sectionId),
            order: question.order,
            prompt: question.prompt,
            options: question.options,
            correctAnswer: question.correctAnswer,
            explanation: question.explanation,
        }));
    }

    if (mode === "status") {
        return res.status(200).json({
            questions: storedQuestions.map(({ correctAnswer, explanation, ...question }) => question),
            wrongSectionIds,
            chapterId,
        });
    }

    const chapter = await Chapters.findById(chapterId);
    const subject = await Single_Subject.findById(subjectId);

    let generatedQuestions = [];

    try {
        const generated = await generateChapterTestFromPrompt(
            buildChapterTestPrompt({
                subjectName: subject?.subject_name || "",
                chapterName: chapter?.chapter_name || "",
                sections,
            })
        );
        generatedQuestions = sanitizeGeneratedQuestions(generated?.questions || [], sections);
    } catch (error) {
        if (storedQuestions.length > 0) {
            generatedQuestions = storedQuestions;
        } else {
            return res.status(502).json({ msg: error.message || "Failed to generate chapter test" });
        }
    }

    if (user) {
        const progress = findChapterProgress(user, chapterId);

        if (progress) {
            progress.generatedQuestions = generatedQuestions;
        } else {
            user.chapterTestProgress.push({
                chapterId,
                wrongSectionIds: [],
                generatedQuestions,
                lastSubmittedAt: null,
            });
        }

        await user.save();
    }

    return res.status(200).json({
        questions: generatedQuestions.map(({ correctAnswer, explanation, ...question }) => question),
        wrongSectionIds,
        chapterId,
    });
};

export const submitChapterTest = async (req, res, next) => {
    const { chapterId, subjectId } = req.params;
    const { answers = [] } = req.body;
    const user = req.user?._id && req.user._id !== "admin"
        ? await User.findById(req.user._id)
        : null;
    const progress = findChapterProgress(user, chapterId);
    const generatedQuestions = (progress?.generatedQuestions || []).map((question) => ({
        questionId: question.questionId,
        sectionId: String(question.sectionId),
        order: question.order,
        prompt: question.prompt,
        options: question.options,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation,
    }));

    if (generatedQuestions.length === 0) {
        return res.status(400).json({ msg: "Generate the chapter test first" });
    }

    const answerMap = new Map(
        (Array.isArray(answers) ? answers : []).map((answer) => [
            String(answer?.sectionId),
            answer?.selectedAnswer || "",
        ])
    );

    const results = generatedQuestions.map((question) => {
        const selectedAnswer = answerMap.get(String(question.sectionId)) || "";
        const isCorrect = selectedAnswer === question.correctAnswer;

        return {
            questionId: question.questionId,
            sectionId: String(question.sectionId),
            order: question.order,
            prompt: question.prompt,
            selectedAnswer,
            correctAnswer: question.correctAnswer,
            isCorrect,
            explanation: question.explanation,
        };
    });

    const wrongSectionIds = results
        .filter((result) => !result.isCorrect)
        .map((result) => result.sectionId);

    if (user && progress) {
        progress.wrongSectionIds = wrongSectionIds;
        progress.lastSubmittedAt = new Date();
        await user.save();
    }

    return res.status(200).json({
        msg: "Chapter test submitted successfully",
        results,
        wrongSectionIds,
        score: results.filter((result) => result.isCorrect).length,
        totalQuestions: results.length,
    });
};
export const deleteChapters = async (req, res, next) => {
    const { chapterId } = req.params;
    const chapterToDelete = await Chapters.findById(chapterId);
    if (!chapterToDelete) return next(new ExpressError(404, "Chapter not found"));
    await Chapters.findByIdAndDelete(chapterId);
    await Sections.deleteMany({ chapter_of_section: chapterId });
    return res.status(200).json({ msg: "Chapter deleted successfully" });
}

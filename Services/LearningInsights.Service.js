import { ChapterTest } from "../Models/ChapterTest.Models.js";
import { ChapterTestSubmission } from "../Models/ChapterTestSubmission.Models.js";
import { Chapters } from "../Models/Chapter.Models.js";
import { Class } from "../Models/Class.Models.js";
import { Sections } from "../Models/Section.Models.js";
import { Single_Subject } from "../Models/Single_Subject.Models.js";
import { User } from "../Models/User.Models.js";

const DAY_MS = 24 * 60 * 60 * 1000;

const unique = (items = []) => Array.from(new Set(items.filter(Boolean)));

const startOfDay = (value) => {
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date;
};

const diffInDays = (left, right) =>
    Math.round((startOfDay(left).getTime() - startOfDay(right).getTime()) / DAY_MS);

const getSpacedRepetitionStage = (accuracy) => {
    if (accuracy >= 0.85) return { intervalDays: 7, label: "Locked in" };
    if (accuracy >= 0.7) return { intervalDays: 4, label: "Stabilising" };
    if (accuracy >= 0.5) return { intervalDays: 2, label: "Needs revision" };
    return { intervalDays: 1, label: "Critical review" };
};

const buildDailyGoals = (items = [], weakSectionLookup = new Map()) =>
    items.map((item, index) => {
        const weakestSectionNames = (item.wrongSectionIds || [])
            .map((sectionId) => weakSectionLookup.get(String(sectionId)))
            .filter(Boolean)
            .slice(0, 3);

        return {
            dayOffset: index,
            date: new Date(Date.now() + index * DAY_MS).toISOString(),
            chapterId: item.chapterId,
            chapterName: item.chapterName,
            subjectName: item.subjectName,
            masteryScore: item.masteryScore,
            revisionPrediction: item.nextReviewAt,
            goals: [
                `Review ${item.chapterName} for 25 minutes`,
                weakestSectionNames.length
                    ? `Rework weak sections: ${weakestSectionNames.join(", ")}`
                    : `Attempt a mixed recall quiz from ${item.chapterName}`,
                `Complete ${Math.max(4, Math.round(8 - item.masteryScore / 15))} retrieval questions`,
            ],
            quiz: {
                title: `${item.chapterName} booster`,
                prompts: weakestSectionNames.length
                    ? weakestSectionNames.map((name) => `Explain the core idea behind ${name}.`)
                    : [`Summarise the three highest-yield ideas from ${item.chapterName}.`],
            },
        };
    });

export async function buildStudentLearningDashboard(userId) {
    const [user, submissions, classes, subjects, chapters, sections] = await Promise.all([
        User.findById(userId).lean(),
        ChapterTestSubmission.find({ userId })
            .sort({ createdAt: -1 })
            .populate("chapterId", "chapter_name order")
            .populate("subjectId", "subject_name class_of_subject")
            .lean(),
        Class.find().select("_id class_name order").sort({ order: 1 }).lean(),
        Single_Subject.find().select("_id subject_name class_of_subject order chapters").sort({ order: 1 }).lean(),
        Chapters.find().select("_id chapter_name subject_of_chapter order sections").sort({ order: 1 }).lean(),
        Sections.find().select("_id section_name chapter_of_section order").sort({ order: 1 }).lean(),
    ]);

    const sectionLookup = new Map(sections.map((section) => [String(section._id), section.section_name]));
    const progressLookup = new Map(
        (user?.chapterTestProgress || []).map((progress) => [String(progress.chapterId), progress])
    );

    const chapterStatsMap = new Map();
    for (const submission of submissions) {
        const chapterId = String(submission.chapterId?._id || submission.chapterId);
        const current = chapterStatsMap.get(chapterId) || {
            chapterId,
            chapterName: submission.chapterId?.chapter_name || "Untitled Chapter",
            subjectName: submission.subjectId?.subject_name || "Untitled Subject",
            attempts: 0,
            totalScore: 0,
            totalQuestions: 0,
            lastScore: submission.score,
            lastSubmittedAt: submission.createdAt,
            wrongSectionIds: [],
        };

        const submissionQuestionCount =
            (submission.summary?.correct || 0) +
            (submission.summary?.incorrect || 0) +
            (submission.summary?.skipped || 0) +
            (submission.summary?.review || 0);
        current.attempts += 1;
        current.totalScore += submission.score || 0;
        current.totalQuestions += submissionQuestionCount;
        current.wrongSectionIds.push(...(submission.wrongSectionIds || []).map(String));
        if (new Date(submission.createdAt) > new Date(current.lastSubmittedAt)) {
            current.lastSubmittedAt = submission.createdAt;
            current.lastScore = submission.score;
        }
        chapterStatsMap.set(chapterId, current);
    }

    const chapterMastery = Array.from(chapterStatsMap.values()).map((item) => {
        const progress = progressLookup.get(item.chapterId);
        const denominator = Math.max(item.totalQuestions || 0, 1);
        const averageAccuracy = Math.min(1, item.totalScore / (item.attempts * denominator));
        const masteryScore = Math.round(
            progress?.masteryScore || Math.min(100, averageAccuracy * 100 + Math.min(item.attempts * 4, 20))
        );
        const stage = getSpacedRepetitionStage(averageAccuracy);
        const nextReviewAt = progress?.nextReviewAt || new Date(new Date(item.lastSubmittedAt).getTime() + stage.intervalDays * DAY_MS);

        return {
            ...item,
            masteryScore,
            averageAccuracy: Math.round(averageAccuracy * 100),
            weakSectionNames: unique(item.wrongSectionIds).map((id) => sectionLookup.get(String(id))).filter(Boolean),
            spacedRepetition: stage.label,
            nextReviewAt,
        };
    }).sort((left, right) => left.masteryScore - right.masteryScore);

    const dueReviews = chapterMastery.filter((item) => new Date(item.nextReviewAt) <= new Date());
    const streakDates = unique(submissions.map((item) => startOfDay(item.createdAt).toISOString().slice(0, 10))).sort().reverse();
    let streak = 0;
    for (let index = 0; index < streakDates.length; index += 1) {
        const expected = new Date();
        expected.setDate(expected.getDate() - index);
        if (streakDates[index] === startOfDay(expected).toISOString().slice(0, 10)) {
            streak += 1;
        } else {
            break;
        }
    }

    const studyPlanner = buildDailyGoals(
        [...dueReviews, ...chapterMastery.filter((item) => !dueReviews.includes(item))].slice(0, 5),
        sectionLookup
    );

    const curriculumMap = classes.map((classRoom) => {
        const classSubjects = subjects.filter((subject) => String(subject.class_of_subject) === String(classRoom._id));
        return {
            _id: classRoom._id,
            class_name: classRoom.class_name,
            subjects: classSubjects.map((subject) => {
                const subjectChapters = chapters.filter((chapter) => String(chapter.subject_of_chapter) === String(subject._id));
                return {
                    _id: subject._id,
                    subject_name: subject.subject_name,
                    chapters: subjectChapters.map((chapter) => {
                        const chapterSections = sections.filter((section) => String(section.chapter_of_section) === String(chapter._id));
                        const chapterTests = submissions.filter((submission) => String(submission.chapterId?._id || submission.chapterId) === String(chapter._id));
                        return {
                            _id: chapter._id,
                            chapter_name: chapter.chapter_name,
                            sections: chapterSections.map((section) => ({
                                _id: section._id,
                                section_name: section.section_name,
                            })),
                            tests: chapterTests.length,
                        };
                    }),
                };
            }),
        };
    });

    return {
        user: user ? { id: user._id, fullName: user.fullName || "", email: user.email } : null,
        overview: {
            totalAttempts: submissions.length,
            chaptersTracked: chapterMastery.length,
            dueReviews: dueReviews.length,
            streak,
        },
        mastery: chapterMastery,
        dueReviews: dueReviews.slice(0, 8),
        recentSubmissions: submissions.slice(0, 8).map((submission) => ({
            _id: submission._id,
            chapterName: submission.chapterId?.chapter_name || "Untitled Chapter",
            subjectName: submission.subjectId?.subject_name || "Untitled Subject",
            score: submission.score,
            summary: submission.summary,
            submittedAt: submission.createdAt,
        })),
        studyPlanner,
        curriculumMap,
    };
}

export async function buildTeacherAnalyticsDashboard() {
    const [submissions, classes, subjects, chapters, users, sections, tests] = await Promise.all([
        ChapterTestSubmission.find()
            .sort({ createdAt: -1 })
            .populate("chapterId", "chapter_name subject_of_chapter")
            .populate("subjectId", "subject_name class_of_subject")
            .populate("userId", "email fullName")
            .lean(),
        Class.find().select("_id class_name order").sort({ order: 1 }).lean(),
        Single_Subject.find().select("_id subject_name class_of_subject order").sort({ order: 1 }).lean(),
        Chapters.find().select("_id chapter_name subject_of_chapter order").sort({ order: 1 }).lean(),
        User.find().select("_id email fullName").lean(),
        Sections.find().select("_id section_name chapter_of_section order").sort({ order: 1 }).lean(),
        ChapterTest.find().select("_id chapterId").lean(),
    ]);

    const activeStudents = unique(submissions.map((submission) => String(submission.userId?._id || ""))).filter(Boolean).length;
    const chapterPerformance = chapters.map((chapter) => {
        const chapterSubmissions = submissions.filter(
            (submission) => String(submission.chapterId?._id || submission.chapterId) === String(chapter._id)
        );
        const attempts = chapterSubmissions.length;
        const totalQuestions = chapterSubmissions.reduce((sum, item) => {
            const summary = item.summary || {};
            return sum + (summary.correct || 0) + (summary.incorrect || 0) + (summary.skipped || 0) + (summary.review || 0);
        }, 0);
        const score = chapterSubmissions.reduce((sum, item) => sum + (item.score || 0), 0);
        const accuracy = totalQuestions ? Math.round((score / totalQuestions) * 100) : 0;
        const subject = subjects.find((item) => String(item._id) === String(chapter.subject_of_chapter));
        const classRoom = classes.find((item) => String(item._id) === String(subject?.class_of_subject));

        return {
            chapterId: chapter._id,
            chapterName: chapter.chapter_name,
            subjectName: subject?.subject_name || "Unknown Subject",
            className: classRoom?.class_name || "Unknown Class",
            attempts,
            accuracy,
        };
    }).sort((left, right) => left.accuracy - right.accuracy);

    const studentSnapshots = users.map((user) => {
        const studentSubmissions = submissions.filter((submission) => String(submission.userId?._id || "") === String(user._id));
        const totalQuestions = studentSubmissions.reduce((sum, item) => {
            const summary = item.summary || {};
            return sum + (summary.correct || 0) + (summary.incorrect || 0) + (summary.skipped || 0) + (summary.review || 0);
        }, 0);
        const score = studentSubmissions.reduce((sum, item) => sum + (item.score || 0), 0);
        return {
            userId: user._id,
            studentName: user.fullName || user.email,
            attempts: studentSubmissions.length,
            averageAccuracy: totalQuestions ? Math.round((score / totalQuestions) * 100) : 0,
            lastActiveAt: studentSubmissions[0]?.createdAt || null,
        };
    }).sort((left, right) => right.attempts - left.attempts);

    const curriculumMap = classes.map((classRoom) => {
        const classSubjects = subjects.filter((subject) => String(subject.class_of_subject) === String(classRoom._id));
        return {
            _id: classRoom._id,
            class_name: classRoom.class_name,
            subjects: classSubjects.map((subject) => {
                const subjectChapters = chapters.filter((chapter) => String(chapter.subject_of_chapter) === String(subject._id));
                return {
                    _id: subject._id,
                    subject_name: subject.subject_name,
                    chapters: subjectChapters.map((chapter) => ({
                        _id: chapter._id,
                        chapter_name: chapter.chapter_name,
                        sections: sections
                            .filter((section) => String(section.chapter_of_section) === String(chapter._id))
                            .map((section) => ({
                                _id: section._id,
                                section_name: section.section_name,
                            })),
                        tests: tests.filter((test) => String(test.chapterId) === String(chapter._id)).length,
                    })),
                };
            }),
        };
    });

    return {
        overview: {
            totalSubmissions: submissions.length,
            activeStudents,
            weakChapters: chapterPerformance.slice(0, 5),
        },
        chapterPerformance: chapterPerformance.slice(0, 20),
        studentSnapshots: studentSnapshots.slice(0, 20),
        curriculumMap,
    };
}

export async function buildProgressReportCsv({ userId, isAdmin = false }) {
    const dashboard = isAdmin
        ? await buildTeacherAnalyticsDashboard()
        : await buildStudentLearningDashboard(userId);

    const rows = isAdmin
        ? [
            ["chapter", "subject", "class", "attempts", "accuracy"],
            ...dashboard.chapterPerformance.map((item) => [
                item.chapterName,
                item.subjectName,
                item.className,
                item.attempts,
                `${item.accuracy}%`,
            ]),
        ]
        : [
            ["chapter", "subject", "masteryScore", "averageAccuracy", "nextReviewAt", "weakSections"],
            ...dashboard.mastery.map((item) => [
                item.chapterName,
                item.subjectName,
                item.masteryScore,
                `${item.averageAccuracy}%`,
                new Date(item.nextReviewAt).toISOString(),
                item.weakSectionNames.join(" | "),
            ]),
        ];

    return rows
        .map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(","))
        .join("\n");
}

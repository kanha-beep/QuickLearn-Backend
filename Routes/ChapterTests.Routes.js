import express from "express";
import { VerifyAuth } from "../Middlewares/VerifyAuth.js";
import { WrapAsync } from "../Middlewares/WrapAsync.js";
import {
    generateChapterTest,
    getChapterHighlights,
    getChapterSubmissionById,
    getChapterTestById,
    listChapterSubmissions,
    listChapterTests,
    submitChapterTestAttempt,
} from "../Controllers/ChapterTests.Controller.js";

const router = express.Router({ mergeParams: true });

router.get("/highlights", VerifyAuth, WrapAsync(getChapterHighlights));
router.get("/", VerifyAuth, WrapAsync(listChapterTests));
router.post("/generate", VerifyAuth, WrapAsync(generateChapterTest));
router.get("/submissions", VerifyAuth, WrapAsync(listChapterSubmissions));
router.get("/submissions/:submissionId", VerifyAuth, WrapAsync(getChapterSubmissionById));
router.get("/:testId", VerifyAuth, WrapAsync(getChapterTestById));
router.post("/:testId/submissions", VerifyAuth, WrapAsync(submitChapterTestAttempt));

export default router;

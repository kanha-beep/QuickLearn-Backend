import express from "express";
import {
    downloadProgressReport,
    getStudentLearningDashboard,
    getTeacherAnalyticsDashboard,
    getUserChapterTestDashboard,
} from "../Controllers/ChapterTests.Controller.js";
import { IsRole } from "../Middlewares/IsRole.js";
import { VerifyAuth } from "../Middlewares/VerifyAuth.js";
import { WrapAsync } from "../Middlewares/WrapAsync.js";

const router = express.Router();

router.get("/chapter-tests", VerifyAuth, WrapAsync(getUserChapterTestDashboard));
router.get("/learning-dashboard", VerifyAuth, WrapAsync(getStudentLearningDashboard));
router.get("/reports/progress.csv", VerifyAuth, WrapAsync(downloadProgressReport));
router.get("/teacher-analytics", VerifyAuth, IsRole("admin"), WrapAsync(getTeacherAnalyticsDashboard));

export default router;

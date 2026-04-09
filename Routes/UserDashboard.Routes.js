import express from "express";
import { getUserChapterTestDashboard } from "../Controllers/ChapterTests.Controller.js";
import { VerifyAuth } from "../Middlewares/VerifyAuth.js";
import { WrapAsync } from "../Middlewares/WrapAsync.js";

const router = express.Router();

router.get("/chapter-tests", VerifyAuth, WrapAsync(getUserChapterTestDashboard));

export default router;

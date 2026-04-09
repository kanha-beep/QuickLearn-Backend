import express from "express"
import { addChapters, allChapters, deleteChapters, editChapters, getChapterTest, singleChapters, submitChapterTest } from "../Controllers/Chapters.Controller.js"
// /api/subjects/:subjectId/chapters/
import { IsRole } from "../Middlewares/IsRole.js"
import { VerifyAuth } from "../Middlewares/VerifyAuth.js"
import { WrapAsync } from "../Middlewares/WrapAsync.js"
const router = express.Router({ mergeParams: true })
router.get("/",WrapAsync(allChapters))
router.post("/add-chapters",  WrapAsync(addChapters))
router.get("/:chapterId/test", VerifyAuth, WrapAsync(getChapterTest))
router.post("/:chapterId/test/submit", VerifyAuth, WrapAsync(submitChapterTest))
router.get("/:chapterId", WrapAsync(singleChapters))
router.patch("/:chapterId/edit",  WrapAsync(editChapters))
router.delete("/:chapterId/delete",  WrapAsync(deleteChapters))
export default router

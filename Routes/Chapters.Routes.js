import express from "express"
import { addChapters, allChapters, deleteChapters, editChapters, singleChapters } from "../Controllers/Chapters.Controller.js"
// /api/subjects/:subjectId/chapters/
import { WrapAsync } from "../Middlewares/WrapAsync.js"
const router = express.Router({ mergeParams: true })
router.get("/", WrapAsync(allChapters))
router.post("/add-chapters", WrapAsync(addChapters))
router.get("/:chapterId", WrapAsync(singleChapters))
router.patch("/:chapterId/edit", WrapAsync(editChapters))
router.delete("/:chapterId/delete", WrapAsync(deleteChapters))
export default router
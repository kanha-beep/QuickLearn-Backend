import express from "express"
import { WrapAsync } from "../Middlewares/WrapAsync.js"
import { addSections, allSections, deleteSingleSections, editSingleSections, singleSections } from "../Controllers/Sections.Controller.js"
// /api/subjects
const router = express.Router()
// router.get("/", (req, res), WrapAsync(allSingleSubjects))
// router.post("/add-single-subjects", (req, res), WrapAsync(addSingleSubjects))
//edit the name of single subject
router.get("/:subjectId/chapters/:chapterId/sections",  WrapAsync(allSections))
router.post("/:subjectId/chapters/:chapterId/sections/add-section",  WrapAsync(addSections))
router.get("/:subjectId/chapters/:chapterId/sections/:sectionId",  WrapAsync(singleSections))
router.patch("/:subjectId/chapters/:chapterId/sections/:sectionId/edit",  WrapAsync(editSingleSections))
router.delete("/:subjectId/chapters/:chapterId/sections/:sectionId/delete",  WrapAsync(deleteSingleSections))
export default router
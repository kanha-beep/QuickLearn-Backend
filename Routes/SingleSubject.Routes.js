import express from "express"
import { WrapAsync } from "../Middlewares/WrapAsync.js"
import { singleSubject, deleteSingleSubjects, editSingleSubjects } from "../Controllers/SingleSubjects.Controller.js"
// /api/subjects
const router = express.Router()
router.get("/subjectId", WrapAsync(singleSubject))
router.patch("/subjectId/edit", WrapAsync(editSingleSubjects))
router.delete("/subjectId/delete",  WrapAsync(deleteSingleSubjects))
export default router
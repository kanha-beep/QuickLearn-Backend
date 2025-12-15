import { addSubjects, allSubjects } from "../Controllers/Subjects.Controller.js"
import express from "express"
import { WrapAsync } from "../Middlewares/WrapAsync.js"
// /api/subjects
const router = express.Router()
router.get("/", WrapAsync(allSubjects))
router.post("/add-subjects", WrapAsync(addSubjects))
// router.patch("/edit-subjects",   editSubjects)
// router.delete("/delete-subjects",   deleteSubjects)
export default router
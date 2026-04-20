import { addSubjects, allSubjects } from "../Controllers/Subjects.Controller.js"
import express from "express"
import { WrapAsync } from "../Middlewares/WrapAsync.js"
import { IsRole } from "../Middlewares/IsRole.js";
import { VerifyAuth } from "../Middlewares/VerifyAuth.js";
// /api/subjects
const router = express.Router()
router.get("/", WrapAsync(allSubjects))
router.post("/:classId/add-subjects", VerifyAuth, IsRole("admin"), WrapAsync(addSubjects))
// router.patch("/edit-subjects",   editSubjects)
// router.delete("/delete-subjects",   deleteSubjects)
export default router

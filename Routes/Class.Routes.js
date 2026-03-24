import express from "express"
const router = express.Router()
// /api/class
import { getAllClasses,addClasses } from "../Controllers/Class.Controller.js"
import { WrapAsync } from "../Middlewares/WrapAsync.js"
router.get("/",WrapAsync(getAllClasses))
router.post("/add-class", WrapAsync(addClasses))
export default router
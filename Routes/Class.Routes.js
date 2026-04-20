import express from "express"
const router = express.Router()
// /api/class
import { getAllClasses,addClasses } from "../Controllers/Class.Controller.js"
import { WrapAsync } from "../Middlewares/WrapAsync.js"
import { IsRole } from "../Middlewares/IsRole.js";
import { VerifyAuth } from "../Middlewares/VerifyAuth.js";
router.get("/",WrapAsync(getAllClasses))
router.post("/add-class", VerifyAuth, IsRole("admin"), WrapAsync(addClasses))
export default router

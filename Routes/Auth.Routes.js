import express from "express"
const router = express.Router()
import { CurrentUser, Login, Register, Logout } from "../Controllers/Auth.Controller.js"
import { WrapAsync } from "../Middlewares/WrapAsync.js";
import { VerifyAuth } from "../Middlewares/VerifyAuth.js";
// /api/auth
router.post("/register", WrapAsync(Register))
router.post("/login", WrapAsync(Login))
router.post("/logout", WrapAsync(Logout))
router.get("/me", VerifyAuth, WrapAsync(CurrentUser))
export default router

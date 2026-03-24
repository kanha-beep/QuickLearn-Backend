import express from "express"
const router = express.Router()
import { Login, Register, Logout } from "../Controllers/Auth.Controller.js"
import { WrapAsync } from "../Middlewares/WrapAsync.js";
// /api/auth
router.post("/register", WrapAsync(Register))
router.post("/login", WrapAsync(Login))
router.post("/logout", WrapAsync(Logout))
export default router
import express from "express";
import { submitComplaint } from "../Controllers/Contact.Controller.js";
import { WrapAsync } from "../Middlewares/WrapAsync.js";

const router = express.Router();

router.post("/complaints", WrapAsync(submitComplaint));

export default router;

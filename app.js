import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./init/db.js"
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("public/uploads"));
app.use(express.static("public/uploads/subjects"));
import SubjectsRoutes from "./Routes/Subjects.Routes.js";
app.use("/api/subjects", SubjectsRoutes);
import ChaptersRoutes from "./Routes/Chapters.Routes.js";
app.use("/api/subjects/:subjectId/chapters",ChaptersRoutes );
import Single_SubjectsRoutes from "./Routes/SingleSubject.Routes.js";
app.use("/api/subjects", Single_SubjectsRoutes );
import SectionsRoutes from "./Routes/Sections.Routes.js";
app.use("/api/subjects", SectionsRoutes );
connectDB()
app.use((error, req, res, next) => {
    const { status = 500, msg = "Something went wrong" } = error
    res.status(status).json({ msg })
})
export default app;
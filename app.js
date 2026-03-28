import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import { connectDB } from "./init/db.js"
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());

const configuredOrigins = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

console.log("urls: ", configuredOrigins);

app.use(cors({
    origin: configuredOrigins,
    credentials: true
}))

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("public/uploads"));
app.use(express.static("public/uploads/subjects"));
import AuthRoutes from "./Routes/Auth.Routes.js";
app.use("/api/auth", AuthRoutes)
import ClassRoutes from "./Routes/Class.Routes.js";
app.use("/api/class", ClassRoutes);
import SubjectsRoutes from "./Routes/Subjects.Routes.js";
app.use("/api/subjects", SubjectsRoutes);
import ChaptersRoutes from "./Routes/Chapters.Routes.js";
app.use("/api/subjects/:subjectId/chapters", ChaptersRoutes);
// import Single_SubjectsRoutes from "./Routes/SingleSubject.Routes.js";
// app.use("/api/subjects", Single_SubjectsRoutes );
import SectionsRoutes from "./Routes/Sections.Routes.js";
app.use("/api/subjects", SectionsRoutes);
connectDB()
app.use((error, req, res, next) => {
    const { status = 500, msg = "Something went wrong" } = error
    res.status(status).json({ msg })
})
export default app;

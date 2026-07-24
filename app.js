import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import { connectDB } from "./init/db.js"
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.set("trust proxy", 1);
app.use(express.json());

const configuredOrigins = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);

app.use(cors({
    origin(origin, callback) {
        if (!origin) {
            return callback(null, true);
        }

        if (configuredOrigins.includes(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true
}))
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
}));
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: Number(process.env.RATE_LIMIT_MAX || 300),
    standardHeaders: true,
    legacyHeaders: false,
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
import ChapterTestsRoutes from "./Routes/ChapterTests.Routes.js";
app.use("/api/subjects/:subjectId/chapters/:chapterId/tests", ChapterTestsRoutes);
import UserDashboardRoutes from "./Routes/UserDashboard.Routes.js";
app.use("/api/me", UserDashboardRoutes);
import ContactRoutes from "./Routes/Contact.Routes.js";
app.use("/api/contact", ContactRoutes);
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

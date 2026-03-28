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

const corsOptions = {
  origin(origin, callback) {
    if (!origin) return callback(null, true);

    const isConfigured = configuredOrigins.includes(origin);
    const isVercelPreview = /^https:\/\/([a-zA-Z0-9-]+\.)*vercel\.app$/.test(origin);

    if (isConfigured || isVercelPreview) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    cors(corsOptions)(req, res, () => {
      res.sendStatus(204);
    });
    return;
  }

  next();
});

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

import { ExpressError } from "../Middlewares/ExpressError.js";
import { Class } from "../Models/Class.Models.js"

export const getAllClasses = async (req, res, next) => {
    const getAllClasses = await Class.find({}).sort({ order: 1, class_name: 1 })
    // console.log("got all classes", getAllClasses)
    res.status(200).json({ getAllClasses })
}
export const addClasses = async (req, res, next) => {
    const order = Number(req.body.order ?? 0)
    const name = String(req.body.classes || "").trim()
    if (!name) return next(new ExpressError(400, "Missing class name"))
    if (Number.isNaN(order) || order < 0) return next(new ExpressError(400, "Invalid class order"))

    const existingClass = await Class.findOne({ class_name: name })
    if (existingClass) return next(new ExpressError(400, "Class already exists"))

    const newClass = await Class.create({ class_name: name, subjects: [] , order:order})
    // console.log("added class", newClass)
    res.status(201).json({ newClass })
}

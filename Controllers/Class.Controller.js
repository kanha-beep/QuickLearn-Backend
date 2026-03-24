import { Class } from "../Models/Class.Models.js"

export const getAllClasses = async (req, res, next) => {
    const getAllClasses = await Class.find({})
    // console.log("got all classes", getAllClasses)
    res.status(200).json({ getAllClasses })
}
export const addClasses = async (req, res, next) => {
    console.log("adding class", req.body)
    const order = req.body.order
    const name = req.body.classes
    if (!name) return next(new ExpressError(400, "Missing class name"))
    const newClass = await Class.create({ class_name: name, subjects: [] , order:order})
    // console.log("added class", newClass)
    res.status(201).json({ newClass })
}
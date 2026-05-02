import mongoose from "mongoose";

export const ContactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        subject: {
            type: String,
            required: true,
            trim: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        emailStatus: {
            type: String,
            enum: ["pending", "sent", "failed"],
            default: "pending",
        },
        emailError: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    },
);

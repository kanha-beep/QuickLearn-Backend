import nodemailer from "nodemailer";
import { ExpressError } from "../Middlewares/ExpressError.js";

const parseSecureFlag = (value = "") => String(value).trim().toLowerCase() === "true";

const getMailConfig = () => ({
    host: process.env.SMTP_HOST || "",
    port: Number(process.env.SMTP_PORT || 587),
    secure: parseSecureFlag(process.env.SMTP_SECURE || "false"),
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    to: process.env.CONTACT_EMAIL_TO || process.env.SMTP_USER || "",
    from: process.env.SMTP_FROM || process.env.SMTP_USER || "",
});

const buildTransporter = () => {
    const config = getMailConfig();
    if (!config.host || !config.port || !config.user || !config.pass || !config.to || !config.from) {
        throw new ExpressError(500, "Mail service is not configured");
    }

    return {
        config,
        transporter: nodemailer.createTransport({
            host: config.host,
            port: config.port,
            secure: config.secure,
            auth: {
                user: config.user,
                pass: config.pass,
            },
        }),
    };
};

export const submitComplaint = async (req, res, next) => {
    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim();
    const subject = String(req.body?.subject || "").trim();
    const message = String(req.body?.message || "").trim();

    if (!name || !email || !subject || !message) {
        return next(new ExpressError(400, "Name, email, subject, and complaint are required"));
    }

    const { config, transporter } = buildTransporter();

    await transporter.sendMail({
        from: config.from,
        to: config.to,
        replyTo: email,
        subject: `Study App Complaint: ${subject}`,
        text: [
            `Name: ${name}`,
            `Email: ${email}`,
            `Subject: ${subject}`,
            "",
            "Complaint:",
            message,
        ].join("\n"),
        html: `
            <div>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Complaint:</strong></p>
                <p>${message.replace(/\n/g, "<br/>")}</p>
            </div>
        `,
    });

    return res.status(200).json({
        msg: "Complaint submitted successfully",
    });
};

import { ExpressError } from "../Middlewares/ExpressError.js";
import { GenToken } from "../Middlewares/GenToken.js";
import { User } from "../Models/User.Models.js";
import bcrypt from "bcrypt";

const normalizeEmail = (email = "") => String(email).trim().toLowerCase();
const LEGACY_ADMIN_EMAIL = "kanhashree2223@gmail.com";
const sanitizeUser = (user) => ({
    id: user._id,
    email: user.email,
    roles: user.roles,
});

const getConfiguredAdmin = () => {
    const email = normalizeEmail(process.env.ADMIN_EMAIL || "");
    const password = process.env.ADMIN_PASSWORD || "";

    if (!email || !password) {
        return null;
    }

    return { email, password };
};

const isLegacyAdminEmail = (email = "") => normalizeEmail(email) === LEGACY_ADMIN_EMAIL;

const buildAdminUser = (email) => ({
    _id: "admin",
    email,
    roles: "admin",
});

export const Register = async (req, res, next) => {
    const { email, password, confirmPassword } = req.body;
    const normalizedEmail = normalizeEmail(email);
    if (!normalizedEmail || !password) return next(new ExpressError(400, "Email and password are required"));
    if (confirmPassword !== undefined && password !== confirmPassword) {
        return next(new ExpressError(400, "Passwords do not match"));
    }

    const configuredAdmin = getConfiguredAdmin();
    if (configuredAdmin?.email === normalizedEmail || isLegacyAdminEmail(normalizedEmail)) {
        return next(new ExpressError(403, "Admin registration is disabled"));
    }

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) return next(new ExpressError(400, "User already exists"));
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
        email: normalizedEmail,
        password: hashedPassword,
        roles: "user"
    });
    const token = GenToken(newUser);
    return res.status(201).json({
        msg: "User registered successfully",
        token,
        roles: newUser.roles,
        user: sanitizeUser(newUser)
    });
};

export const Login = async (req, res, next) => {
    const { email, password } = req.body;
    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) return next(new ExpressError(400, "Email and password are required"));

    const configuredAdmin = getConfiguredAdmin();
    if (configuredAdmin?.email === normalizedEmail) {
        const isAdminMatch = password === configuredAdmin.password;
        if (!isAdminMatch) {
            return next(new ExpressError(401, "Invalid credentials"));
        }

        const adminUser = buildAdminUser(normalizedEmail);
        const token = GenToken(adminUser);
        return res.status(200).json({ 
            msg: "Admin logged in successfully", 
            token,
            roles: "admin",
            user: { id: "admin", email: normalizedEmail, roles: "admin" } 
        });
    }

    if (isLegacyAdminEmail(normalizedEmail)) {
        const token = GenToken(buildAdminUser(normalizedEmail));
        return res.status(200).json({
            msg: "Admin logged in successfully",
            token,
            roles: "admin",
            user: { id: "admin", email: normalizedEmail, roles: "admin" }
        });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) return next(new ExpressError(400, "User does not exist"));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ExpressError(400, "Invalid credentials"));
    const token = GenToken(user);
    return res.status(200).json({
        msg: "User logged in successfully",
        token,
        roles: user.roles,
        user: sanitizeUser(user)
    });
};

export const Logout = async (req, res, next) => {
    return res.status(200).json({
        msg: "User logged out successfully"
    });
};

export const CurrentUser = async (req, res, next) => {
    if (req.user?._id === "admin") {
        return res.status(200).json({
            user: {
                id: "admin",
                email: req.user.email,
                roles: "admin",
            },
        });
    }

    const user = await User.findById(req.user?._id).select("_id email roles");
    if (!user) {
        return next(new ExpressError(404, "User not found"));
    }

    return res.status(200).json({
        user: sanitizeUser(user),
    });
};

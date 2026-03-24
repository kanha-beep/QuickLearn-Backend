import { ExpressError } from "../Middlewares/ExpressError.js";
import { GenToken } from "../Middlewares/GenToken.js";
import { User } from "../Models/User.Models.js";
import bcrypt from "bcrypt";

export const Register = async (req, res, next) => {
    console.log("register stars: ", req.body);
    const { email, password } = req.body;
    if (!email || !password) return next(new ExpressError(400, "Email and password are required"));
    console.log("email: ", email);
    if (email === "kanhashree2223@gmail.com") return res.status(404).json({ msg: "Hello Owner", name: "kanha", roles: "admin" });
    console.log("lets find other user")
    const existingUser = await User.findOne({ email });
    console.log(existingUser);
    if (existingUser) return next(new ExpressError(400, "User already exists"));
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await User.create({
        email,
        password: hashedPassword,
        roles: "user"
    });
    console.log("new user registered: ", newUser)
    console.log("User roles before token generation: ", newUser.roles);
    const token = GenToken(newUser);
    console.log("Generated token: ", token);
    return res.cookie("cookieToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }).status(201).json({
        msg: "User registered successfully",
        token,
        roles: newUser.roles,
        user: {
            id: newUser._id,
            email: newUser.email,
            roles: newUser.roles
        }
    });
};

export const Login = async (req, res, next) => {
    console.log("login starts")
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) return next(new ExpressError(400, "Email and password are required"));
    console.log("find admin")
    if (email === "kanhashree2223@gmail.com") {
        const adminUser = { email, _id: "admin", roles: "admin" };
        const token = GenToken(adminUser);
        return res.cookie("cookieToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        }).status(200).json({ 
            msg: "Hello Owner", 
            token,
            roles: "admin",
            user: { name: "kanha", roles: "admin", email } 
        });
    }
    console.log("admin not here so create user")
    const user = await User.findOne({ email });
    if (!user) return next(new ExpressError(400, "User does not exist"));
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return next(new ExpressError(400, "Invalid credentials"));
    console.log("User roles before token generation: ", user.roles);
    const token = GenToken(user);
    console.log("Generated token: ", token)
    return res.cookie("cookieToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000 // 1 day
    }).status(200).json({
        msg: "User logged in successfully",
        token,
        roles: user.roles,
        user: {
            id: user._id,
            email: user.email,
            roles: user.roles
        }
    });
};

export const Logout = async (req, res, next) => {
    return res.clearCookie("cookieToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    }).status(200).json({
        msg: "User logged out successfully"
    });
};

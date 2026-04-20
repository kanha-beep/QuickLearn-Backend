import jwt from 'jsonwebtoken';
import { ExpressError } from './ExpressError.js';

const extractToken = (req) => {
    const authHeader = req.headers.authorization || req.headers.Authorization || "";
    if (typeof authHeader === "string" && authHeader.startsWith("Bearer ")) {
        return authHeader.slice(7).trim();
    }

    return req.cookies?.cookieToken || "";
};

export const VerifyAuth = (req, res, next) => {
    try {
        const token = extractToken(req);
        
        if (!token) {
            return next(new ExpressError(401, "Access denied. No token provided."));
        }
        // console.log("Token: ", token);
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "study_key");
        // console.log("Decoded: ", decoded);
        req.user = decoded; // decoded contains {email, _id}
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return next(new ExpressError(401, "Invalid token"));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new ExpressError(401, "Token expired"));
        }
        return next(new ExpressError(500, "Token verification failed"));
    }
}

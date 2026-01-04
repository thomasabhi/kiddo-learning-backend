import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Define the shape of your JWT payload
interface JwtPayload {
    id: string;
    role: string;
}

export const adminOnly = async (req: any, res: Response, next: NextFunction) => {
    try {
        // 1. Get token from cookies
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false
            });
        }

        // 2. Verify the token
        const decode = await jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }

        // 3. Check if the user is an admin
        if (decode.role !== 'admin') {
            return res.status(403).json({
                message: "Access denied. Admins only.",
                success: false
            });
        }

        // 4. Attach user data to request and proceed
        // @ts-ignore (or extend Request type globally)
        req.id = decode.id;
        
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}
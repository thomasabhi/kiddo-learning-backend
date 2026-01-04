import { Admin } from "../models/admin.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { SignOptions } from "jsonwebtoken";

// createAdmin stays the same
export const createAdmin = async (req: any, res: Response) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      email,
      password: hashedPassword,
      role: "admin",
    });

    return res.status(201).json({ message: "Admin created", success: true, user: admin });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", success: false });
  }
};

// loginAdmin
export const loginAdmin = async (req: any, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required", success: false });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(401).json({ message: "Invalid credentials", success: false });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials", success: false });

    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");

    // Sign JWT — cast to string to satisfy TS
    const token = jwt.sign(
      { id: admin._id, email: admin.email, role: admin.role },
      secret as string, // ✅ cast secret to string
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d", // ✅ string is allowed
      } as SignOptions // ✅ cast to SignOptions
    );

    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: { id: admin._id, email: admin.email, role: admin.role },
    });
  } catch (error: any) {
    return res.status(500).json({ message: "Internal server error", success: false, error: error.message });
  }
};
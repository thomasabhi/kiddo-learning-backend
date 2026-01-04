import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import contentRoute from "./routes/content.routes";
import adminRoute from "./routes/admin.routes";
import { connectDB } from "./DB/config";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

/** * FIXED STATIC SERVING 
 * This line tells Express that the "uploads" folder is in the root.
 * process.cwd() ensures it finds the folder regardless of where the script runs.
 */
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use("/api/v1/user", adminRoute);
app.use("/api/v1/content", contentRoute);

// Simple Health Check
app.get("/", (req, res) => {
  res.send("Kiddo Learning Backend is Running! 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📁 Static files being served from: ${path.join(process.cwd(), 'uploads')}`);
});
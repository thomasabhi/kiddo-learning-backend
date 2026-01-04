import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import contentRoute from "./routes/content.routes";
import NodeCache from "node-cache";
import adminRoute from "./routes/admin.routes"

import { connectDB } from "./DB/config";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6000;

// TTL: 60 seconds by default
export const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Serve uploads folder
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
// Routes
app.use("/api/v1/user",adminRoute)
app.use("/api/v1/content", contentRoute);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

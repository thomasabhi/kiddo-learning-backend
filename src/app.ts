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

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// FIX: Allow all origins so your mobile app/emulator can connect
app.use(cors()); 

app.use(morgan("dev"));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use("/api/v1/user", adminRoute);
app.use("/api/v1/content", contentRoute);

app.get("/", (req, res) => {
  res.send("Kiddo Learning Backend is Running! 🚀");
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
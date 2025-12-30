import express from "express"
import dotenv from "dotenv"
import morgan from "morgan"
import { connectDB } from "./src/DB/config";
import contentRoute from "./src/routes/content.routes"
import cors from "cors"
import path from "path";

dotenv.config()

const app = express();

const port = process.env.PORT || 7003
connectDB()

// / Serve files in /uploads as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(cors({
    origin: "*",
    credentials: true
}))
app.use(morgan("dev"))

app.use("/api/v1/content",contentRoute)



app.listen(5000,'0.0.0.0', () => console.log('Server running on port 5000'));
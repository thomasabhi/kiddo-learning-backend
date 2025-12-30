
import mongoose from "mongoose";


export const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.DB_CONNECTION!)
        console.log("MongoDB connnected")
        
    } catch (error) {
        throw error
    }
}
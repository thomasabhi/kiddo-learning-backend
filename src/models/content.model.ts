import mongoose, { Schema, model, Document } from "mongoose";

export interface IContent extends Document {
  type: "letter" | "number" | "animal"  | "math" | "fruit" | "flower" | "vegtable";
  title: string;
  imageUrl?: string;
  soundUrl?: string;
  question?: string;
  options?: string[];
  correctAnswer?: string;
}

const ContentSchema = new Schema<IContent>({
  type: { type: String, enum: ["letter","number","animal","math","fruit","flower","vegetable"], required: true },
  title: { type: String, required: true },
  imageUrl: String,
  soundUrl: String,
  question: String,
  options: [String],
  correctAnswer: String
}, { timestamps: true });


export const Content = mongoose.model<IContent>("Content",ContentSchema)

import mongoose, { Schema, model, Document } from "mongoose";

export interface IContent extends Document {
  type: "letter" | "number" | "animal"  | "math" | "fruit" | "flower" | "vegtable |addition |subtraction |multiplication |division | bird |";
  title?: string;
  imageUrl?: string;
  soundUrl?: string;
  question?: string;
  options?: string[];
  correctAnswer?: string;
}

const ContentSchema = new Schema<IContent>({
  type: { type: String, enum: ["letter","number","animal","math","fruit","flower","vegetable","bird","addition","subtraction","multiplication","division"], required: true },
  title: { type: String, },
  imageUrl: String,
  soundUrl: String,
  question: String,
  options: [String],
  correctAnswer: String
}, { timestamps: true });


export const Content = mongoose.model<IContent>("Content",ContentSchema)

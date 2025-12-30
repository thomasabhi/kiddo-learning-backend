import { Request, Response } from "express";
import Content from "../models/content.model";
import router from "../routes/content.routes";



export const createContent = async (req: Request, res: Response) => {
  try {
    const { title, type, question, options, correctAnswer } = req.body;
    const imageUrl = req.files?.["image"] ? (req.files as any)["image"][0].path : undefined;
    const soundUrl = req.files?.["sound"] ? (req.files as any)["sound"][0].path : undefined;
    const animationUrl = req.files?.["animation"] ? (req.files as any)["animation"][0].path : undefined;

    const content = await Content.create({
      title,
      type,
      question,
      options,
      correctAnswer,
      imageUrl,
      soundUrl,
      animationUrl
    });

    res.status(201).json(content);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};


export const getContent = async (req: any, res: Response) => {
  try {
    const content = await Content.find({});

    // Group content by type
    const groupedContent = content.reduce((acc: any, item: any) => {
      const type = item.type; // "letter" | "number" | ...
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(item);
      return acc;
    }, {});

    return res.status(200).json({
      success: true,
      content: groupedContent,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
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




export const getContent = async (req: Request, res: Response) => {
  try {
    const { type, limit = 10, page = 1 } = req.query;

    const query: any = {};
    if (type) query.type = type;

    // Count total items
    const total = await Content.countDocuments(query);

    // Pagination
    const skip = (Number(page) - 1) * Number(limit);

    const items = await Content.find(query)
      .skip(skip)
      .limit(Number(limit));

    return res.status(200).json({
      success: true,
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
      content: items,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

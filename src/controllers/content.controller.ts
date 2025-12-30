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





export const getContents = async (req: any, res: Response) => {
  try {
    const type = req.query.type?.toString().toLowerCase();
    const limit = Number(req.query.limit ?? 10);
    const page = Number(req.query.page ?? 1);

    if (!type) {
      return res.status(400).json({ error: "Type query parameter is required" });
    }

    const query = { type };

    const total = await Content.countDocuments(query);
    const skip = (page - 1) * limit;

    const items = await Content.find(query)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      content: items,
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


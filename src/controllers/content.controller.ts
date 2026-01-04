import { Request, Response } from "express";
import { Content } from "../models/content.model";
import cloudinary from "cloudinary";
import {cache} from "../app";

// Cloudinary configuration
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

// CREATE CONTENT
export const createContent = async (req: Request, res: Response) => {
  try {
    const { title, type, question, options, correctAnswer } = req.body;

    let imageUrl, soundUrl, animationUrl;

    if (req.files?.["image"]) {
      const upload = await cloudinary.v2.uploader.upload(
        (req.files as any)["image"][0].path,
        { folder: "contents" }
      );
      imageUrl = upload.secure_url;
    }

    if (req.files?.["sound"]) {
      const upload = await cloudinary.v2.uploader.upload(
        (req.files as any)["sound"][0].path,
        { folder: "contents" }
      );
      soundUrl = upload.secure_url;
    }

    if (req.files?.["animation"]) {
      const upload = await cloudinary.v2.uploader.upload(
        (req.files as any)["animation"][0].path,
        { folder: "contents" }
      );
      animationUrl = upload.secure_url;
    }

    const content = await Content.create({
      title,
      type,
      question,
      options,
      correctAnswer,
      imageUrl,
      soundUrl
    });

    // CENTRALIZED CACHE INVALIDATION: remove all cached pages for this type
    const keys = cache
      .keys()
      .filter((key:any) => key.startsWith(`cache:/contents?type=${type}`));
    keys.forEach((key:any) => cache.del(key));

    res.status(201).json(content);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};

// GET CONTENTS — clean controller, caching handled by middleware
export const getContents = async (req: any, res: Response) => {
  try {
    const type = req.query.type?.toString().toLowerCase();
    const limit = Number(req.query.limit ?? 10);
    const page = Number(req.query.page ?? 1);

    if (!type) return res.status(400).json({ error: "Type query parameter is required" });

    const query = { type };
    const total = await Content.countDocuments(query);
    const skip = (page - 1) * limit;
    const items = await Content.find(query).skip(skip).limit(limit);

    const response = {
      success: true,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      content: items,
    };

    res.status(200).json(response);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
};




export const getContent = async(req:any,res:Response) => {
  try {

    const content = await Content.find({
      
    });
    if(!content){
      return res.status(404).json({
        message: "Content not found",
        success: false
      })
    }

    return res.status(200).json({
      success: true,
      content
    })

    
  } catch (error) {
     res.status(400).json({ error});
  }
}
import multer from "multer";
import path from "path";



declare module "express" {
  export interface Request {
    files?: {
      [fieldname: string]: Express.Multer.File[];
    };
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

export const upload = multer({ storage });

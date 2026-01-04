import express from "express";
import { upload } from "../middleware/multer,middleware";
import { getContent, getContents } from "../controllers/content.controller";
import { adminOnly } from "../middleware/auth.middleware";

const router = express.Router();


router.route("/").get(getContents);
router.route("/").post(adminOnly,upload.fields([
    {
        name: "image",
        maxCount: 1
    },
    {
        name: "sound",
        maxCount: 1
    },
    {
        name: "animate",
        maxCount: 1
    }
    
]))

router.route("/").get(adminOnly,getContent)

export default router
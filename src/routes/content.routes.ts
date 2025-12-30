import express from "express";
// import { getContent } from "../controllers/content.controller";
import { upload } from "../middleware/multer,middleware";
import { getContent } from "../controllers/content.controller";

const router = express.Router();


router.route("/").get(getContent);
router.route("/").post(upload.fields([
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


export default router
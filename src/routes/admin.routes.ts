import { Router } from "express";
import { createAdmin } from "../controllers/admin.controller";
import { loginAdmin } from "../controllers/admin.controller";

const router = Router();

router.post("/create", createAdmin); // create admin
router.post("/login", loginAdmin);   // admin login

export default router;

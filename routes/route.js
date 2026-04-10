import {Router} from "express";
import { classifyName } from "../controllers/controller.js";

const router = Router();

//Define routes
router.get("/classify", classifyName);

export default router
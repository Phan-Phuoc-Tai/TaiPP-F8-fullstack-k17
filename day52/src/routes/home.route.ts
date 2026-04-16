import express from "express";
import { homeController } from "../controllers/home.controller";
import { authMiddleware } from "../middlewares/auth.middlewares";

const router = express.Router();

router.get("/", authMiddleware, homeController.index);

export default router;

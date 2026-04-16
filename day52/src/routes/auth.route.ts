import express from "express";
import { authController } from "../controllers/auth.controller";

const router = express.Router();

router.get("/login", authController.index);
router.get("/auth/google", authController.googleRedirect);
router.get("/auth/google/callback", authController.googleCallback);
router.post("/logout", authController.logout);
export default router;

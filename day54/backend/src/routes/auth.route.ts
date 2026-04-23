import express from "express";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { authController } from "../controllers/auth.controller";
import {
  authLoginSchema,
  authRegisterSchema,
} from "../validators/auth.validator";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.post(
  "/register",
  validateMiddleware(authRegisterSchema),
  authController.register,
);
router.post(
  "/login",
  validateMiddleware(authLoginSchema),
  authController.login,
);
// router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authMiddleware, authController.logout);
export default router;

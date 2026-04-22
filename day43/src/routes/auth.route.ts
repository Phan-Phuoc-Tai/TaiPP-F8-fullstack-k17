import express from "express";
import { validateMiddleware } from "../middlewares/validate.middleware";
import { loginUserSchema, registerUserSchema } from "../schemas/auth.schema";
import { authController } from "../controllers/auth.controller";

const router = express.Router();

router.post(
  "/register",
  validateMiddleware(registerUserSchema),
  authController.register,
);

router.post(
  "/login",
  validateMiddleware(loginUserSchema),
  authController.login,
);

export default router;

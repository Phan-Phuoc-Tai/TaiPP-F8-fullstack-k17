import express from "express";
import { postController } from "../controllers/post.controller";
import { postMiddleware } from "../middlewares/post.middleware";

const router = express.Router();

router.post("/posts", postMiddleware, postController.create);
router.get("/posts", postController.findAll);
router.get("/posts/:id", postController.find);
router.put("/posts/:id", postMiddleware, postController.update);
router.delete("/posts/:id", postController.delete);
export default router;

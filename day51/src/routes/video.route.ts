import express from "express";
import { videoController } from "../controllers/video.controller";
import { videoMiddleware } from "../middlewares/video.middleware";
import { videoValidate } from "../validators/video.validate";

const route = express.Router();

route.post("/videos", videoMiddleware(videoValidate), videoController.create);

export default route;

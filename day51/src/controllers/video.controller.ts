import { Request, Response } from "express";
import { videoService } from "../services/video.service";
import { successResponse } from "../utils/response";
import { QUEUEJOB } from "../constants/queue.constant";
import { videoQueue } from "../queue/video.queue";

export const videoController = {
  create: async (request: Request, response: Response) => {
    const { url } = request.body;
    const video = await videoService.create(url);
    await videoQueue.add(QUEUEJOB.GET_INFO_VIDEO, {
      id: video.id,
    });
    successResponse(response, `Create video success`, video, 201);
  },
};

import { Job, Worker } from "bullmq";
import { QUEUE, QUEUEJOB } from "../constants/queue.constant";
import { redisWorkerConnection } from "../utils/bullmq";
import { videoService } from "../services/video.service";

new Worker(
  QUEUE.VIDEO,
  async (job: Job) => {
    if (job.name === QUEUEJOB.GET_INFO_VIDEO) {
      const { id } = job.data;
      if (!id) {
        const videos = await videoService.findAll();
        console.log(videos);

        videos.map(async (video) => {
          await videoService.updateInfo(video.id);
        });
      }
      await videoService.updateInfo(id);
    }
  },
  {
    connection: redisWorkerConnection!,
  },
);

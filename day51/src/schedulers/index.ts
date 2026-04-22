import "dotenv/config";
import { QUEUEJOB } from "../constants/queue.constant";
import { videoQueue } from "../queue/video.queue";
videoQueue.upsertJobScheduler(
  QUEUEJOB.INFO_VIDEO,
  {
    pattern: "* * * * *",
  },
  {
    name: QUEUEJOB.GET_INFO_VIDEO,
  },
);

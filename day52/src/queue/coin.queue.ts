import { Queue } from "bullmq";
import { COIN } from "../constants/coin.constant";
import { redisQueueConnection } from "../utils/bullmq";

export const coinQueue = new Queue(COIN.PRICE, {
  connection: redisQueueConnection!,
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
  },
});

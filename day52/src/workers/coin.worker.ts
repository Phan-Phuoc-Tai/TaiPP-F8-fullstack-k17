import { Job, Worker } from "bullmq";
import { COIN, COINJOB } from "../constants/coin.constant";
import { redisWorkerConnection } from "../utils/bullmq";
import { coinService } from "../services/coin.service";
import { redisPub } from "../utils/redis";
import { CoinDB } from "../types/coin.type";

new Worker(
  COIN.PRICE,
  async (job: Job) => {
    if (job.name === COINJOB.NAME) {
      const { id } = job.data;
      if (!id) {
        const coins: CoinDB[] = await coinService.findAll();
        coins.map(async (coin) => {
          await coinService.updatePrice(coin.id);
        });
        redisPub.publish(COINJOB.CHANNEL, JSON.stringify(coins));
      }
      await coinService.updatePrice(id);
    }
  },
  {
    connection: redisWorkerConnection!,
  },
);

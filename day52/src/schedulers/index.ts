import { COINJOB } from "../constants/coin.constant";
import { coinQueue } from "../queue/coin.queue";

coinQueue.upsertJobScheduler(
  COINJOB.PRICE_SCHEDULER,
  {
    pattern: "*/5 * * * * *",
  },
  {
    name: COINJOB.NAME,
  },
);

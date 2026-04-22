import IORedis from "ioredis";
let redisQueueConnection = null;
let redisWorkerConnection = null;
if (!redisQueueConnection) {
  redisQueueConnection = new IORedis({
    port: +process.env.PORT_REDIS!,
  });
}

if (!redisWorkerConnection) {
  redisWorkerConnection = new IORedis({
    port: +process.env.PORT_REDIS!,
    maxRetriesPerRequest: null,
  });
}

export { redisQueueConnection, redisWorkerConnection };

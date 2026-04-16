import { createClient } from "redis";

export const redisClient = createClient({
  url: `redis://localhost:6380`,
}).on("error", (err) => console.log("Redis Client Error", err));
redisClient.connect();

export const redisPub = createClient({
  url: `redis://localhost:6380`,
}).on("error", (err) => console.log("Redis Client Error", err));
redisPub.connect();

export const redisSub = createClient({
  url: `redis://localhost:6380`,
}).on("error", (err) => console.log("Redis Client Error", err));
redisSub.connect();

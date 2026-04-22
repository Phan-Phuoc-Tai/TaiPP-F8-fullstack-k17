import { createClient } from "redis";

export const redisClient = createClient({
  url: "redis://localhost:6380",
}).on("error", (error) => console.log("Redis Client Error", error));
redisClient.connect();

import { redisClient } from "./redis";
export const cache = {
  async remember<T>(key: string, ttl = 3600, callback: () => T) {
    const dataFromCache = await redisClient.get(key);
    if (!dataFromCache) {
      const dataFromDB = await callback();
      redisClient.setEx(key, ttl, JSON.stringify(dataFromDB));
      return dataFromDB;
    }
    return JSON.parse(dataFromCache);
  },
  async forever<T>(key: string, callback: () => T) {
    const dataFromCache = await redisClient.get(key);
    if (!dataFromCache) {
      const dataFromDB = await callback();
      redisClient.set(key, JSON.stringify(dataFromDB));
      return dataFromDB;
    }
    return JSON.parse(dataFromCache);
  },
  forget(key: string) {
    redisClient.del(key);
  },
  async invalidateTags(tags: string[]) {
    for (const tag of tags) {
      const keys = await redisClient.sMembers(tag);
      for (const key of keys) {
        this.forget(key); // Xoá key trong tag
      }
      this.forget(tag); //Xoá tag
    }
  },
};

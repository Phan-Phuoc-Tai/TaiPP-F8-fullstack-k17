export const CACHE_KEY = {
  AUTH: {
    BLACKLIST_ACCESS_TOKEN(userId: number, accessJti: string) {
      return `blacklist:accessToken:${userId}:${accessJti}`;
    },
    REFRESH_TOKEN(userId: number, refreshJti: string) {
      return `refreshToken:${userId}:${refreshJti}`;
    },
  },
};

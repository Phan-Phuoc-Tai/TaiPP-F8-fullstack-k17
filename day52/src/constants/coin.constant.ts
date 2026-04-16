export const COIN = {
  PRICE: "coin-price",
  LIST: "coin:list",
};

export const COINJOB = {
  NAME: "get-coin-price",
  PRICE_SCHEDULER: "coin-price-scheduler",
  CHANNEL: "coin-prices",
};

export const CACHE_TTL = {
  COINS: {
    LIST: 3600,
    DETAIL: 1500,
  },
};

const prefix = "binance";

export const CACHE_KEY = {
  COINS: {
    VERSION: 1,
    LIST() {
      return `${prefix}:${this.VERSION}:coins:list`;
    },
    DETAIL(id: number) {
      return `${prefix}:${this.VERSION}:coins:detail:${id}`;
    },
  },
};

export const CACHE_TAG = {
  COINS: {
    LIST: "tag:coins:list",
  },
};

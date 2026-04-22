import { binance } from "../constants/binance.constant";
import { CACHE_KEY, CACHE_TAG, CACHE_TTL } from "../constants/coin.constant";
import { prisma } from "../libs/prisma";
import { cache } from "../utils/cache";

export const coinService = {
  async create(name: string) {
    const coin = await prisma.coin.create({
      data: {
        name,
      },
    });
    cache.forget(CACHE_TAG.COINS.LIST);
    return coin;
  },
  findAll() {
    return cache.remember(CACHE_KEY.COINS.LIST(), CACHE_TTL.COINS.LIST, () =>
      prisma.coin.findMany(),
    );
  },
  find(id: number) {
    return cache.remember(
      CACHE_KEY.COINS.DETAIL(id),
      CACHE_TTL.COINS.DETAIL,
      () =>
        prisma.coin.findUnique({
          where: { id },
        }),
    );
  },
  async getPrice(name: string) {
    const baseAPI = binance.baseUrl;
    const params = `/api/v3/ticker/price?symbol=${name}`;
    const response = await fetch(`${baseAPI}${params}`);
    const data = await response.json();
    return data;
  },
  async updatePrice(id: number) {
    const coin = await this.find(id);
    if (!coin) {
      throw new Error("Coin not found");
    }
    const coinPrice = await this.getPrice(coin.name);

    const coinUpdate = prisma.coin.update({
      where: {
        id,
      },
      data: {
        name: coinPrice.symbol,
        price: Number(coinPrice.price),
        updatedAt: new Date(),
      },
    });
    cache.forget(CACHE_KEY.COINS.DETAIL(id));
    cache.invalidateTags([CACHE_TAG.COINS.LIST]);
    return coinUpdate;
  },
};

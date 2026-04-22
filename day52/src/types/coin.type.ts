export type CoinPrice = {
  symbol: string;
  price: string;
};

export type CoinDB = {
  name: string;
  price: number | null;
  createdAt: Date;
  updatedAt: Date;
  id: number;
};

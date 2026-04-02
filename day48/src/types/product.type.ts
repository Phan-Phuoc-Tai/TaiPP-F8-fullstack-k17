export type ProductData = {
  name: string;
  desc?: string;
  price: number;
  stock?: number;
  userId: number;
};

export type ProductQuery = {
  userId: number;
  q: string;
  page: number;
  limit: number;
};

export type ProductResponse = {
  userId: number;
  name: string;
  id: number;
  desc: string | null;
  price: number;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
};

export type ProductPagination = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

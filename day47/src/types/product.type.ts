import Decimal from "decimal.js";

export interface Product {
  id?: number;
  name: string;
  price: Decimal;
  description: string | null;
  created_at?: Date | null;
}

export interface ProductUpdate {
  id?: number;
  name?: string;
  price?: Decimal;
  description?: string | null;
  created_at?: Date | null;
}

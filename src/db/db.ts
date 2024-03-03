import { ProductType } from "../repositories/db";

export type AddressType = {
  id: number;
  value: string;
};

export type DBType = {
  products: ProductType[];
  addresses: AddressType[];
};

export const db: DBType = {
  products: [],
  addresses: [
    { id: 1, value: "blvd Lesi Urk 24" },
    { id: 2, value: "str Zhylyanska 54" },
  ],
};

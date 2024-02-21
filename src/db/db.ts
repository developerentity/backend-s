export type ProductType = {
  id: number;
  title: string;
  price: number;
};

export const db: DBType = {
  products: [
    { id: 1, title: "tomato", price: 10 },
    { id: 2, title: "orange", price: 10 },
  ],
  addresses: [
    { id: 1, value: "blvd Lesi Urk 24" },
    { id: 2, value: "str Zhylyanska 54" },
  ],
};

export type DBType = {
  products: ProductType[];
  addresses: any[];
};

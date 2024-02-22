import { ProductType } from "../db/db";
import { ProductViewModel } from "../models/ProductViewModel";

export const getProductViewModel = (
  dbProduct: ProductType
): ProductViewModel => {
  return {
    id: dbProduct.id,
    title: dbProduct.title,
  };
};

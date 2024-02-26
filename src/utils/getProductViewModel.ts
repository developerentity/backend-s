import { ProductViewModel } from "../models/products/ProductViewModel";
import { ProductType } from "../repositories/db";

export const getProductViewModel = (
  dbProduct: ProductType
): ProductViewModel => {
  return {
    id: dbProduct.id,
    title: dbProduct.title,
  };
};

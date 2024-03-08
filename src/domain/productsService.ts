import { v4 as uuidv4 } from "uuid";

import { ProductViewModel } from "../models/products/ProductViewModel";
import { ProductType } from "../repositories/db";
import { productsRepo } from "../repositories/productsRepo";

/**
 *  This is a BLL (Business Logic Layer).
 *  Which most commonly responsible for CUD operations (CRUD without Read).
 */
export const productsService = {
  async createProduct(title: string): Promise<ProductViewModel> {
    const newProduct: ProductType = {
      id: +uuidv4(),
      createdAt: +new Date(),
      title: title,
      price: 0,
    };
    return await productsRepo.createProduct(newProduct);
  },
  async updateProduct(id: number, title: string): Promise<boolean> {
    return await productsRepo.updateProduct(id, title);
  },
  async deleteProduct(id: number): Promise<boolean> {
    return await productsRepo.deleteProduct(id);
  },
};

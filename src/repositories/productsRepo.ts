import { ProductViewModel } from "../models/products/ProductViewModel";
import { ProductType, productsCollection } from "./db";

/**
 * This is the DAL (Data Access Layer).
 * Which is responsible for CUD (CRUD without Read) operations.
 */
export const productsRepo = {
  async createProduct(newProduct: ProductType): Promise<ProductViewModel> {
    const result = await productsCollection.insertOne(newProduct);
    return newProduct;
  },
  async updateProduct(id: number, title: string): Promise<boolean> {
    let result = await productsCollection.updateOne(
      { id: id },
      { $set: { title: title } }
    );

    return result.matchedCount === 1;
  },
  async deleteProduct(id: number): Promise<boolean> {
    let result = await productsCollection.deleteOne({ id: id });

    return result.deletedCount === 1;
  },
};

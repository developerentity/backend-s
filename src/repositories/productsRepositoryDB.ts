import { ProductViewModel } from "../models/products/ProductViewModel";
import { getProductViewModel } from "../utils/getProductViewModel";
import { ProductType, productsCollection } from "./db";

export const productsRepository = {
  async findProducts(
    title: string | undefined | null
  ): Promise<ProductViewModel[]> {
    const filter: any = {};

    if (title) {
      filter.title = { $regex: title };
    }

    return productsCollection.find(filter).toArray();
  },
  async getProductById(id: number): Promise<ProductViewModel | null> {
    let product: ProductType | null = await productsCollection.findOne({
      id: id,
    });

    if (product) {
      return product;
    } else {
      return null;
    }
  },
  async createProduct(title: string): Promise<ProductViewModel> {
    const createdProduct: ProductType = {
      id: +new Date(),
      title: title,
      price: 0,
    };
    let result = await productsCollection.insertOne(createdProduct);

    return createdProduct;
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

import { ProductViewModel } from "../models/products/ProductViewModel";
import { ProductType, productsCollection } from "./db";
import { getProductViewModel } from "../utils/getProductViewModel";

/**
 * This is the DAL (Data Access Layer).
 * Which is responsible for Read only operations.
 */
export const productsQueryRepo = {
  async findProducts(
    title: string | undefined | null
  ): Promise<ProductViewModel[]> {
    const filter: any = {};

    if (title) {
      filter.title = { $regex: title };
    }

    const foundProducts = await productsCollection.find(filter).toArray();

    return foundProducts.map(getProductViewModel);
  },
  async getProductById(id: number): Promise<ProductViewModel | null> {
    let product: ProductType | null = await productsCollection.findOne({
      id: id,
    });

    return product ? getProductViewModel(product) : null;
  },
};

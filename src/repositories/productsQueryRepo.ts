import { ProductViewModel } from "../models/products/ProductViewModel";
import { ProductType, productsCollection } from "./db";
import { getProductViewModel } from "../utils/getProductViewModel";

/**
 * This is the DAL (Data Access Layer).
 * Which is responsible for Read only operations.
 */
export const productsQueryRepo = {
  async findProducts(queryParams: {
    limit: number;
    page: number;
    title: string;
  }): Promise<{
    totalItems: number;
    totalPages: number;
    currentPage: number;
    items: ProductViewModel[];
  }> {
    const limit = queryParams.limit || 10;
    const page = queryParams.page || 1;
    const title = queryParams.title;

    let query: any = {};
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const totalProducts = await productsCollection.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await productsCollection
      .find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    return {
      totalItems: totalProducts,
      totalPages: totalPages,
      currentPage: page,
      items: products.map(getProductViewModel),
    };
  },
  async getProductById(id: number): Promise<ProductViewModel | null> {
    let product: ProductType | null = await productsCollection.findOne({
      id: id,
    });

    return product ? getProductViewModel(product) : null;
  },
};

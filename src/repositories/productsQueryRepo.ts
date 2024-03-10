import {
  ProductViewModel,
  ProductsListViewModel,
} from "../models/products/ProductViewModel";
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
    sortField: string;
    sortOrder: string;
  }): Promise<ProductsListViewModel> {
    const limit = queryParams.limit || 10;
    const page = queryParams.page || 1;
    const title = queryParams.title;
    const sortField = queryParams.sortField || "createdAt";
    const sortOrder = queryParams.sortOrder === "desc" ? -1 : 1;

    let query: any = {};
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }

    const totalProducts = await productsCollection.countDocuments(query);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await productsCollection
      .find(query)
      .sort({ [sortField]: sortOrder })
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

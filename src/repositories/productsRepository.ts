import { db } from "../db/db";
import { ProductViewModel } from "../models/products/ProductViewModel";
import { getProductViewModel } from "../utils/getProductViewModel";
import { ProductType } from "./db";

export const productsRepository = {
  async findProducts(
    title: string | undefined | null
  ): Promise<ProductViewModel[]> {
    if (title) {
      const foundProducts = db.products
        .filter((p) => p.title.indexOf(title) > -1)
        .map(getProductViewModel);
      return foundProducts;
    } else {
      return db.products.map(getProductViewModel);
    }
  },
  async getProductById(id: number): Promise<ProductViewModel | null> {
    const foundProduct = db.products.find((p) => p.id === id);
    return foundProduct ? getProductViewModel(foundProduct) : null;
  },
  async createProduct(title: string): Promise<ProductViewModel> {
    const createdProduct: ProductType = {
      id: +new Date(),
      title: title,
      price: 0,
    };
    db.products.push(createdProduct);
    return getProductViewModel(createdProduct);
  },
  async updateProduct(id: number, title: string): Promise<boolean> {
    let product = db.products.find((p) => p.id === id);
    if (product) {
      product.title = title;
      return true;
    } else {
      return false;
    }
  },
  async deleteProduct(id: number): Promise<boolean> {
    for (let i = 0; i < db.products.length; i++) {
      if (db.products[i].id === id) {
        db.products.splice(i, 1);
        return true;
      }
    }
    return false;
  },
};

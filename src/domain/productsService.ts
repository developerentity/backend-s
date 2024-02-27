import { ProductViewModel } from "../models/products/ProductViewModel";
import { ProductType } from "../repositories/db";
import { productsRepository } from "../repositories/productsRepositoryDB";

export const productsService = {
  async findProducts(
    title: string | undefined | null
  ): Promise<ProductViewModel[]> {
    return productsRepository.findProducts(title);
  },
  async getProductById(id: number): Promise<ProductViewModel | null> {
    return productsRepository.getProductById(id);
  },
  async createProduct(title: string): Promise<ProductViewModel> {
    const newProduct: ProductType = {
      id: +new Date(),
      title: title,
      price: 0,
    };
    return await productsRepository.createProduct(newProduct);
  },
  async updateProduct(id: number, title: string): Promise<boolean> {
    return await productsRepository.updateProduct(id, title);
  },
  async deleteProduct(id: number): Promise<boolean> {
    return await productsRepository.deleteProduct(id);
  },
};

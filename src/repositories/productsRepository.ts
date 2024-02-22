import { ProductType, db } from "../db/db";
import { getProductViewModel } from "../utils/getProductViewModel";

export const productsRepository = {
  findProducts(title: string | undefined | null) {
    if (title) {
      const foundProducts = db.products
        .filter((p) => p.title.indexOf(title) > -1)
        .map(getProductViewModel);
      return foundProducts;
    } else {
      return db.products.map(getProductViewModel);
    }
  },
  getProductById(id: number) {
    const foundProduct = db.products.find((p) => p.id === id);
    return foundProduct ? getProductViewModel(foundProduct) : null;
  },
  createProduct(title: string) {
    const createdProduct: ProductType = {
      id: +new Date(),
      title: title,
      price: 0,
    };
    db.products.push(createdProduct);
    return getProductViewModel(createdProduct);
  },
  updateProduct(id: number, title: string) {
    let product = db.products.find((p) => p.id === id);
    if (product) {
      product.title = title;
      return true;
    } else {
      return false;
    }
  },
  deleteProduct(id: number) {
    for (let i = 0; i < db.products.length; i++) {
      if (db.products[i].id === id) {
        db.products.splice(i, 1);
        return true;
      }
    }
    return false;
  },
};

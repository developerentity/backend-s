import { db } from "../db/db";

export const testsRepository = {
  clearProductsArray() {
    db.products = [];
  },
};

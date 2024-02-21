import { Response, Express } from "express";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "../types";
import { CreateProductModel } from "../models/CreateProductModel";
import { UpdateProductModel } from "../models/UpdateProductModel";
import { QueryProductModel } from "../models/QueryProductModel";
import { ProductViewModel } from "../models/ProductViewModel";
import { URIParamsProductIDModel } from "../models/URIParamsProductIDModel";
import { DBType, ProductType } from "../db/db";
import { HTTP_STATUSES } from "../http_statuses";

const getProductViewModel = (dbProduct: ProductType): ProductViewModel => {
  return {
    id: dbProduct.id,
    title: dbProduct.title,
  };
};

export const addProductsRoutes = (app: Express, db: DBType) => {
  app.get(
    "/products",
    (
      req: RequestWithQuery<QueryProductModel>,
      res: Response<ProductViewModel[]>
    ) => {
      let foundProducts = db.products;

      if (req.query.title) {
        foundProducts = foundProducts.filter(
          (p) => p.title.indexOf(req.query.title) > -1
        );
      }

      res.send(foundProducts.map(getProductViewModel));
    }
  );
  app.get(
    "/products/:id",
    (
      req: RequestWithParams<URIParamsProductIDModel>,
      res: Response<ProductViewModel>
    ) => {
      let foundProduct = db.products.find((p) => p.id === +req.params.id);

      if (foundProduct) {
        res.send(getProductViewModel(foundProduct));
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
  );
  app.post(
    "/products",
    (
      req: RequestWithBody<CreateProductModel>,
      res: Response<ProductViewModel>
    ) => {
      if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }
      const createdProduct: ProductType = {
        id: +new Date(),
        title: req.body.title,
        price: 0,
      };
      db.products.push(createdProduct);
      res
        .status(HTTP_STATUSES.CREATED_201)
        .send(getProductViewModel(createdProduct));
    }
  );
  app.put(
    "/products/:id",
    (
      req: RequestWithParamsAndBody<
        URIParamsProductIDModel,
        UpdateProductModel
      >,
      res: Response
    ) => {
      if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }

      let product = db.products.find((p) => p.id === +req.params.id);
      if (product) {
        product.title = req.body.title;
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
  );
  app.delete(
    "/products/:id",
    (req: RequestWithParams<URIParamsProductIDModel>, res: Response) => {
      for (let i = 0; i < db.products.length; i++) {
        if (db.products[i].id === +req.params.id) {
          db.products.splice(i, 1);
          res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
          return;
        }
      }
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  );
};

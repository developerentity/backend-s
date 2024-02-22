import express, { Response } from "express";
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
import { HTTP_STATUSES } from "../http_statuses";
import { productsRepository } from "../repositories/productsRepository";

export const getProductsRouter = () => {
  const router = express.Router();

  router.get(
    "/",
    (
      req: RequestWithQuery<QueryProductModel>,
      res: Response<ProductViewModel[]>
    ) => {
      const foundProducts = productsRepository.findProducts(
        req.query.title?.toString()
      );
      res.send(foundProducts);
    }
  );
  router.get(
    "/:id",
    (
      req: RequestWithParams<URIParamsProductIDModel>,
      res: Response<ProductViewModel>
    ) => {
      const foundProduct = productsRepository.getProductById(+req.params.id);
      if (foundProduct) {
        res.send(foundProduct);
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
  );
  router.post(
    "/",
    (
      req: RequestWithBody<CreateProductModel>,
      res: Response<ProductViewModel>
    ) => {
      if (!req.body.title) {
        res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
        return;
      }
      const createdProduct = productsRepository.createProduct(req.body.title);
      res.status(HTTP_STATUSES.CREATED_201).send(createdProduct);
    }
  );
  router.put(
    "/:id",
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
      const isUpdated = productsRepository.updateProduct(
        +req.params.id,
        req.body.title
      );
      if (isUpdated) {
        const product = productsRepository.getProductById(+req.params.id);
        res.send(product);
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
  );
  router.delete(
    "/:id",
    (req: RequestWithParams<URIParamsProductIDModel>, res: Response) => {
      const isDeleted = productsRepository.deleteProduct(+req.params.id);
      if (isDeleted) {
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      } else {
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
      }
    }
  );

  return router;
};

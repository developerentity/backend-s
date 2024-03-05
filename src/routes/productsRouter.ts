import express, { Response } from "express";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "../types";
import { CreateProductModel } from "../models/products/CreateProductModel";
import { UpdateProductModel } from "../models/products/UpdateProductModel";
import { QueryProductModel } from "../models/products/QueryProductModel";
import {
  ProductViewModel,
  ProductsListViewModel,
} from "../models/products/ProductViewModel";
import { URIParamsProductIDModel } from "../models/products/URIParamsProductIDModel";
import { HTTP_STATUSES } from "../http_statuses";
import { titleValidator } from "../validators/titleValidator";
import { inputValidationMiddleware } from "../validators/inputValidationMiddleware";
import { productsService } from "../domain/productsService";
import { productsQueryRepo } from "../repositories/productsQueryRepo";

/**
 * This is the Presentation Layer
 */
export const productsRouter = express.Router({});

productsRouter.get(
  "/",
  async (
    req: RequestWithQuery<QueryProductModel>,
    res: Response<ProductsListViewModel>
  ) => {
    const foundProducts: ProductsListViewModel =
      await productsQueryRepo.findProducts({
        limit: +req.query.pageSize,
        page: +req.query.pageNumber,
        title: req.query.title?.toString(),
        sortField: req.query.sortField,
        sortOrder: req.query.sortOrder,
      });
    res.send(foundProducts);
  }
);
productsRouter.get(
  "/:id",
  async (
    req: RequestWithParams<URIParamsProductIDModel>,
    res: Response<ProductViewModel>
  ) => {
    const foundProduct: ProductViewModel | null =
      await productsQueryRepo.getProductById(+req.params.id);
    if (foundProduct) {
      res.send(foundProduct);
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  }
);
productsRouter.post(
  "/",
  titleValidator,
  inputValidationMiddleware,
  async (
    req: RequestWithBody<CreateProductModel>,
    res: Response<ProductViewModel>
  ) => {
    if (!req.body.title) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }
    const createdProduct: ProductViewModel =
      await productsService.createProduct(req.body.title);
    res.status(HTTP_STATUSES.CREATED_201).send(createdProduct);
  }
);
productsRouter.put(
  "/:id",
  titleValidator,
  inputValidationMiddleware,
  async (
    req: RequestWithParamsAndBody<URIParamsProductIDModel, UpdateProductModel>,
    res: Response<ProductViewModel>
  ) => {
    if (!req.body.title) {
      res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
      return;
    }
    const isUpdated: boolean = await productsService.updateProduct(
      +req.params.id,
      req.body.title
    );
    const product: ProductViewModel | null =
      await productsQueryRepo.getProductById(+req.params.id);

    if (isUpdated && product) {
      res.send(product);
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  }
);
productsRouter.delete(
  "/:id",
  async (req: RequestWithParams<URIParamsProductIDModel>, res: Response) => {
    const isDeleted: boolean = await productsService.deleteProduct(
      +req.params.id
    );
    if (isDeleted) {
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  }
);

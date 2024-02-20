import express, { Request, Response, json } from "express";
import {
  RequestWithBody,
  RequestWithParams,
  RequestWithParamsAndBody,
  RequestWithQuery,
} from "./types";
import { CreateProductModel } from "./models/CreateProductModel";
import { UpdateProductModel } from "./models/UpdateProductModel";
import { QueryProductModel } from "./models/QueryProductModel";
import { ProductViewModel } from "./models/ProductViewModel";
import { URIParamsProductIDModel } from "./models/URIParamsProductIDModel";
export const app = express();
const port = process.env.PORT || 3000;

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

const db: {
  products: ProductType[];
  addresses: any[];
} = {
  products: [
    { id: 1, title: "tomato", price: 10 },
    { id: 2, title: "orange", price: 10 },
  ],
  addresses: [
    { id: 1, value: "blvd Lesi Urk 24" },
    { id: 2, value: "str Zhylyanska 54" },
  ],
};

const getProductViewModel = (dbProduct: ProductType): ProductViewModel => {
  return {
    id: dbProduct.id,
    title: dbProduct.title,
  };
};

type ProductType = {
  id: number;
  title: string;
  price: number;
};

app.use(json());

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
    req: RequestWithParamsAndBody<URIParamsProductIDModel, UpdateProductModel>,
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

app.get("/addresses", (req: Request, res: Response) => {
  res.send(db.addresses);
});
app.get("/addresses/:id", (req: Request, res: Response) => {
  let address = db.addresses.find((p) => p.id === +req.params.id);
  if (address) {
    res.send(address);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
});

app.delete("/__test__/data", (req, res) => {
  db.products = [];
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

export const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}!!!!!`);
});

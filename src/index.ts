import express, { Request, Response, json } from "express";
export const app = express();
const port = process.env.PORT || 3000;

export const HTTP_STATUSES = {
  OK_200: 200,
  CREATED_201: 201,
  NO_CONTENT_204: 204,

  BAD_REQUEST_400: 400,
  NOT_FOUND_404: 404,
};

const db = {
  products: [
    { id: 1, title: "tomato" },
    { id: 2, title: "orange" },
  ],
  addresses: [
    { id: 1, value: "blvd Lesi Urk 24" },
    { id: 2, value: "str Zhylyanska 54" },
  ],
};

app.use(json());

app.get("/products", (req: Request, res: Response) => {
  if (req.query.title) {
    res.send(
      db.products.filter((p) => p.title.indexOf(req.query.title as string) > -1)
    );
  } else {
    res.send(db.products);
  }
});
app.get("/products/:id", (req: Request, res: Response) => {
  let product = db.products.find((p) => p.id === +req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
  }
});
app.post("/products", (req: Request, res: Response) => {
  if (!req.body.title) {
    res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
    return;
  }
  const newProduct = { id: +new Date(), title: req.body.title };
  db.products.push(newProduct);
  res.status(HTTP_STATUSES.CREATED_201).send(newProduct);
});
app.put("/products/:id", (req: Request, res: Response) => {
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
});
app.delete("/products/:id", (req: Request, res: Response) => {
  for (let i = 0; i < db.products.length; i++) {
    if (db.products[i].id === +req.params.id) {
      db.products.splice(i, 1);
      res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
      return;
    }
  }
  res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
});

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

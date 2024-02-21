import { Request, Response, Express } from "express";
import { DBType } from "../db/db";
import { HTTP_STATUSES } from "../http_statuses";

export const addAddressesRoutes = (app: Express, db: DBType) => {
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
};

import express, { Request, Response } from "express";
import { DBType } from "../db/db";
import { HTTP_STATUSES } from "../http_statuses";

export const getAddressesRouter = (db: DBType) => {
  const router = express.Router();
  router.get("/", (req: Request, res: Response) => {
    res.send(db.addresses);
  });
  router.get("/:id", (req: Request, res: Response) => {
    let address = db.addresses.find((p) => p.id === +req.params.id);
    if (address) {
      res.send(address);
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  });

  return router;
};

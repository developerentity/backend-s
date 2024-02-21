import { Express } from "express";
import { DBType } from "../db/db";
import { HTTP_STATUSES } from "../http_statuses";

export const addTestsRoutes = (app: Express, db: DBType) => {
  app.delete("/__test__/data", (req, res) => {
    db.products = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });
};

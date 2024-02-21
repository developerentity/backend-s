import express from "express";
import { DBType } from "../db/db";
import { HTTP_STATUSES } from "../http_statuses";

export const getTestsRouter = (db: DBType) => {
  const router = express.Router();
  router.delete("/data", (req, res) => {
    db.products = [];
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });

  return router;
};

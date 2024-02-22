import express from "express";
import { HTTP_STATUSES } from "../http_statuses";
import { testsRepository } from "../repositories/testsRepository";

export const getTestsRouter = () => {
  const router = express.Router();
  router.delete("/data", (_, res) => {
    testsRepository.clearProductsArray();
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  });

  return router;
};

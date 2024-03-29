import express from "express";

import { HTTP_STATUSES } from "../http_statuses";
import { testsRepository } from "../repositories/testsRepository";

export const testRouter = express.Router({});

testRouter.delete("/products", (_, res) => {
  testsRepository.clearProductsArray();
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});
testRouter.delete("/addresses", (_, res) => {
  testsRepository.clearAddressesArray();
  res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
});

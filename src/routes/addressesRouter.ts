import express, { Response } from "express";

import { HTTP_STATUSES } from "../http_statuses";
import { addressesRepository } from "../repositories/addressesRepository";
import { RequestWithParams, RequestWithQuery } from "../types";
import { QueryAddressModel } from "../models/addresses/QueryAddressModel";
import { AddressViewModel } from "../models/addresses/AddressViewMode";
import { URIParamsAddressIDModel } from "../models/addresses/URIParamsAddressIDModel";

export const addressesRouter = express.Router({});

addressesRouter.get(
  "/",
  (
    req: RequestWithQuery<QueryAddressModel>,
    res: Response<AddressViewModel[]>
  ) => {
    const foundAddresses = addressesRepository.findAddresses(
      req.query.value?.toString()
    );
    res.send(foundAddresses);
  }
);
addressesRouter.get(
  "/:id",
  (
    req: RequestWithParams<URIParamsAddressIDModel>,
    res: Response<AddressViewModel>
  ) => {
    const foundAddress = addressesRepository.getAddressById(+req.params.id);
    if (foundAddress) {
      res.send(foundAddress);
    } else {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
  }
);

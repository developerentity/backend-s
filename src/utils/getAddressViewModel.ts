import { AddressType } from "../db/db";
import { AddressViewModel } from "../models/addresses/AddressViewMode";

export const getAddressViewModel = (
  dbAddress: AddressType
): AddressViewModel => {
  return {
    id: dbAddress.id,
    value: dbAddress.value,
  };
};

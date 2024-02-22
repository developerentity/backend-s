import { db } from "../db/db";
import { getAddressViewModel } from "../utils/getAddressViewModel";

export const addressesRepository = {
  findAddresses(value: string | undefined | null) {
    if (value) {
      const foundAddresses = db.addresses
        .filter((a) => a.value.indexOf(value) > -1)
        .map(getAddressViewModel);
      return foundAddresses;
    } else {
      return db.addresses.map(getAddressViewModel);
    }
  },
  getAddressById(id: number) {
    const foundAddress = db.addresses.find((a) => a.id === id);
    return foundAddress ? getAddressViewModel(foundAddress) : null;
  },
};

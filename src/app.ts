import express from "express";
import { getProductsRouter } from "./routes/productsRouter";
import { getAddressesRouter } from "./routes/addressesRouter";
import { getTestsRouter } from "./routes/testRouter";

export const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use("/products", getProductsRouter());
app.use("/addresses", getAddressesRouter());
app.use("/__test__", getTestsRouter());

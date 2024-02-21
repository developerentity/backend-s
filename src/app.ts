import express from "express";
import { db } from "./db/db";
import { getProductsRouter } from "./routes/productsRouter";
import { getAddressesRouter } from "./routes/addressesRouter";
import { getTestsRouter } from "./routes/testRouter";

export const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use("/products", getProductsRouter(db));
app.use("/addresses", getAddressesRouter(db));
app.use("/__test__", getTestsRouter(db));

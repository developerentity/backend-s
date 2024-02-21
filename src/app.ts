import express from "express";
import { addProductsRoutes } from "./routes/productsRoutes";
import { addAddressesRoutes } from "./routes/addressesRoutes";
import { addTestsRoutes } from "./routes/testRoutes";
import { db } from "./db/db";

export const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

addProductsRoutes(app, db);
addAddressesRoutes(app, db);
addTestsRoutes(app, db);

import express from "express";
import productsRouter from "./routes/productsRouter";
import addressesRouter from "./routes/addressesRouter";
import testRouter from "./routes/testRouter";

export const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use("/products", productsRouter);
app.use("/addresses", addressesRouter);
app.use("/__test__", testRouter);

import express from "express";

import { usersRouter } from "./routes/usersRouter";
import { authRouter } from "./routes/authRouter";
import { productsRouter } from "./routes/productsRouter";
import { addressesRouter } from "./routes/addressesRouter";
import { testRouter } from "./routes/testRouter";

export const app = express();

const jsonBodyMiddleware = express.json();
app.use(jsonBodyMiddleware);

app.use("/users", usersRouter);
app.use("/login", authRouter);
app.use("/products", productsRouter);
app.use("/addresses", addressesRouter);
app.use("/__test__", testRouter);

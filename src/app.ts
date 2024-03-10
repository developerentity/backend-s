import express from "express";
import cookieParser from "cookie-parser";

import { usersRouter } from "./routes/usersRouter";
import { authRouter } from "./routes/authRouter";
import { productsRouter } from "./routes/productsRouter";
import { addressesRouter } from "./routes/addressesRouter";
import { testRouter } from "./routes/testRouter";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/products", productsRouter);
app.use("/addresses", addressesRouter);
app.use("/__test__", testRouter);

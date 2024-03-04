import { MongoClient } from "mongodb";

import { UserDBType } from "../domain/usersService";

export type ProductType = {
  id: number;
  title: string;
  price: number;
  createdAt: number;
};

const mongoDB = process.env.mongoURI || "mongodb://0.0.0.0:27017";

const client = new MongoClient(mongoDB);

const db = client.db("shop");

export const productsCollection = db.collection<ProductType>("products");
export const usersCollection = db.collection<UserDBType>("users");

export async function runDB() {
  try {
    // Connect the client to the server
    await client.db("products").command({ ping: 1 });
    await client.db("users").command({ ping: 1 });
    console.log("Connected successfully to mongo server");
  } catch {
    console.log("Can't connect to DB");
    await client.close();
  }
}

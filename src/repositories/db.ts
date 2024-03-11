import { MongoClient, ServerApiVersion } from "mongodb";

import { URI } from "../config";
import { UserDBType } from "../domain/usersService";

export type ProductType = {
  id: number;
  title: string;
  price: number;
  createdAt: number;
};

const uri = URI || "";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function runDB() {
  try {
    // Connect the client to the server
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinger your deployment. You successfully connected to MongoDB!"
    );
  } catch (err) {
    console.log("Can't connect to DB: " + err);
    await client.close();
  }
}

const db = client.db("shop");
export const productsCollection = db.collection<ProductType>("products");
export const usersCollection = db.collection<UserDBType>("users");

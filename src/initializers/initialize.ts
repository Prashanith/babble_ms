import { Mongoose } from "mongoose";
import mongooseLoader from "./db.ts";
import loadServer from "./server.ts";
import { Express } from "express";

async function initialize(app: Express, mongoose: Mongoose) {
  await mongooseLoader(mongoose);
  loadServer(app);
}

export default initialize;

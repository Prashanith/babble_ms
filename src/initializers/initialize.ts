import { Mongoose } from "mongoose";
import mongooseLoader from "./db";
import loadServer from "./server";
import { Express } from "express";

async function initialize(app: Express, mongoose: Mongoose) {
  await mongooseLoader(mongoose);
  loadServer(app);
}

export default initialize;

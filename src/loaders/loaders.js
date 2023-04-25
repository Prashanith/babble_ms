import express from "express";
import mongooseLoader from "./db.js";
import loadServer from "./server.js";

async function loaders(app, mongoose) {
  await mongooseLoader(mongoose);
  loadServer(app);
}

export default loaders;

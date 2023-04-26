import express from "express";
import mongooseLoader from "./db.js";
import loadServer from "./server.js";

async function initialize(app, mongoose) {
  await mongooseLoader(mongoose);
  loadServer(app);
}

export default initialize;

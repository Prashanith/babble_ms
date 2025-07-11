import express from "express";
import dotenv from "dotenv";
import initialize from "./initializers/initialize.ts";
import mongoose from "mongoose";
import { secrets } from "./utils/envUtils.ts";

dotenv.config();

const serverPort = secrets.PORT;

async function startServer() {
  const server = express();

  await initialize(server, mongoose);

  server.listen(serverPort, () =>
    console.log(`Babble Network API Service started at ${serverPort}`)
  );
}

startServer();
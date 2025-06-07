import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import initialize from "./initializers/initialize";

dotenv.config();

const serverPort = process.env.PORT;

async function startServer() {
  const server = express();

  await initialize(server, mongoose);

  server.listen(serverPort, () =>
    console.log(`Babble Network API Service started at ${serverPort}`)
  );
}

startServer();

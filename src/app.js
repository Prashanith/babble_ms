import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import loaders from "./loaders/loaders.js";

dotenv.config();

const serverPort = process.env.PORT;

const startServer = () => {
  const server = express();

  loaders(server, mongoose);

  server.listen(serverPort, () =>
    console.log(`Babble Network API Service started at ${serverPort}`)
  );
};

startServer();

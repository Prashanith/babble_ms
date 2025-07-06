import express from "express";
import api from "../api/api";
import { Express } from "express";

const loadServer = (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", api());
};

export default loadServer;

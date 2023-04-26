import express from "express";
import api from "../api/api.js";

const loadServer = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use("/", api());
};

export default loadServer;

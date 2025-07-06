/* eslint-disable no-unused-vars */
import tokenAuth from "../../../middleware/tokenAuth";
import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.use(tokenAuth);

router.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.json({ id: "Millionaire" });
});

router.post("/", (request: Request, response: Response, next: NextFunction) => {
  response.json("{id:'Messi'}");
});

export default router;

/* eslint-disable no-unused-vars */
import { Router, request } from "express";
import tokenAuth from "../../../middleware/tokenAuth.js";

const router = Router();

// router.use();

router.use(tokenAuth);

router.get("/", (request, response, next) => {
  return response.json({ id: "Millionaire" });
});

router.post("/",(request,response,next)=>response.json("{id:'Messi'}"));



export default router;

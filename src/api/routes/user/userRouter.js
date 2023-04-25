/* eslint-disable no-unused-vars */
import { Router, request } from "express";

const router = Router();

// router.use();

router.get("/", (request, response, next) => {
  return response.json({ id: "Millionaire" });
});

router.post("/",(request,response,next)=>{});



export default router;

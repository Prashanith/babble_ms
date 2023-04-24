import { Router, response } from "express";
import { request } from "http";

const router = Router();

// router.use();

router.get("/id", (request, response, next) => {
  return response.json({ id: "Millionaire" });
});

export default router;

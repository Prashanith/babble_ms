import express, { NextFunction, Request, Response, Router } from "express";
import userRouter from "./routes/user/userRouter";
import authRouter from "./routes/ids/idsRouter";

const api = () => {
  const router: Router = express.Router();

  router.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.json("Babble Network Server is up and running");
  });

  router.use("/users", userRouter);

  router.use("/auth", authRouter);

  return router;
};

export default api;

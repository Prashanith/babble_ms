import express from "express";
import userRouter from "./routes/user/userRouter.js";
import authRouter from "./routes/ids/identityServiceRouter.js";
import tokenAuth from "../middleware/tokenAuth.js";

const api = () => {
  const router = express.Router();

  router.get("/", (req, res, next) =>
    res.json("Babble Network Server is up and running")
  );

  router.use(tokenAuth);

  router.use("/users", userRouter);

  router.use("/auth", authRouter);

  return router;
};

export default api;

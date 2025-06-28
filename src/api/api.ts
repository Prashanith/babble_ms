import express from "express";
import userRouter from "./routes/user/userRouter";
import authRouter from "./routes/ids/identityServiceRouter";

const api = () => {
  const router = express.Router();

  router.get("/", (req, res, next) =>
    res.json("Babble Network Server is up and running")
  );

  router.use("/users", userRouter);

  router.use("/auth", authRouter);

  return router;
};

export default api;

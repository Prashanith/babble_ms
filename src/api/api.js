import express from "express";
import userRouter from "./routes/user/userRouter.js";

const api = () => {
  const router = express.Router();

  router.get("/",(req,res,next)=>res.json("Babble Network Server is up and running"))
  router.use("/users", userRouter);
  return router;
};

export default api;

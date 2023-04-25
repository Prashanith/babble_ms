/* eslint-disable no-unused-vars */
import { Router } from "express";
import {
  loginUser,
  registerUser,
} from "./../../../services/ids/identityService.js";
import { HttpResponse } from "../../../models/http/response.js";

const router = Router();

router.get("/", (request, response, next) =>
  response.json("Authentication Service")
);

router.post("/login", (request, response, next) => {
  console.log(request.headers["authorization"]);
  if (request.body.email && request.body.password) {
    loginUser(request.body.email, request.body.password);
  } else {
    return HttpResponse.toBadRequestError(
      response,
      "Email or Password Cannot be Empty"
    );
  }
});

router.post("/register",async (request, response, next) => {
  const [email, password] = [request.body.email, request.body.password];
  return await registerUser(email, password,response);
});

export default router;

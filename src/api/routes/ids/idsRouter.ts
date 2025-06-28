/* eslint-disable no-unused-vars */
import { loginUser, registerUser } from "../../../services/ids/idService.ts";
import { HttpResponse } from "../../../models/http/response.ts";
import express, { NextFunction, Request, Response, Router } from "express";

const router: Router = Router();

router.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.json("Authentication Service");
});

router.post("/login", async (request, response, next) => {
  if (request.body.email && request.body.password) {
    return await loginUser(request.body.email, request.body.password, response);
  } else {
    return HttpResponse.toBadRequestError(
      response,
      "Email or Password Cannot be Empty"
    );
  }
});

router.post("/register", async (request, response, next) => {
  const { email, password } = request.body;
  return await registerUser(email, password, response);
});

export default router;

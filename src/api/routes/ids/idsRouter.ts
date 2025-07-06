/* eslint-disable no-unused-vars */
import { loginUser, registerUser } from "../../../services/ids/idService";
import { HttpResponse } from "../../../models/http/response";
import express, { NextFunction, Request, Response, Router } from "express";

const router: Router = Router();

router.get("/", (request: Request, response: Response, next: NextFunction) => {
  response.json("Authentication Service");
});

router.post(
  "/login",
  (request: Request, response: Response, next: NextFunction) => {
    if (request.body.email && request.body.password) {
      loginUser(request.body.email, request.body.password, response);
    } else {
      HttpResponse.toBadRequestError(
        response,
        "Email or Password Cannot be Empty"
      );
    }
  }
);

router.post(
  "/register",
  (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body;
    registerUser(email, password, response);
  }
);

export default router;

import jwt from "jsonwebtoken";
import { HttpResponse } from "../models/http/response.ts";
import { NextFunction, Request, Response } from "express";
import { secrets } from "../utils/envUtils.ts";

function tokenAuth(request: Request, response: Response, next: NextFunction) {
  try {
    const authToken = String(request.headers["authorization"]).split(" ")[1];
    if (authToken) {
      jwt.verify(
        authToken,
        secrets.ACCESS_TOKEN_SECRET,
        function (err, digest: string | jwt.JwtPayload | undefined) {
          if (err) {
            return HttpResponse.toUnauthorizedError(response);
          } else {
            if (digest && typeof digest == "object")
              request.body["context"] = { id: digest?.id ?? "" };
          }
        }
      );
      next();
    } else {
      return HttpResponse.toUnauthorizedError(response);
    }
  } catch (error) {
    console.log(error);
    return HttpResponse.toInternalServerError(response);
  }
}

export default tokenAuth;

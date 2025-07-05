import jwt from "jsonwebtoken";
import { HttpResponse } from "../models/http/response.ts";
import { NextFunction, Request, Response } from "express";
import { secrets } from "../utils/envUtils.ts";

function tokenAuth(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  try {
    const authHeader = request.headers["authorization"];
    const authToken = authHeader?.split(" ")[1];
    if (!authToken) {
      HttpResponse.toUnauthorizedError(response);
      return;
    }
    jwt.verify(
      authToken,
      secrets.ACCESS_TOKEN_SECRET,
      (err, decoded: jwt.JwtPayload | String | undefined) => {
        if (err) {
          HttpResponse.toUnauthorizedError(response);
          return;
        }
        if (decoded && typeof decoded === "object" && "id" in decoded) {
          request.body["context"] = {
            id: (decoded as jwt.JwtPayload).id ?? "",
          };
        }
        next();
      }
    );
  } catch (error) {
    console.error(error);
    HttpResponse.toInternalServerError(response);
  }
}

export default tokenAuth;

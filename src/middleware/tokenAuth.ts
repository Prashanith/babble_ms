import jwt from "jsonwebtoken";
import { HttpResponse } from "../models/http/response";

function tokenAuth(request, response, next) {
  try {
    const authToken = String(request.headers["authorization"]).split(" ")[1];
    if (authToken) {
      jwt.verify(
        authToken,
        process.env.ACCESS_TOKEN_SECRET,
        function (err, digest) {
          if (err) {
            return HttpResponse.toUnauthorizedError(response);
          } else {
            request.body["context"] = { id: digest.id };
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

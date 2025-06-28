/* eslint-disable no-debugger */
import { HttpError } from "./error.ts";
import { ResponseCodes } from "../../constants/codes.ts";
import { Response } from "express";

class HttpResponse {
  data: object | null;
  error?: HttpError | null;
  constructor(data: object | null, error?: HttpError | null) {
    this.data = data;
    this.error = error;
  }

  toJSON() {
    return {
      data: this.data,
      error: this.error,
    };
  }

  static toInternalServerError(response: Response, message = null) {
    var error = new HttpError(
      ResponseCodes.BB500,
      message ? message : "Internal Server Error"
    );
    var res = new HttpResponse(null, error).toJSON();
    return response.status(400).json(res);
  }

  static toBadRequestError(response: Response, message?: String | null) {
    var error = new HttpError(
      ResponseCodes.BB400,
      message ? message : "Bad Request Error"
    );
    var res = new HttpResponse(null, error).toJSON();
    return response.status(400).json(res);
  }

  static toConflictError(response: Response, message?: String | null) {
    var error = new HttpError(
      ResponseCodes.BB400,
      message ? message : "Bad Request Error"
    );
    var res = new HttpResponse(null, error).toJSON();
    return response.status(409).json(res);
  }

  static Ok(response: Response, data: object) {
    var res = new HttpResponse(data, null).toJSON();
    return response.status(200).json(res);
  }

  static Accepted(response: Response, data: object) {
    var res = new HttpResponse(data, null).toJSON();
    return response.status(201).json(res);
  }

  static toUnauthorizedError(response: Response, message = null) {
    var error = new HttpError(
      ResponseCodes.BB401,
      message ? message : "Authorization Error Occurred"
    );
    var res = new HttpResponse(null, error).toJSON();
    return response.status(401).json(res);
  }
}

export { HttpResponse };

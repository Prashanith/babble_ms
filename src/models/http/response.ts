/* eslint-disable no-debugger */
import { Response } from 'express';
import { HttpError } from './error';
import { ResponseCodes } from '../../constants/codes';

class HttpResponse {
  data: object | null;
  error: HttpError | null;

  constructor(data: object | null, error: HttpError | null = null) {
    this.data = data;
    this.error = error;
  }

  toJSON() {
    return {
      data: this.data,
      error: this.error,
    };
  }

  static toInternalServerError(response: Response, message: string = 'Internal Server Error') {
    const error = new HttpError(ResponseCodes.BB500, message);
    const res = new HttpResponse(null, error).toJSON();
    // FIXED: Internal Server Error must be 500, not 400
    return response.status(500).json(res);
  }

  static toBadRequestError(response: Response, message: string = 'Bad Request Error') {
    const error = new HttpError(ResponseCodes.BB400, message);
    const res = new HttpResponse(null, error).toJSON();
    return response.status(400).json(res);
  }

  static toNotFoundError(response: Response, message: string = 'Resource Not Found') {
    const error = new HttpError(ResponseCodes.BB404, message);
    const res = new HttpResponse(null, error).toJSON();
    // FIXED: Not Found must be 404, not 400
    return response.status(404).json(res);
  }

  static toConflictError(response: Response, message: string = 'Conflict Error Occurred') {
    const error = new HttpError(ResponseCodes.BB409, message);
    const res = new HttpResponse(null, error).toJSON();
    return response.status(409).json(res);
  }

  static toUnauthorizedError(response: Response, message: string = 'Authorization Error Occurred') {
    const error = new HttpError(ResponseCodes.BB401, message);
    const res = new HttpResponse(null, error).toJSON();
    return response.status(401).json(res);
  }

  static Ok(response: Response, data: object = {}) {
    const res = new HttpResponse(data, null).toJSON();
    return response.status(200).json(res);
  }

  static Accepted(response: Response, data: object = {}) {
    const res = new HttpResponse(data, null).toJSON();
    // NOTE: 201 is technically "Created", 202 is "Accepted". Usually 201 is used for success post-creation.
    return response.status(201).json(res);
  }
}

export { HttpResponse };

import { HttpResponse } from "../../models/http/response.ts";
import { users } from "../../models/user/user.ts";
import {
  hashPassword,
  verifyHash,
  filterUserObject,
  generateAccessToken,
} from "../../utils/utils.ts";
import { Response } from "express";

async function loginUser(email: string, password: string, response: Response) {
  try {
    const user = await users.findOne({ email: email }).exec();
    const isAuthSuccess = await verifyHash(password, user.password);
    if (isAuthSuccess) {
      const res = filterUserObject(user);
      res["access_token"] = generateAccessToken({ id: res._id });
      return HttpResponse.Ok(response, res);
    } else {
      return HttpResponse.toUnauthorizedError(response, "Invalid Password");
    }
  } catch (error) {
    return HttpResponse.toInternalServerError(response);
  }
}

async function registerUser(
  email: string,
  password: string,
  response: Response
) {
  try {
    const user = await users.findOne({ email: email }).exec();
    if (user) {
      return HttpResponse.toBadRequestError(response, "User already exists");
    } else {
      const hashedPassword = await hashPassword(password);
      const user = await users.create({
        email: email,
        password: hashedPassword,
      });
      const res = filterUserObject(user);
      res["access_token"] = generateAccessToken({ id: res._id });
      return HttpResponse.Ok(response, res);
    }
  } catch (error) {
    return HttpResponse.toInternalServerError(response);
  }
}

export { loginUser, registerUser };

import { HttpResponse } from "../../models/http/response.js";
import { users } from "../../models/user/user.js";
import {
  hashPassword,
  verifyHash,
  filterUserObject,
  generateAccessToken,
} from "../../utils/utils.js";

async function loginUser(email, password, response) {
  try {
    const user = await users.findOne({ email: email }).exec();
    const isAuthSuccess = await verifyHash(password, user.password);
    if (isAuthSuccess) {
      const res = filterUserObject(user);
      res["access_token"] = generateAccessToken({ id: res._id });
      return HttpResponse.ok(response, res);
    } else {
      return HttpResponse.toUnauthorizedError(response, "Invalid Password");
    }
  } catch (error) {
    return HttpResponse.toInternalServerError(response);
  }
  // if (u) {
  //   return response.json(u);
  // } else {
  //   return response.json("User Not Found");
  // }
}

async function registerUser(email, password, response) {
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
      return HttpResponse.ok(response, res);
    }
  } catch (error) {
    return HttpResponse.toInternalServerError(response);
  }

  // return email + password;
}

export { loginUser, registerUser };

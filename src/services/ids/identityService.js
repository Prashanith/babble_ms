import { HttpResponse } from "../../models/http/response.js";
import { users } from "../../models/user/user.js";
import hashPassword from "../../utils/utils.js";

async function loginUser(email, password) {
  const u = await users.findOne({ email: email, password: password }).exec();

  // if (u) {
  //   return response.json(u);
  // } else {
  //   return response.json("User Not Found");
  // }
}

async function registerUser(email, password, response) {
  const user = await users.findOne({ email: email }).exec();
  if (user) {
    return HttpResponse.toBadRequestError(response, "User already exists");
  } else {
    const hashedPassword = await hashPassword(password);
    const user = await users.create({ email: email, password: hashedPassword });
    const res = user.toObject();
    delete res.password;
    return HttpResponse.ok(response, res);
  }
  // return email + password;
}

export { loginUser, registerUser };

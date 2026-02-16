import { AuthenticationFailed } from "../../constants/errorCodes/ids/authFailed";
import { UserNotFound } from "../../constants/errorCodes/ids/userNotFound";
import { HttpResponse } from "../../models/http/response";
import { users } from "../../models/user/user";
import { registerUserUsingIdAndPassword } from "../../repositories/idsRepository";
import {
  hashPassword,
  verifyHash,
  filterUserObject,
  generateAccessToken,
} from "../../utils/utils";

async function loginUser(email: String, password: String) {
  const user = await users.findOne({ email: email }).exec();
  if (!user) {
    throw new UserNotFound();
  } else {
    const isAuthSuccess = await verifyHash(password, user.password ?? "");
    if (isAuthSuccess) {
      const res = filterUserObject(user);
      res["access_token"] = generateAccessToken({ id: res._id });
      return res;
    } else {
      throw new AuthenticationFailed();
    }
  }
}

async function registerUser(
  email: String,
  password: String,
  response: Response
) {
    const user = await users.findOne({ email: email }).exec();
    if (user) {
      throw new UserNotFound();
    } else {
      const hashedPassword = await hashPassword(password);
      const user = await registerUserUsingIdAndPassword({
        email: email,
        password: hashedPassword,
        response: Response,
      });
      const res = filterUserObject(user);
      res["access_token"] = generateAccessToken({ id: res._id });
      return HttpResponse.Ok(response, res);
    }
}

export { loginUser, registerUser };

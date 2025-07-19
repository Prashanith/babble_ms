import { HttpResponse } from "../models/http/response";
import { users } from "../models/user/user";

async function registerUserUsingIdAndPassword(email: string, password: string, response: Response) {
  try {
    const user = await users.create({
      email: email,
      password: password,
    });
  } catch (error) {
    return HttpResponse.toInternalServerError(response);
  }
}

export { registerUserUsingIdAndPassword };

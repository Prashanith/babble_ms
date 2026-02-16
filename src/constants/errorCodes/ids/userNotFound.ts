import { ResponseCodes } from "../../codes";

class UserNotFound extends Error {
  public errorCode: ResponseCodes;

  constructor() {
    super(`User Not Found`);
    this.name = "UserNotFound";
    this.errorCode = ResponseCodes.BB400;

    Object.setPrototypeOf(this, UserNotFound.prototype);
  }
}

export { UserNotFound };

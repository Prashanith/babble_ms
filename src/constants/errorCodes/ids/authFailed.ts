import { ResponseCodes } from "../../codes";

class AuthenticationFailed extends Error {
  public errorCode: ResponseCodes;

  constructor() {
    super(`Authentication Failed`);
    this.name = "AuthenticationFailed";
    this.errorCode = ResponseCodes.BB400;

    Object.setPrototypeOf(this, AuthenticationFailed.prototype);
  }
}

export { UserNotFound };

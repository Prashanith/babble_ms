import { ResponseCodes } from "../../codes";

class UserAlreadyExists extends Error {
  public errorCode: ResponseCodes;

  constructor() {
    super(`User Not Found`);
    this.name = "UserAlreadyExists";
    this.errorCode = ResponseCodes.BB400;

    Object.setPrototypeOf(this, UserAlreadyExists.prototype);
  }
}

export { UserAlreadyExists };

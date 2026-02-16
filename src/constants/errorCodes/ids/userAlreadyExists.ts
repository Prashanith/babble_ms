import { ResponseCodes } from '../../codes';

class UserAlreadyExists extends Error {
  public errorCode: ResponseCodes;

  constructor(name?: string) {
    super(`User Not Found`);
    this.message = name ?? this.message;
    this.name = 'UserAlreadyExists';
    this.errorCode = ResponseCodes.BB400;

    Object.setPrototypeOf(this, UserAlreadyExists.prototype);
  }
}

export { UserAlreadyExists };

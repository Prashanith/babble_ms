import { ResponseCodes } from "../../constants/codes";

class HttpError {
  code: String;
  message: String;
  constructor(code: String, message: String | undefined | null) {
    this.code = code;
    this.message = message ?? "";
  }
  toJSON() {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export { HttpError };

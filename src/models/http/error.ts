import { ResponseCodes } from "../../constants/codes";

class HttpError {
  public code: string;
  public message: string;
  public details?: any; 

  constructor(
    code: string, 
    message: string | undefined | null, 
    details?: any
  ) {
    this.code = code;
    this.message = message ?? "An unexpected error occurred";
    this.details = details;
  }

  toJSON() {
    return {
      code: this.code,
      message: this.message,
      ...(this.details && { details: this.details }), 
    };
  }
}

export { HttpError };

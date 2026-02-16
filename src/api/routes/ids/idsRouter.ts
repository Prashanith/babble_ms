import { Router, Request, Response, NextFunction } from "express";
import { loginUser, registerUser } from "../../../services/ids/idService";
import { HttpResponse } from "../../../models/http/response";

const router: Router = Router();

/**
 * @route   GET /
 * @desc    Service health check
 */
router.get("/", (_req: Request, res: Response) => {
  return HttpResponse.Ok(res, { message: "Authentication Service Active" });
});

/**
 * @route   POST /login
 * @desc    Authenticates a user
 */
router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return HttpResponse.toBadRequestError(res, "Email and Password are required");
      }

      const result = await loginUser(email, password);
      
      return HttpResponse.Ok(res, result);
    } catch (error: any) {
      next(error); 
    }
  }
);

/**
 * @route   POST /register
 * @desc    Registers a new user
 */
router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return HttpResponse.toBadRequestError(res, "Registration details missing");
      }

      const newUser = await registerUser(email, password);
      
      return HttpResponse.Accepted(res, newUser);
    } catch (error: any) {
      next(error);
    }
  }
);

export default router;

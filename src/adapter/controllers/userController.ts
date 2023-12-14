import { Request, Response, NextFunction } from "express";
//*usercase
import UserUseCase from "../../useCases/userUseCase";
//*service
import CustomError from "../../infrastructure/services/customError";

class UserController {
  private userUseCase: UserUseCase;

  constructor(UserUseCase: UserUseCase) {
    this.userUseCase = UserUseCase;
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userUseCase.validateAndCreateUser(req.body);
      if (user instanceof CustomError) {
        return next(user);
      }

      const token = await this.userUseCase.createAccessToken(user);
      if (token instanceof CustomError) {
        return next(token);
      }

      res
        .status(201)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
        })
        .json({
          message: "User Created",
          result: user,
        });

    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userUseCase.loginUser(req.body);
      if (user instanceof CustomError) {
        return next(user);
      }

      const token = await this.userUseCase.createAccessToken(user);
      if (token instanceof CustomError) {
        return next(token);
      }

      res
        .status(200)
        .cookie("access_token", token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365,
        })
        .json({
          message: "User Logged In",
          result: user,
        });

    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {

      const token = req.cookies.access_token;
      if (!token) {
        return next(new CustomError("Access Denied, No Token Provided", 401));
      }

      const logout = await this.userUseCase.logoutUser(token);
      if (logout instanceof CustomError) {
        return next(logout);
      }

      res
        .status(200)
        .clearCookie("access_token")
        .send({
          message: "User Logged Out",
          success: true,
        })

    } catch (error) {
      next(error);
    }
  }

  async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.access_token;
      if (!token) {
        return next(new CustomError("Access Denied, No Token Provided", 401));
      }

      const user = await this.userUseCase.verifyAccessToken(token);
      if (user instanceof CustomError) {
        return next(user);
      }

      res.status(200).json({
        message: "Token Verified",
        result: user,
      });

    } catch (error) {
      next(error);
    }
  }

}

export default UserController;

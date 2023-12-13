import { Request, Response, NextFunction } from "express";
//*usercase
import UserUseCase from "../../useCases/userUseCase";
//*service
// import CustomError from "../../infrastructure/services/customError";

class UserController {
  private userUseCase: UserUseCase;

  constructor(UserUseCase: UserUseCase) {
    this.userUseCase = UserUseCase;
  }

  async signUp(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await this.userUseCase.validateAndCreateUser(req.body);
        res.status(201).json({
          message: "User Created",
          result: user,
        });

    } catch (error) {
      next(error);
    }
  }
}

export default UserController;

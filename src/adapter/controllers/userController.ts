import UserUseCase from "../../useCases/userUseCase";
import { Request, Response, NextFunction } from "express";

class UserController {
  private userUseCase: UserUseCase;

  constructor(userUseCase: UserUseCase) {
    this.userUseCase = userUseCase;
  }

  async signUp(req: Request, res: Response, next:NextFunction){
    try {
        
    } catch (error) {
        const typedError = error as Error;
        next(typedError);
    }
  }

}

export default UserController;
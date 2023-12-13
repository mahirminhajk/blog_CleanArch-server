//* entities
import IUser from "../domain/entities/user";
//* repositories
import UserRepository from "../infrastructure/repositories/userRepository";
//* services
import BcryptPassword from "../infrastructure/services/bcryptPassword";
import CustomError from "../infrastructure/services/customError";
import JWTToken from "../infrastructure/services/generateToken";
import Validator from "../infrastructure/services/validator";

class UserUseCase {
  private userRepository: UserRepository;
  private bcryptPassword: BcryptPassword;
  private jwtToken: JWTToken;
  private validator: Validator;

  constructor(
    UserRepository: UserRepository,
    BcryptPassword: BcryptPassword,
    JWTToken: JWTToken,
    Validator: Validator
  ) {
    this.userRepository = UserRepository;
    this.bcryptPassword = BcryptPassword;
    this.validator = Validator;
    this.jwtToken = JWTToken;
  }

  validateAndCreateUser(user: IUser): Promise<IUser | CustomError> {
    return new Promise(async (reslove, reject) => {
      //* validate email
      const isGoodEmail = this.validator.isGoodEmail(user.email);
      if (!isGoodEmail)
        return reject(new CustomError("Please Provide a Valid Email", 422));

      //* check if the email already in db
      const emailExists = await this.userRepository.getUserByEmail(user.email);
      if (emailExists)
        return reject(
          new CustomError("User already exists, Please Try to Login", 409)
        );

      if (user.password === undefined)
        return reject(new CustomError("Please Provide a Valid Password", 422));

      //* validate password
      const isGoodPassword = this.validator.isGoodPassword(user.password);
      if (!isGoodPassword)
        return reject(new CustomError("Please Provide a Valid Password", 422));

      //* hash password
      const hashPassword: string = await this.bcryptPassword.hashPassword(
        user.password
      );

      //* create user
      const newUser = await this.userRepository.createUser({
        name: user.name,
        email: user.email,
        password: hashPassword,
      });

      //*reslove
      return reslove({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      });
    });
  }

  createAccessToken(user: IUser) {
    
  }
}

export default UserUseCase;

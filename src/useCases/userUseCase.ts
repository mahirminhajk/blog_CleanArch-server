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

  loginUser(user: IUser): Promise<IUser | CustomError> {
    return new Promise(async (resolve, reject) => {
      //* check the email and password available in the request
      if (user.email === undefined || user.password === undefined)
        return reject(new CustomError("Please Provide Email and Password", 422));

      //* check if the email already in db
      const userExists = await this.userRepository.getUserByEmail(user.email);
      if (!userExists)
        return reject(new CustomError("User Not Found, Please Sign Up", 404));

      //* check password
      const isPasswordMatch = await this.bcryptPassword.comparePassword(
        user.password,
        userExists.password!
      );
      if (!isPasswordMatch)
        return reject(new CustomError("Email or Password are incorrect", 401));


      //* reslove
      return resolve({
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
      });
    });
  }

  logoutUser(token: string): Promise<boolean | CustomError> {
    return new Promise(async (resolve, reject) => {
      try {
        //* verify token
        const user = await this.verifyAccessToken(token);
        if (user instanceof CustomError) return reject(user);

        //* reslove
        return resolve(true);

      } catch (error) {
        return reject(new CustomError("Can't Logout, Server Error", 500));
      }
    });
  }

  createAccessToken(user: IUser): Promise<string | CustomError> {
    return new Promise(async (resolve, reject) => {
      try {
        if (user._id === undefined || user.name === undefined)
          return reject(new CustomError("User Id or Name is undefined", 500));

        const token = this.jwtToken.generateToken(user._id, user.name);
        return resolve(token);
      } catch (error) {
        return reject(
          new CustomError("Can't Generate Access Token, Server Error", 500)
        );
      }
    });
  }

  verifyAccessToken(token: string): Promise<IUser | CustomError> {
    return new Promise(async (resolve, reject) => {
      try {
        const user = this.jwtToken.verifyToken(token);

        if (typeof user === "string")
          return reject(new CustomError("Invalid Token", 401));

        return resolve(user as IUser);

      } catch (error) {
        return reject(new CustomError("Invalid Token", 401));
      }
    });
  }

}

export default UserUseCase;

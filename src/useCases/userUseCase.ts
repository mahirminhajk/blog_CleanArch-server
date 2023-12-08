//* entities
import IUser from "../domain/entities/user";
//* repositories
import UserRepository from "../infrastructure/repositories/userRepository";
//* services
import BcryptPassword from "../infrastructure/services/bcryptPassword";
import JWTToken from "../infrastructure/services/generateToken";

class UserUseCase {
  private userRepository: UserRepository;
  private bcryptPassword: BcryptPassword;
  private jwtToken: JWTToken;

  constructor(
    UserRepository: UserRepository,
    BcryptPassword: BcryptPassword,
    JWTToken: JWTToken
  ) {
    this.userRepository = UserRepository;
    this.bcryptPassword = BcryptPassword;
    this.jwtToken = JWTToken;
  }

  async checkUserExistsEmail(email: string):Promise<boolean> {
    //* check if user already exists
    const userExists = await this.userRepository.getUserByEmail(email);
    if (userExists) return true;
    return false;
  }

  async checkUsernameExists(username: string):Promise<boolean> {
    //* check if user already exists
    const userExists = await this.userRepository.getUserByUsername(username);
    if (userExists) return true;
    return false;
  }

  async hashPassword(password: string):Promise<string> {
    //* hash password
    const hashedPassword = await this.bcryptPassword.hashPassword(password);
    return hashedPassword;
  }

  async comparePassword(password:string, hashPassword: string):Promise<boolean> {
    //* compare password
    const comparedPassword = await this.bcryptPassword.comparePassword(password, hashPassword);
    return comparedPassword;
  }

  



}

export default UserUseCase;
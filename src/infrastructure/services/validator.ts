//*package
import validator from "validator";

//* interface
import IValidation from "../../useCases/interfaces/IValidation";

export default class Validator implements IValidation {
  isGoodEmail(email: string): boolean {
    return validator.isEmail(email);
  }

  isGoodPassword(password: string): boolean {
    return validator.isStrongPassword(password, { minLength: 8 });
  }
}

import bcrypt from "bcrypt";
import HashPassword from "../../useCases/interfaces/hashPassword";

class BcryptPassword implements HashPassword{
    async hashPassword(password: string): Promise<string>{
        //* validate password
        if(!password){
            throw new Error("Password is required");
        }

        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async comparePassword(password: string, hashedPassword: string): Promise<boolean>{
        return bcrypt.compare(password, hashedPassword);
    }
};

export default BcryptPassword;
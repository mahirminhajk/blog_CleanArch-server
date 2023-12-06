import IUser from "../../domain/entities/user";
import UserRepo from "../../useCases/interfaces/userRepo";
import UserModel from "../database/userModel";

class UserRepository implements UserRepo{
    
    async createUser(user: IUser): Promise<IUser> {
        const newUser = new UserModel(user);
        await newUser.save();
        return newUser;
    }

    async getUserById(_id: string): Promise<IUser | null> {
        const user = await UserModel.findById(_id);
        return user;
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        const user = await UserModel.findOne({email: email});
        return user;
    }

    async deleteUser(_id: string): Promise<unknown> {
        const deletedUser = await UserModel.findByIdAndDelete(_id);
        return deletedUser;
    }

    async findAllUsers(): Promise<IUser[]> {
        const users = await UserModel.find();
        return users;
    }

}
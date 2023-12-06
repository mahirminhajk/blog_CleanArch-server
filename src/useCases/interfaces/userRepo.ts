import IUser from "../../domain/entities/user";

export default interface UserRepo{
    createUser(user: IUser): Promise<IUser>;
    getUserById(_id: string): Promise<IUser | null>;
    getUserByEmail(email: string): Promise<IUser | null>;
    deleteUser(_id: string): Promise<unknown>; //TODO: change to IUser
    findAllUsers(): Promise<IUser[]>;
}

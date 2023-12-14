import { Mongoose, Types } from "mongoose";

export default interface IBlog {
    _id?: string;
    title: string;
    content: string;
    img?: string;
    author?: Types.ObjectId;
    createdAt?: Date;
    updatedAt?: Date;
    likes?: Types.ObjectId[];
}
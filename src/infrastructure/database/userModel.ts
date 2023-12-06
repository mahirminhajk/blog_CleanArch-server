import { Schema, Document, Model, model } from "mongoose";
import IUser from "../../domain/entities/user";

const userSchema:Schema = new Schema<IUser & Document>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: {type: String, required: true},
    writtenBlogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }],
    likedBlogs: [{ type: Schema.Types.ObjectId, ref: 'Blog' }]
},{timestamps: true});

const UserModel: Model<IUser & Document>  = model<IUser & Document>("User", userSchema)

export default UserModel;
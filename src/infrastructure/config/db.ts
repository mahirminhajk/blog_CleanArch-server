import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        // const MONGO_URI = "mongodb://localhost:27017/blog"; 
        if (MONGO_URI) {
            const conn = await mongoose.connect(MONGO_URI);
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        }else{
            throw new Error("MONGO_URI must be defined");
        }
    } catch (error) {
        const err: Error = error as Error
        console.log(err.message);
    }
};

export default connectDB;
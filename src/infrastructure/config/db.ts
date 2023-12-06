import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        if (MONGO_URI) {
            const conn = await mongoose.connect(MONGO_URI);
            console.log(`MongoDB Connected: ${conn.connection.host}`);
        }else{
            throw new Error("MONGO_URI must be defined");
        }
    } catch (error) {
        console.log(error.message);
    }
};
import { createServer } from "./infrastructure/config/app";
import connectDB from "./infrastructure/config/db";
import dotenv from "dotenv";

//* config dotenv
dotenv.config();

const app = createServer();
const port = process.env.PORT || 8000;

connectDB().then(()=>{
    app?.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})



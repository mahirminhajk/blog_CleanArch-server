import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

//*routes
import userRoute from '../routes/userRoute'
import blogRoute from '../routes/blogRoute'

//* interface


//* config dotenv
dotenv.config();

export const createServer = () => {
  try {
    const app = express();

    app.use(
      cors({
        origin: process.env.ORIGIN || "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
        credentials: true,
      })
    );
    app.options("*", cors());

    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "../public")));
    app.use(cookieParser());

    app.get("/", (_req: Request, res: Response) => {
      res.send("Hello World");
    });

    app.use("/api/user", userRoute);
    app.use("/api/blog", blogRoute);

    app.use((err: Error & { statusCode?: number }, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.statusCode || 500;
      const message: String = err.message || "Internal Server Error";
      res.status(status).send({ message });
    });

    return app;
  } catch (error) {
    const err: Error = error as Error;
    console.log(err.message);
  }
};
